import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import json from 'koa-json'
import Store from './db'
import webpush from 'web-push'
import Config from 'config'
import news from './news'

const app = new Koa()
app.use(bodyParser({
    enableTypes: ['text', 'json']
}))

const router = new Router()

router.all('/', ctx => {
    ctx.body = 'Welcome API Gateway'
})


router.post('/subscribe', ctx => {
    console.log(ctx.request.body)
    let subscription = JSON.parse(ctx.request.body)
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
            console.log(subscription.data())
            webpush.sendNotification(subscription.data(), news).then(() => {
                console.log(`send to ${subscription.data()}`)
            }).catch(err => {
                if (err.statusCode == 410) {
                    console.log('this subscription is removed')
                } else {
                    console.log('this subscription is no longer valid: ', err, err.statusCode)
                }
            })
        })
    }).catch(err => {
        console.log('Error getting documents', err)
    })

    ctx.body = 'Push OK.'
})

router.get('/list', (ctx, next) => {
    ctx.body = news.list
})

app.use(router.routes())
app.use(json())


app.listen(3000)