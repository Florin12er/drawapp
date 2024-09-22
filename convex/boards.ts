import { v } from "convex/values"; // this is for defining types and values
import { query } from "./_generated/server"; // this is for defining the query

export const get = query({
    args: {
        // this gets the arguments for the query
        orgId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity(); // this gets the user identity

        if (!identity) {
            // this checks if the user is authenticated
            throw new Error("Unauthorized");
        }
        // this fetches all the boards from the database
        const boards = await ctx.db
            .query("boards")
            .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
            .order("desc")
            .collect();
        // finally, this returns the boards
        return boards;
    },
});
