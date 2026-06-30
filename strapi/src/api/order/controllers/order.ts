import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::order.order', ({ strapi: _strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized('You must be logged in to place an order');
    ctx.request.body.data = { ...(ctx.request.body.data ?? {}), user: user.id };
    return await super.create(ctx);
  },

  async find(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized('You must be logged in to view orders');
    ctx.query = {
      ...ctx.query,
      filters: { ...((ctx.query.filters as object) ?? {}), user: user.id },
    };
    return await super.find(ctx);
  },

  async findOne(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized('You must be logged in to view orders');
    ctx.query = {
      ...ctx.query,
      filters: { ...((ctx.query.filters as object) ?? {}), user: user.id },
    };
    return await super.findOne(ctx);
  },
}));
