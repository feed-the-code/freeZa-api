import * as functions from 'firebase-functions';
import * as express from 'express';
import * as admin from 'firebase-admin';
import { Item, ItemStatus, ItemCategory } from './models';
import * as uuid from 'uuid';

admin.initializeApp(functions.config().firebase);

const app = express();
const router = express.Router()
const db = admin.firestore();

router.use(function (req, res, next) {
    const token = req.header("Authorization")

    if (token) {
        admin.auth().verifyIdToken(token)
            .then(decodedToken => {
                req.body.userId = decodedToken.uid;
                next()
            }).catch(error => {
                // Handle error
                console.log(error)
            });
    } else {
        next()
    }
  })

router.get('/', (req, res) => {
    res.json({version: '0.0.1'});
    db.collection('test').add({ version: 1 })
        .then(ref => console.log('added ', ref.id))
        .catch();
});

router.post('/login', (req, res) => {
    // const token = req.header("Authorization")

    res.json({message: 'Hello world'});
});

router.post('/item', (req, res) => {
    const item: Item = {
        id: uuid.v1().replace('-', ''),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        name: req.body.name,
        offerBy: req.body.userId,
        adoptBy: '',
        condition: req.body.condition,
        status: ItemStatus.Open,
        tags: req.body.tags,
    }

    db.collection('Item').add(item)
        .then(ref => res.json(item))
        .catch()
})

router.get('/item', (req, res) => {
    db.collection('Item').get()
        .then(r => res.json(r.docs))
        .catch()
})

app.use('/api', router)

exports.app = functions.https.onRequest(app);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
