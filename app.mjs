import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import Store from './db'
import webpush from 'web-push'
import Config from 'config'

const app = new Koa()
app.use(bodyParser())

const router = new Router()

router.all('/', ctx => {
    ctx.body = 'Welcome API Gateway'
})


router.post('/subscribe', ctx => {
    console.log(ctx.request.body)
    let subscription = ctx.request.body
    Store.save(subscription).then(() => {
    })
    ctx.body = 'Subscribe OK.'
})

const {publicKey, privateKey} = Config.vapidDetails
webpush.setVapidDetails(Config.mailTo, publicKey, privateKey)

router.post('/push', ctx => {
    console.log(ctx.request.body)
    let news = ctx.request.body

    Store.getAll().then(subscriptions => {
        subscriptions.forEach(subscription => {
            webpush.sendNotification('Hello news~~~', then(() => {
                console.log(`send to ${subscription}`)
            })).catch(err => {
                if (err.statusCode == 410) {
                    console.log('this subscription is removed')
                } else {
                    console.log('this subscription is no longer valid: ', err)
                    console.log(err.statusCode)
                }
            })
        })
    })

    ctx.body = 'Push OK.'
})

app.use(router.routes())


app.listen(3000)
