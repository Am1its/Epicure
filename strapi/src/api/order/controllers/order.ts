import { factories } from '@strapi/strapi';

// True only when the request is authenticated with a Strapi API token (e.g. our NestJS
// backend's admin token) rather than an end-user JWT. Only in that case do we trust an
// explicit user id supplied by the caller instead of deriving it from ctx.state.user.
const isServiceCall = (ctx: { state: { auth?: { strategy?: { name?: string } } } }): boolean =>
  ctx.state.auth?.strategy?.name === 'content-api-token';

export default factories.createCoreController('api::order.order', ({ strapi: _strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    const bodyUserId = ctx.request.body?.data?.user;
    if (!user && !(isServiceCall(ctx) && typeof bodyUserId === 'number')) {
      return ctx.unauthorized('You must be logged in to place an order');
    }
    ctx.request.body.data = { ...(ctx.request.body.data ?? {}), user: user?.id ?? bodyUserId };
    return await super.create(ctx);
  },

  async find(ctx) {
    const user = ctx.state.user;
    const filterUserId = (ctx.query.filters as { user?: number } | undefined)?.user;
    if (!user && !(isServiceCall(ctx) && filterUserId != null)) {
      return ctx.unauthorized('You must be logged in to view orders');
    }
    ctx.query = {
      ...ctx.query,
      filters: { ...((ctx.query.filters as object) ?? {}), user: user?.id ?? filterUserId },
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
