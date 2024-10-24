import { PrismaClient } from "@prisma/client/extension"
import { withAccelerate } from "@prisma/extension-accelerate"

export const signUpController = async (c: {
    env: any;
    req: any; text: (arg0: string) => any 
}) =>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    await prisma.user.create({
        data:{
            email:body.email,
            password:body.password
        }
    });
    return c.text(body)
}