import type { Core } from '@strapi/strapi';

interface WikiSyncConfig {
  enabled: boolean;
  baseUrl: string;
  graphqlUrl: string;
  apiToken: string;
  defaultEditor: string;
  defaultLocale: string;
  defaultPrivate: boolean;
  syncCollections: string[];
}

interface StrapiEntry {
  documentId: string;
  title?: string;
  product?: string;
  persona?: string;
  category?: string;
  owner?: string;
  reviewDate?: string;
  summary?: string;
  body?: string;
  syncToWiki?: boolean;
  wikiPath?: string;
  wikiTags?: any;
  slug?: string;
  [key: string]: any;
}

const getConfig = (): WikiSyncConfig => {
  return {
    enabled: process.env.WIKI_SYNC_ENABLED === 'true',
    baseUrl: process.env.WIKI_BASE_URL || '',
    graphqlUrl: process.env.WIKI_GRAPHQL_URL || '',
    apiToken: process.env.WIKI_API_TOKEN || '',
    defaultEditor: process.env.WIKI_DEFAULT_EDITOR || 'markdown',
    defaultLocale: process.env.WIKI_DEFAULT_LOCALE || 'en',
    defaultPrivate: process.env.WIKI_DEFAULT_PRIVATE === 'true',
    syncCollections: (process.env.WIKI_SYNC_COLLECTIONS || '')
      .split(',')
      .map(c => c.trim())
      .filter(Boolean),
  };
};

const normalizePath = (path: string): string => {
  if (!path) return '';
  let normalized = path.trim().toLowerCase();
  
  // Replace spaces and invalid characters with hyphens
  normalized = normalized.replace(/[^a-z0-9-\/]/g, '-');
  
  // Remove multiple consecutive hyphens or slashes
  normalized = normalized.replace(/-+/g, '-').replace(/\/+/g, '/');
  
  // Ensure it starts with a slash
  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized;
  }
  
  return normalized;
};

