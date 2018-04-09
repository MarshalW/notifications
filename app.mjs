import Koa from 'koa'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()

router.all('/', ctx => {
    ctx.body = 'Hello Koa router'
})


router.all('/subscribe', ctx => {
    ctx.body = 'Subscribe OK.'
})

app.use(router.routes())
app.listen(3000)