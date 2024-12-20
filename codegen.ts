import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config({path: [".env.local", ".env"]});

const BASE_URL = "https://graphql.contentful.com/content/v1/spaces";
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID || "";
const ENVIRONMENT = process.env.CONTENTFUL_SPACE_ENVIRONMENT || "master";
const DELIVERY_ACCESS_TOKEN = process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN;
const PREVIEW_ACCESS_TOKEN = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;

export const endpoint = `${BASE_URL}/${SPACE_ID}/environments/${ENVIRONMENT}`;

if (!SPACE_ID || !DELIVERY_ACCESS_TOKEN || !PREVIEW_ACCESS_TOKEN) {
  throw new Error("Please check Environment Variables.");
}

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [endpoint]: {
      headers: {
        Authorization: `Bearer ${DELIVERY_ACCESS_TOKEN}`,
      },
    },
  },
  documents: ["lib/graphql/**/*.gql"],
  generates: {
    /** Optional Plugins
     * introspection: graphql.schema.json - JSON format for tools that need schema metadata.
     * schema-ast: graphql.schema.graphql - Human readable SDL format
     */
    "lib/graphql/__generated__/sdk.ts": {
      plugins: [
        /** Generates Typescript types for the schema. */
        "typescript",
        /** Generates Typescript types for GraphQL operations (queries, mutations, fragments). */
        "typescript-operations",
        /** Generates functions based on queries (SDK). */
        "typescript-graphql-request",
      ],
    },
  },
};

export default config;
