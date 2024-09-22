import { v } from "convex/values";
import { mutation } from "./_generated/server";

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
