import { factories } from '@strapi/strapi';

const ARTICLE_POPULATE = {
  author: {
    populate: {
      photo: {
        fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
      },
    },
  },
  featuredImage: {
    fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
  },
  category: {
    fields: ['name', 'slug', 'subtitle', 'description', 'order'],
    populate: {
      details: true, // component array — must be explicitly populated
    },
  },
  pillar:       { fields: ['name', 'slug'] },
  tags:         { fields: ['name', 'slug'] },
  subcategories: {
    fields: ['name', 'slug', 'description'],
    populate: {
      category: { fields: ['id', 'name', 'slug'] }, // needed for categoryId
    },
  },
  tenant:       { fields: ['name', 'slug'] },
  seo: {
    populate: {
      ogImage: { fields: ['url', 'alternativeText', 'width', 'height'] },
    },
  },
} as const;

// @ts-ignore
export default factories.createCoreController('api::article.article', () => ({
  async find(ctx: any) {
    ctx.query.populate = ARTICLE_POPULATE;
    return super.find(ctx);
  },
  async findOne(ctx: any) {
    ctx.query.populate = ARTICLE_POPULATE;
    return super.findOne(ctx);
  },
}));
