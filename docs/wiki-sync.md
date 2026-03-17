# Strapi to Wiki.js Sync

This project implements a direct, one-way synchronization module from Strapi to a Wiki.js instance using the Wiki.js GraphQL API.

## Architecture 

The synchronization works via Strapi's built-in **Document Service Middleware** (Strapi v5):

1. **Trigger**: An entry in a targeted collection is created, updated, published, or deleted.
2. **Middleware hook**: The Document Middleware in `src/index.ts` captures this action on the database layer.
3. **Condition check**: The middleware checks if the collection name is in the allowed list (`WIKI_SYNC_COLLECTIONS`).
4. **Service Execution**: The `wikiSyncService` format the content into Markdown and issues standard GraphQL mutations (`pages.create`, `pages.update`, `pages.delete`) to Wiki.js.

### Source of Truth
Strapi is the absolute single source of truth. Wiki.js remains strictly read-only for these synchronized pages. There is no bidirectional database syncing.

---

## Configuration

To enable and configure the sync, update your `.env` (development) or `.env.production` file:

```env
# Enable or disable the sync process globally
WIKI_SYNC_ENABLED=true

# Wiki.js endpoints
WIKI_BASE_URL=https://wiki.example.com
WIKI_GRAPHQL_URL=https://wiki.example.com/graphql

# A personal API token generated inside Wiki.js (requires page management permissions)
WIKI_API_TOKEN=your_secure_token

# Default page settings
WIKI_DEFAULT_EDITOR=markdown
WIKI_DEFAULT_LOCALE=en
WIKI_DEFAULT_PRIVATE=true

# Comma-separated list of Strapi collection names allowed for syncing
WIKI_SYNC_COLLECTIONS=knowledge-item,playbook,battlecard
```

### Content Type Schema Requirements

To properly sync an entry from the configured collections, these fields should ideally exist or be returned in the Strapi Document:
- `title` or `name`: Used for the Wiki.js page title.
- `summary` (Text): Used for the meta description.
- `body` (Text/Markdown/RichText): The main content.
- `syncToWiki` (Boolean): Set to `false` to explicitly keep an entry from syncing.
- `wikiPath` (String): If provided, overrides the default path. 

*Default path fallback: `/knowledge/[collection]/[slug]`*

---

## Testing the Sync (Local Development)

### 1. Prerequisites
- Have a local or staging Wiki.js instance running.
- Generate an API token in Wiki.js Administration -> API Access. Ensure it has permissions to `read:pages`, `write:pages`, `manage:pages`.
- Apply your token and URL variables in `.env`. Ensure `WIKI_SYNC_ENABLED=true`.

### 2. Run Strapi
Start the Strapi backend:
```bash
npm run dev
# or
yarn dev
```

### 3. Create & Update
1. Navigate to the Strapi Admin Panel (`http://localhost:1337/admin`).
2. Go to Content Manager -> Select one of the supported collections (e.g. `playbook`).
3. Create a new entry, fill out the content, and hit **Save/Publish**.
4. Check the Strapi terminal. Look for `[wiki-sync] page created: /knowledge/playbook/...`
5. Verify inside Wiki.js that the newly created markdown page exists and matches the formatting.
6. Make an edit to the Strapi entry and save again. The terminal should report `[wiki-sync] page updated: ...`.

### 4. Delete
1. Delete the entry you just created in Strapi.
2. The terminal should report `[wiki-sync] page deleted: ...`.
3. Verify inside Wiki.js that the page has been completely removed.
