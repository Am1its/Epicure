# NestJS Module Pattern

Each resource (restaurants, chefs, dishes) has its own module folder with 3 files:

```
app/[resource]/
  [resource].controller.ts   — route handlers, calls service
  [resource].service.ts      — business logic, calls StrapiClientService, transforms data
  [resource].module.ts       — wires controller + service together
```

## Adding a new resource

1. Create the 3 files above
2. Import `StrapiClientService` via constructor injection in the service
3. Register the module in `app.module.ts`
4. Add Strapi types to `strapi-client/strapi-types.ts`
5. Add shared types to `libs/shared-types/src/lib/shared-types.ts`

## Transform pattern

Services always have a `private transform(item: StrapiX): SharedType` method — never return raw Strapi data to the controller.

```ts
async findAll(): Promise<Restaurant[]> {
  const items = await this.strapiClient.get<StrapiRestaurant>('/api/restaurants?...');
  return items.map(item => this.transform(item));
}
```
