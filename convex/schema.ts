import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { title } from "process";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
        role: v.union(v.literal("admin"), v.literal("candidate")),
        clerkId: v.string(),
    }).index("by_clerk_id", ["clerkId"]),


    interviews: defineTable({
        title: v.string(),
        description: v.optional(v.string()),
        startTime: v.number(),
        endTime: v.optional(v.number()),
        status: v.string(),
        streamCallId: v.string(),
        candidateId: v.string(),
        adminIds: v.array(v.string()),
    }).index("by_candidate_id", ["candidateId"]).index("by_stream_Call_id", ["streamCallId"]),

    comments: defineTable({
        content: v.string(),
        rating: v.number(),
        adminId: v.string(),
        interviewId: v.id("interviews")
    }).index("by_interview_id", ["interviewId"])
})

