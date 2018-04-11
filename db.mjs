'use strict'

import Firestore from '@google-cloud/firestore'
import Config from 'config'

const firestore = new Firestore({
    projectId: Config.projectId,
    keyFilename: Config.keyFilename
})

export default class Store {
    static save (subscription) {
        return firestore.collection('subscriptions').add(subscription)
    }

    static getAll () {
        return firestore.collection('subscriptions').get()
    }
}