# Strapi 5 Populate Syntax

## Rules
- `populate=*` only populates one level — never use it for nested relations
- NEVER use `populate[mediaField]=*` — causes 400 "Invalid key related at X.related"

## Correct nested populate

For relations with nested media fields, use explicit field selection:

```
/api/restaurants?
  populate[image][fields][0]=url
  &populate[image][fields][1]=alternativeText
  &populate[chef][fields][0]=name
  &populate[chef][fields][1]=id
  &populate[dishes][populate]=*
```

- `populate[relation][fields][n]=fieldName` — select specific fields from a relation
- `populate[relation][populate]=*` — fully populate one level of a nested relation (safe for leaf relations like dishes)

## StrapiClientService

All Strapi calls go through `StrapiClientService`:
- `get<T>(path)` → returns `T[]` (list endpoint)
- `getById<T>(path)` → returns `T` (single endpoint), throws 404 if not found

`STRAPI_URL` env var controls base URL (default `http://localhost:1337`).
