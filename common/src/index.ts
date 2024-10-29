import z from 'zod'

export const signUpInput = z.object({
    email:z.string(),
    password:z.string(),
    name:z.string().optional()
});
export type signUpType = z.infer<typeof signUpInput>;

export const signInInput = z.object({
    email:z.string(),
    password:z.string(),
});
export type signInType = z.infer<typeof signInInput>;

export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
});
export type CreatePostType = z.infer<typeof createPostInput>;

export const updatePostInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
});
export type UpdatePostType = z.infer<typeof updatePostInput>;

export const Blog = z.object({
    id: z.string(), // or number, depending on your API
    title: z.string(),
    content: z.string(),
    name: z.string(),
    date: z.string(),
    tags: z.array(z.string())
  });

export type BlogType = z.infer<typeof Blog>;