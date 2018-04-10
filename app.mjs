import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import Store from './db'

const app = new Koa()
app.use(bodyParser())

const router = new Router()

router.all('/', ctx => {
    ctx.body = 'Welcome API Gateway'
})


router.all('/subscribe', ctx => {
    console.log(ctx.request.body)
    let subscription = ctx.request.body
    Store.save(subscription).then(() => {
    })
    ctx.body = 'Subscribe OK.'
})

app.use(router.routes())


app.listen(3000)
