import * as express from 'express'
import { Application } from 'express'
import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

class App {
    public app: Application

    constructor(appInit: { middleWares: any; controllers: any; }) {
        this.app = express()

        this.middlewares(appInit.middleWares)
        this.routes(appInit.controllers)
        this.fireormInitialize();
    }

    private fireormInitialize() {
        const serviceAccount = require('../src/keys/service_account.json');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
        });
        const firestore = admin.firestore();
        fireorm.initialize(firestore);
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }
}

export default App