const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::practice-session.practice-session',
  () => ({
    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        filters: {
          ...ctx.query.filters,
          user: { id: ctx.state.user.id },
        },
      };
      return super.find(ctx);
    },

    async create(ctx) {
      ctx.request.body.data = {
        ...ctx.request.body.data,
        user: ctx.state.user.id,
      };
      return super.create(ctx);
    },
  })
);