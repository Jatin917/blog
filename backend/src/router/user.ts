import { Hono } from "hono/tiny";
import { signUpController } from "../controller/signUpController";
import { signInController } from "../controller/signInController";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signInInput, signUpInput } from "@jaitin/medium-common/dist/index";

export const userRoute = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    SECRET_KEY:string
	},
}>();
userRoute.post('/signup', async (c)=>{
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
      const body = await c.req.json();
      const { success } = signUpInput.safeParse(body)
      if (!success) {
        c.status(400);
        return c.json({ error: "invalid input" });
      }
      const res = await prisma.user.create({
        data: {
          name:body.name,
          email: body.email,
          password: body.password
        }
      });
      const token: string = await sign({ id: res.id }, c.env.SECRET_KEY) // Pass an object with id property
      return c.json({
        token: token,
      });
    } catch (error) {
      return c.json({
        message: (error as Error).message
      })
    }
});
userRoute.post('/signin', async (c) => {
    try {
        const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const body = await c.req.json();
        const { success } = signInInput.safeParse(body)
      if (!success) {
        c.status(400);
        return c.json({ error: "invalid input" });
      }
        console.log("body", body)
        const user = await prisma.user.findUnique({
          where:{
              email:body.email,
              password:body.password
          }
        });
        if (!user) {
          c.status(403);
          return c.json({ error: "user not found" });
        }
      const jwt = await sign({ id: user.id }, c.env.SECRET_KEY);
      return c.json({ jwt });
    } catch (error:any) {
        console.log("error is: ", error);
    }
});