import { Hono } from 'hono'
import { routes } from './router/route'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt';
import { handle } from 'hono/cloudflare-pages';
import { createMiddleware } from 'hono/factory';
import { userRoute } from './router/user';
import { blogRoute } from './router/blog';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    SECRET_KEY: string
  },
  Variables : {
		userId: string
	}
}>();
app.use('*', cors());
app.use('*', async (c, next) => {
  await next();
  // Set the Referrer-Policy header
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
});

app.use('/app/v1/blog/*', async (c, next) => {
  try {
    const jwt = c.req.header('Authorization');
    if (!jwt) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    };
    const token = jwt.split(" ")[1];
    const payload = await verify(token, c.env.SECRET_KEY);
    if(!payload){
      c.status(401);
      return c.json({ error: "unauthorized" });
    };
    c.set('userId', String(payload.id));
    console.log("middleware done");
    await next()
  } catch (error) {
    console.log((error as Error).message);
  }
})
    
// routes
app.route('/app/v1/user', userRoute);
app.route('/app/v1/blog', blogRoute);


// app.post('/app/v1/blog', async (c)=>{
//   console.log('userID: ', c.get('userId'));
// 	return c.text('signin route')
// });

// app.put('/app/v1/blog', async (c)=>{

// });

// app.get('/app/v1/blog:id', async (c)=>{

// });

// app.get('/app/v1/blog/bulk', async (c)=>{
//   try {
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL	,
//     }).$extends(withAccelerate());
//     const userId = c.get("userId");
    
//     const posts = await prisma.post.findMany();
//     console.log("posts are", posts);
//     return c.json(posts);
// } catch (error) {
//     console.log('err is: ', error);
// }
// });



export default app