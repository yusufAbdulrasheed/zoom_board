import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// add new comments
export const addComment = mutation({
    args: {
        interviewId: v.id("interviews"),
        content: v.string(),
        rating: v.number()
    },

    handler: async ( ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) throw new Error("unauthorized")

        return await ctx.db.insert("comments", {
            interviewId: args.interviewId,
            content: args.content,
            rating: args.rating,
            adminId: identity.subject
        })
    }
})

// Get COmments
export const getComments = query({
    args: {interviewId: v.id("interviews")},

    handler: async (ctx, args) =>{
        const comments = await ctx.db

        .query("comments")
        .withIndex("by_interview_id", (q) => q.eq("interviewId", args.interviewId))
        .collect()

        return comments
    }
})