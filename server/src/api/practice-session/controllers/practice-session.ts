import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::practice-session.practice-session',
  () => ({
    async find(ctx: any) {
      ctx.query = {
        ...ctx.query,
        filters: {
          ...ctx.query.filters,
          user: { id: ctx.state.user.id },
        },
      };
      return super.find(ctx);
    },

    async create(ctx: any) {
      ctx.request.body.data = {
        ...ctx.request.body.data,
        user: ctx.state.user.id,
      };
      return super.create(ctx);
    },
  })
);