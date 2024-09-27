import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// this an array of placeholder images
const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
  "/placeholders/9.svg",
  "/placeholders/10.svg",
];
// here you make an POST mutation
export const create = mutation({
  args: {
    orgId: v.string(), // this defines the argument for orgId as a string
    title: v.string(), // this defines the argument for title as a string
  },
  handler: async (ctx, args) => {
    const indentity = await ctx.auth.getUserIdentity(); // this gets the user identity

    if (!indentity) {
      // this checks if the user is authenticated
      throw new Error("Unauthorized");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)]; // this generates a random image
    // finally, this inserts the board into the database
    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: indentity.subject,
      authorName: indentity.name!,
      imageUrl: randomImage,
    });

    return board;
  },
});
export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const indentity = await ctx.auth.getUserIdentity(); // this gets the user identity

    if (!indentity) {
      // this checks if the user is authenticated
      throw new Error("Unauthorized");
    }
    const userId = indentity.subject; // this gets the user id

    const existingFavorite = await ctx.db // this checks if the user has a favorite
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", args.id),
      )
      .unique();

    if (existingFavorite) {
      // this checks if the user has a favorite
      await ctx.db.delete(existingFavorite._id); // this deletes the favorite
    }

    await ctx.db.delete(args.id); // this deletes the board from the database
  },
});

export const update = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const indentity = await ctx.auth.getUserIdentity(); // this gets the user identity

    if (!indentity) {
      // this checks if the user is authenticated
      throw new Error("Unauthorized");
    }

    const title = args.title.trim(); // this trims the title

    if (!title) {
      // this checks if the title is empty
      throw new Error("Title cannot be empty"); // this throws an error
    }
    if (title.length > 60) {
      // this checks if the title is longer than 60 characters
      throw new Error("Title cannot be longer than 60 characters");
    }

    const board = await ctx.db.patch(args.id, {
      // this patches the board in the database
      title: args.title, // this sets the title
    });

    return board; // this returns the board
  },
});

export const favorite = mutation({
  args: {
    id: v.id("boards"),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const indentity = await ctx.auth.getUserIdentity(); // this gets the user identity
    if (!indentity) {
      // this checks if the user is authenticated
      throw new Error("Unauthorized");
    }
    const board = await ctx.db.get(args.id); // this gets the board from the database

    if (!board) {
      // this checks if the board exists
      throw new Error("Board not found"); // this throws an error
    }

    const userId = indentity.subject; // this gets the user id

    const existingFavorite = await ctx.db // this checks if the board is already favorited
      .query("userFavorites") // this queries the userFavorites table
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id),
      )
      .unique();

    if (existingFavorite) {
      // this checks if the board is already favorited
      throw new Error("Already favorited");
    }
    await ctx.db.insert("userFavorites", {
      // finally, this inserts the board into the database
      orgId: args.orgId,
      boardId: board._id,
      userId: userId,
    });
    return board;
  },
});

export const unfavorite = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const indentity = await ctx.auth.getUserIdentity(); // this gets the user identity
    if (!indentity) {
      // this checks if the user is authenticated
      throw new Error("Unauthorized");
    }
    const board = await ctx.db.get(args.id); // this gets the board from the database

    if (!board) {
      // this checks if the board exists
      throw new Error("Board not found"); // this throws an error
    }

    const userId = indentity.subject; // this gets the user id

    const existingFavorite = await ctx.db // this checks if the board is already favorited
      .query("userFavorites") // this queries the userFavorites table
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id),
      )
      .unique();

    if (!existingFavorite) {
      // this checks if the board is already favorited
      throw new Error("Favorite board not found");
    }

    await ctx.db.delete(existingFavorite._id); // this deletes the board from the database

    return board;
  },
});
export const get = query({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const board = await ctx.db.get(args.id); // this gets the board from the database
    return board;
  },
});