const renderMarkdown = (entry: StrapiEntry): string => {
  const safeText = (text: any) => {
    if (!text) return '';
    // Basic protection against HTML injection in frontmatter
    return String(text).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  const title = safeText(entry.title || entry.name || 'Untitled');
  const product = safeText(entry.product || 'N/A');
  const persona = safeText(entry.persona || 'N/A');
  const category = safeText(entry.category || 'N/A');
  const owner = safeText(entry.owner || 'Unknown');
  const reviewDate = safeText(entry.reviewDate || 'N/A');
  const summary = safeText(entry.summary || '');
  
  // Body might already be markdown, so we don't HTML-escape it as aggressively
  // but we should ensure it's a string
  const body = entry.body ? String(entry.body) : '';

  return `# ${title}

> Product: ${product}
> Persona: ${persona}
> Category: ${category}
> Owner: ${owner}
> Review Date: ${reviewDate}

## Summary
${summary}

## Content
${body}`;
};

const wikiGraphQLRequest = async (query: string, variables: any, config: WikiSyncConfig, retries = 2): Promise<any> => {
  if (!config.apiToken || !config.graphqlUrl) {
    throw new Error('Wiki.js API token or GraphQL URL is missing');
  }

  try {
    const response = await fetch(config.graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiToken}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as { data?: any, errors?: any };
    
    if (data.errors) {
      throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
    }

    return data;
  } catch (error) {
    if (retries > 0) {
      // Exponential backoff could be added here
      console.warn(`[wiki-sync] GraphQL request failed, retrying... (${retries} attempts left)`, error);
      return wikiGraphQLRequest(query, variables, config, retries - 1);
    }
    throw error;
  }
};

const checkPageExists = async (path: string, locale: string, config: WikiSyncConfig): Promise<number | null> => {
  const query = `
    query ($path: String!, $locale: String!) {
      pages {
        single(path: $path, locale: $locale) {
          id
        }
      }
    }
  `;

  try {
    const response = await wikiGraphQLRequest(query, { path, locale }, config);
    return response?.data?.pages?.single?.id || null;
  } catch (error) {
    console.error(`[wiki-sync] Error checking if page exists at ${path}:`, error);
    return null;
  }
};

const createOrUpdatePage = async (entry: StrapiEntry, collectionName: string) => {
  const config = getConfig();
  
  if (!config.enabled) return;
  
  // Check if this collection is supposed to be synced
  // using either the raw collection name or stripping 'api::xxx.xxx' to 'xxx'
  const isSyncableCollection = config.syncCollections.some(
    collection => collectionName.includes(collection)
  );

  if (!isSyncableCollection) return;
  if (entry.syncToWiki === false) return; // explicit opt-out

  const slug = entry.slug || entry.documentId;
  const rawPath = entry.wikiPath || `/knowledge/${collectionName.split('.').pop()}/${slug}`;
  const path = normalizePath(rawPath);
  
  console.log(`[wiki-sync] syncing page ${path}`);

  try {
    const content = renderMarkdown(entry);
    const tags = Array.isArray(entry.wikiTags) ? entry.wikiTags : [];
    
    const existingPageId = await checkPageExists(path, config.defaultLocale, config);

    if (existingPageId) {
      // Update existing page
      const updateQuery = `
        mutation ($id: Int!, $content: String!, $description: String, $editor: String, $isPrivate: Boolean, $locale: String, $path: String, $published: Boolean, $tags: [String], $title: String!) {
          pages {
            update(
              id: $id
              content: $content
              description: $description
              editor: $editor
              isPrivate: $isPrivate
              locale: $locale
              path: $path
              published: $published
              tags: $tags
              title: $title
            ) {
              responseResult {
                succeeded
                errorCode
                slug
                message
              }
            }
          }
        }
      `;
      
      const variables = {
        id: existingPageId,
        content: content,
        description: entry.summary || '',
        editor: config.defaultEditor,
        isPrivate: config.defaultPrivate,
        locale: config.defaultLocale,
        path: path,
        published: true,
        tags: tags,
        title: entry.title || entry.name || 'Untitled',
      };

      const result = await wikiGraphQLRequest(updateQuery, variables, config);
      if (result.data?.pages?.update?.responseResult?.succeeded) {
        console.log(`[wiki-sync] page updated: ${path}`);
      } else {
        console.error(`[wiki-sync] failed to update page ${path}:`, result.data?.pages?.update?.responseResult);
      }

    } else {
      // Create new page
      const createQuery = `
        mutation ($content: String!, $description: String!, $editor: String!, $isPrivate: Boolean!, $isPublished: Boolean!, $locale: String!, $path: String!, $tags: [String]!, $title: String!) {
          pages {
            create(
              content: $content
              description: $description
              editor: $editor
              isPrivate: $isPrivate
              isPublished: $isPublished
              locale: $locale
              path: $path
              tags: $tags
              title: $title
            ) {
              responseResult {
                succeeded
                errorCode
                slug
                message
              }
              page {
                id
              }
            }
          }
        }
      `;

      const variables = {
        content: content,
        description: entry.summary || '',
        editor: config.defaultEditor,
        isPrivate: config.defaultPrivate,
        isPublished: true,
        locale: config.defaultLocale,
        path: path,
        tags: tags,
        title: entry.title || entry.name || 'Untitled',
      };

      const result = await wikiGraphQLRequest(createQuery, variables, config);
      if (result.data?.pages?.create?.responseResult?.succeeded) {
        console.log(`[wiki-sync] page created: ${path}`);
      } else {
        console.error(`[wiki-sync] failed to create page ${path}:`, result.data?.pages?.create?.responseResult);
      }
    }

  } catch (error) {
    console.error(`[wiki-sync] error during sync for ${path}:`, error);
  }
};

const deletePage = async (entry: StrapiEntry, collectionName: string) => {
  const config = getConfig();
  
  if (!config.enabled) return;

  const isSyncableCollection = config.syncCollections.some(
    collection => collectionName.includes(collection)
  );

  if (!isSyncableCollection) return;

  const slug = entry.slug || entry.documentId;
  const rawPath = entry.wikiPath || `/knowledge/${collectionName.split('.').pop()}/${slug}`;
  const path = normalizePath(rawPath);

  try {
    const existingPageId = await checkPageExists(path, config.defaultLocale, config);
    
    if (existingPageId) {
      const deleteQuery = `
        mutation ($id: Int!) {
          pages {
            delete(id: $id) {
              responseResult {
                succeeded
                errorCode
                slug
                message
              }
            }
          }
        }
      `;

      const result = await wikiGraphQLRequest(deleteQuery, { id: existingPageId }, config);
      
      if (result.data?.pages?.delete?.responseResult?.succeeded) {
        console.log(`[wiki-sync] page deleted: ${path}`);
      } else {
        console.error(`[wiki-sync] failed to delete page ${path}:`, result.data?.pages?.delete?.responseResult);
      }
    }
  } catch (error) {
    console.error(`[wiki-sync] error deleting page ${path}:`, error);
  }
};

// ─── Dedicated sync for api::wiki-js-content.wiki-js-content ────────────────
// Unlike the generic sync, this is strictly OPT-IN:
//   • syncToWiki MUST be true on the entry.
//   • Only create/update/publish actions are handled here (delete via deletePageById).
//   • The markdown renderer is scoped to the wiki-js-content schema fields only.
//   • Status is written back using strapi.db.query() — NOT strapi.documents() —
//     to avoid re-triggering the Document Service middleware (infinite loop).

const WIKI_JS_CONTENT_UID = 'api::wiki-js-content.wiki-js-content';

// ─── Tier 2: Professional markdown with TOC, source banner, and footer ───────
const renderWikiJsContentMarkdown = (entry: StrapiEntry): string => {
  const title = entry.title || 'Untitled';
  const summary = entry.summary || '';
  // body is stored as richtext (plain text / markdown string in Strapi 5 by default)
  const body = entry.body ? String(entry.body) : '';
  const syncTimestamp = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
  const strapiBaseUrl = process.env.PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'https://your-strapi-url';

  let md = `# ${title}\n\n`;

  // Automatic Table of Contents (Wiki.js markdown extension)
  md += `[[toc]]\n\n---\n\n`;

  // Source and sync meta banner
  md += `> 📘 **Source:** Managed in [Strapi](${strapiBaseUrl})\n`;
  md += `> **Last Sync:** ${syncTimestamp} UTC\n\n`;

  if (summary) {
    md += `## Summary\n\n${summary}\n\n`;
  }

  md += `## Content\n\n${body}\n\n`;

  md += `---\n\n_Internal Document - Glynac Ops_\n`;
  return md;
};

// ─── Tier 3: Delete a Wiki.js page by its stored integer ID ─────────────────
const deletePageById = async (wikiPageId: number): Promise<void> => {
  const config = getConfig();
  if (!config.enabled) return;

  const deleteMutation = `
    mutation($id: Int!) {
      pages {
        delete(id: $id) {
          responseResult {
            succeeded
            message
          }
        }
      }
    }
  `;

  try {
    const result = await wikiGraphQLRequest(deleteMutation, { id: wikiPageId }, config);
    if (result?.data?.pages?.delete?.responseResult?.succeeded) {
      console.log(`[wiki-sync] wiki-js-content page deleted (wikiPageId=${wikiPageId})`);
    } else {
      console.error(`[wiki-sync] wiki-js-content delete failed (wikiPageId=${wikiPageId}):`, result?.data?.pages?.delete?.responseResult);
    }
  } catch (err) {
    console.error(`[wiki-sync] error deleting wiki-js-content page (wikiPageId=${wikiPageId}):`, err);
  }
};

// ─── Tier 1: Sync with status write-back ────────────────────────────────────
// strapiInstance is the Strapi Core instance, passed in from the middleware.
// Status is written via strapi.db.query() to bypass the Document Service
// middleware and prevent an infinite-loop.
const syncWikiJsContent = async (entry: StrapiEntry, strapiInstance?: any): Promise<void> => {
  // Opt-in guard: only sync when the editor explicitly checks syncToWiki
  if (!entry || entry.syncToWiki !== true) return;

  const config = getConfig();
  if (!config.enabled) return;

  // Helper: write status back to DB without triggering middleware
  const writeStatus = async (status: 'success' | 'failed' | 'pending', extra: Record<string, any> = {}) => {
    if (!strapiInstance || !entry.id) return;
    try {
      await strapiInstance.db.query(WIKI_JS_CONTENT_UID).update({
        where: { id: entry.id },
        data: { lastSyncStatus: status, ...extra },
      });
    } catch (dbErr) {
      console.error('[wiki-sync] failed to write sync status back to Strapi:', dbErr);
    }
  };

  const slug = entry.slug || entry.documentId;
  const rawPath = entry.wikiPath || `/wiki-js-content/${slug}`;
  const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;

  const content = renderWikiJsContentMarkdown(entry);
  const description = entry.summary || '';
  const tags: string[] = entry.wikiTags
    ? String(entry.wikiTags).split(',').map((t: string) => t.trim()).filter(Boolean)
    : [];
  const title = entry.title || 'Untitled';

  // Mark as pending before starting
  await writeStatus('pending', { lastSyncError: null });

  try {
    // Use stored wikiPageId first to avoid a round-trip "guess by path" query
    const storedPageId: number | null = entry.wikiPageId || null;
    const existingId = storedPageId || await checkPageExists(path, config.defaultLocale, config);
    let returnedPageId: number | null = null;

    if (existingId) {
      // UPDATE
      const updateMutation = `
        mutation($id:Int!,$content:String!,$description:String!,$editor:String!,$isPrivate:Boolean!,$locale:String!,$path:String!,$tags:[String]!,$title:String!,$isPublished:Boolean!){
          pages{update(id:$id,content:$content,description:$description,editor:$editor,isPrivate:$isPrivate,locale:$locale,path:$path,tags:$tags,title:$title,isPublished:$isPublished){
            responseResult{succeeded message}
          }}
        }
      `;
      const result = await wikiGraphQLRequest(updateMutation, {
        id: existingId,
        content,
        description,
        editor: config.defaultEditor,
        isPrivate: config.defaultPrivate,
        locale: config.defaultLocale,
        path,
        tags,
        title,
        isPublished: true,
      }, config);

      if (!result?.data?.pages?.update?.responseResult?.succeeded) {
        throw new Error(result?.data?.pages?.update?.responseResult?.message || 'Wiki.js update mutation failed');
      }

      returnedPageId = existingId; // ID doesn't change on update
      console.log(`[wiki-sync] wiki-js-content updated: ${path}`);
    } else {
      // CREATE
      const createMutation = `
        mutation($content:String!,$description:String!,$editor:String!,$isPrivate:Boolean!,$isPublished:Boolean!,$locale:String!,$path:String!,$tags:[String]!,$title:String!){
          pages{create(content:$content,description:$description,editor:$editor,isPrivate:$isPrivate,isPublished:$isPublished,locale:$locale,path:$path,tags:$tags,title:$title){
            responseResult{succeeded message}
            page{id}
          }}
        }
      `;
      const result = await wikiGraphQLRequest(createMutation, {
        content,
        description,
        editor: config.defaultEditor,
        isPrivate: config.defaultPrivate,
        isPublished: true,
        locale: config.defaultLocale,
        path,
        tags,
        title,
      }, config);

      if (!result?.data?.pages?.create?.responseResult?.succeeded) {
        throw new Error(result?.data?.pages?.create?.responseResult?.message || 'Wiki.js create mutation failed');
      }

      returnedPageId = result?.data?.pages?.create?.page?.id || null;
      console.log(`[wiki-sync] wiki-js-content created: ${path} (wikiPageId=${returnedPageId})`);
    }

    // Write SUCCESS status back to Strapi entry
    await writeStatus('success', {
      lastSyncedAt: new Date(),
      lastSyncError: null,
      ...(returnedPageId !== null ? { wikiPageId: returnedPageId } : {}),
    });

  } catch (err: any) {
    const errorMessage = err?.message || String(err);
    console.error(`[wiki-sync] error syncing wiki-js-content at ${path}:`, errorMessage);

    // Write FAILED status back so the editor can see what went wrong
    await writeStatus('failed', {
      lastSyncError: errorMessage,
    });
  }
};

export const wikiSyncService = {
  // Generic multi-collection sync
  createOrUpdatePage,
  deletePage,
  // wiki-js-content dedicated sync (opt-in, with status write-back)
  syncWikiJsContent,
  deletePageById,
  // Renderers (exported for testing)
  renderMarkdown,
  renderWikiJsContentMarkdown,
  // Utilities
  normalizePath,
  wikiGraphQLRequest,
};

export default wikiSyncService;


