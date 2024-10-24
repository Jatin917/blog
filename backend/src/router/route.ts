import { Hono } from "hono/quick"
import { user } from "./user"
import { blog } from "./blog"

export const routes = new Hono().basePath('/app/v1')
routes.route('/', user)
routes.route('/', blog)