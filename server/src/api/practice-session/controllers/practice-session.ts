import { factories } from '@strapi/strapi';

const UID = 'api::practice-session.practice-session';

export default factories.createCoreController(UID, () => ({
  async find(ctx: any) {
    const results = await strapi.documents(UID).findMany({
      filters: { user: { id: ctx.state.user.id } },
      sort: ['date:desc'],
    });
    return { data: results, meta: {} };
  },

  async create(ctx: any) {
  const { date, duration_min, instrument, focus, notes } = ctx.request.body.data;

  const data: any = {
    date,
    duration_min,
    instrument,
    focus,
    notes,
    user: ctx.state.user.documentId,
  };

  const created = await strapi.documents(UID).create({ data });
  return { data: created, meta: {} };
},

    

  async delete(ctx: any) {
    const { id } = ctx.params; // this is the documentId
    const existing = await strapi.documents(UID).findFirst({
      filters: { documentId: id, user: { id: ctx.state.user.id } },
    });
    if (!existing) {
      return ctx.notFound('Session not found');
    }
    await strapi.documents(UID).delete({ documentId: id });
    return { data: existing, meta: {} };
  },
}));