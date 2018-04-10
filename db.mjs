'use strict'

import Firestore from '@google-cloud/firestore'
import Config from 'config'

const firestore = new Firestore({
    projectId: Config.projectId,
    keyFilename: Config.keyFilename
})

const subscriptions = firestore.collection('subscriptions')

export default class Store {
    static save (subscription) {
        return subscriptions.add(subscription)
    }
}