# Next.js + Contentful CMS

A demonstration of integrating **Contentful CMS** with **Next.js 15**.

## Features

- ✅ [**Next.js 15**](https://nextjs.org/): Using **React 19** stable.
- ✅ [**Contentful CMS**](https://www.contentful.com/): Headless CMS for content management.
- ✅ **ESLint & Prettier**: Automated linting and formatting to maintain consistent code quality.
- ✅ **GraphQL Codegen**: Automatically generates type-safe GraphQL queries.
- ✅ **Next.js Draft Mode**: Fetch unpublished content securely, bypassing static cache.
- ✅ **ISR (Incremental Static Regeneration)**: Statically generate pages at build time, using **ISR** for **on-demand** revalidation, automated via a **Contentful webhook**.
- ✅ **Contentful Live Preview**: Real-time content preview updates directly from the CMS.

## Getting Started

**1. Clone the Repository**

```bash
git clone https://github.com/blkhurst/next-cms-integration
cd next-cms-integration
npm install
```

**2. Generate Secrets for Draft Mode and Revalidation**

```bash
# Generates a token for your `.env.local` file
openssl rand -base64 32 | tr -d "="
```

**3. Configure Environment Variables**

Create a `.env.local` file and add your Contentful API keys.

**4. Fetch and Generate Types**

Use GraphQL Codegen to fetch the Contentful schema and generate type-safe queries:

```bash
# Outputs to lib/graphql/__generated__
npm run codegen
```

**5. Run the Development Server**

```bash
npm run dev
```

### Contentful

**1. Setup Contentful Content Model**

| Field Name   | Field Type        | Notes                                |
| ------------ | ----------------- | ------------------------------------ |
| Title        | Short text        |                                      |
| Slug         | Short text (slug) | Must be unique.                      |
| Publish Date | Date (date only)  |                                      |
| Cover Image  | Media (single)    |                                      |
| Description  | Long text         |                                      |
| Content      | Rich text         |                                      |
| References   | References, many  | Only links to other **Post** entries |

**2. Configure Live Preview**

1. In the Contentful dashboard, navigate to **Settings > Content Preview > Create preview platform**.
2. Under **Preview URL**, add the following URL, replacing `<token>` with your **Draft Mode Secret**:

```
https://example.com/api/draft?slug={entry.fields.slug}&secret=<token>
```

> **Note:** For local development, replace `https://example.com` with `http://localhost:3000`.

**3. Configure Contentful's Webhook for Revalidation**

1. In the Contentful dashboard, navigate to **Settings > Webhooks > Add Webhook**.
2. Under `URL`, add the following:

```bash
# POST
https://example.com/api/revalidate
```

3. Setup triggers for the following events:

| Type  | Event                                                    |
| ----- | -------------------------------------------------------- |
| Entry | `Archive`, `Unarchive`, `Publish`, `Unpublish`, `Delete` |
| Asset | `Archive`, `Unarchive`, `Publish`, `Unpublish`, `Delete` |

4. "Add secret header", replacing `<token>` with your **Revalidation Secret**:

```json
{
  "Key": "secret",
  "Value": "<token>"
}
```

5. Use a custom payload to send only the slug:

```json
{
  "slug": "{ /payload/fields/slug/en-GB }"
}
```

> **Note:** Replace en-GB for your default locale.

## Misc

### Testing Revalidation Webhook

```bash
curl -X POST \
http://localhost:3000/api/revalidate \
-H "Content-Type: application/json" \
--data '{"slug": "<slug>"}' \
-H 'secret: <token>' | jq
```

### Todo

- 🚧 **Custom Rich Text Components**: Rendering for media and embedded entries within Rich Text content.
- 🚧 **Pagination**: Efficiently fetch large amounts of data.
- 🚧 **Nested Posts / References**: Support for hierarchical content structures.
- 🚧 **Contentful Live Inspection**: Real-time content inspection tools.
