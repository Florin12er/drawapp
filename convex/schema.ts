import { v } from "convex/values";

import { defineSchema, defineTable } from "convex/server";

// this is the initial board schema

export default defineSchema({
  boards: defineTable({
    title: v.string(), // this defines the title as an string
    orgId: v.string(), // this defines the organization id as a string
    authorId: v.string(), // this defines the author id as a string
    authorName: v.string(), // this defines the author name as a string
    imageUrl: v.string(), // this defines the image url as a string
  })
    .index("by_org", ["orgId"]) // this creates an index on the orgId field
    .searchIndex("searchTitle", {
      // this creates a search index on the title field
      searchField: "title", // this defines the search field as the title
      filterFields: ["orgId"], // this defines the filter fields as the orgId
    }),
});
