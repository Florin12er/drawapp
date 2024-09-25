import { v } from "convex/values"; // this is for defining types and values
import { query } from "./_generated/server"; // this is for defining the query
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const get = query({
  args: {
    // this gets the arguments for the query
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity(); // this gets the user identity

    if (!identity) {
      // this checks if the user is authenticated
      throw new Error("Unauthorized");
    }

    if (args.favorites) {
      const favoritedBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity.subject).eq("orgId", args.orgId),
        )
        .order("desc")
        .collect();

      const ids = favoritedBoards.map((b) => b.boardId);
      const boards = await getAllOrThrow(ctx.db, ids as any);

      return boards.map((board) => ({
        ...board,
        isFavorite: true,
      }));
    }
    const title = args.search as string;
    let boards = [] as any[];

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("searchTitle", (q) =>
          q.search("title", title).eq("orgId", args.orgId),
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    const boardsWithIsFavorite = boards.map(async (board) => {
      return await ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", identity.subject).eq("boardId", board._id),
        )
        .unique()
        .then((favorite) => {
          return { ...board, isFavorite: !!favorite };
        });
    });
    const boardsWithFavoriteBoolean = await Promise.all(boardsWithIsFavorite);
    return boardsWithFavoriteBoolean;
  },
});
