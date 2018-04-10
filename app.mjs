import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

const app = new Koa()
app.use(bodyParser())

const router = new Router()

router.all('/', ctx => {
    ctx.body = 'Hello Koa router'
})


router.all('/subscribe', ctx => {
    console.log(ctx.request.body)
    ctx.body = 'Subscribe OK.'
})

app.use(router.routes())


app.listen(3000)
