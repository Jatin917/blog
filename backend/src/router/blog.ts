import { Hono } from 'hono'
import { getAllBlog } from "../controller/getAllBlog";
import { getBlogById } from "../controller/getBlogById";
import { postBlog } from "../controller/postBlog";
import { updateBlog } from "../controller/updateBlog";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createPostInput, updatePostInput } from '@jaitin/medium-common';



export const blogRoute = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        SECRET_KEY:string
	},
    Variables : {
		userId: string
	}
}>();
blogRoute.post('/', async (c)=>{
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate());
        const body = await c.req.json();
        const { success } = createPostInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ error: "invalid input" });
        }
        // const postExist = await prisma.post.findUnique({
        //     where: {
        //         // authorId:c.get('userId'),
        //         title:body.title,
        //         content:body.content,
        //     }
        // })
        const post = await prisma.post.create({
            data:{
                title:body.title,
                content:body.content,
                // author:body.author,
                authorId:c.get('userId')
            }
        });
        return c.json({
            id: post.id
        });
    } catch (error) {
        console.log("error is: ", error);
    }
});
blogRoute.put('/', async (c)=>{
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate());
        const body = await c.req.json();
        const { success } = updatePostInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ error: "invalid input" });
        }
        const updatedPost = await prisma.post.update({
            where:{
                id:body.id,
                authorId: c.get('userId')
            },
            data: {
                title:body.title,
                content:body.content
            }
        });
        if(!updatedPost){
            c.status(500);
            return c.json({
                message:"Not Updated!!!"
            });
        }
        c.status(200);
        return c.json({
            message:"Successfully Updated", 
            updatedPost
        })
    } catch (error) {
        
    }
});
blogRoute.get('get/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id
		}
	});

	return c.json(post);
});
blogRoute.get('blogs', async (c)=>{
    return c.json({
        message:"All Blog Post",
    })
});
blogRoute.get('/bulk', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL	,
        }).$extends(withAccelerate());
        
        const posts = await prisma.post.findMany();
        const response = await Promise.all(posts.map(async (post) => {
            const res = await prisma.user.findUnique({
                where: {
                    id: post.authorId
                }
            });
            return { ...post, name: res?.name }; // Use 'name' directly instead of ["name"]
        }));
        console.log("posts are", posts);
        return c.json(response);
    } catch (error) {
        console.log('err is: ', error);
    }
});