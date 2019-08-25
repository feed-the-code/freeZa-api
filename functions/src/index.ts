import * as functions from 'firebase-functions';
import * as express from 'express';
import * as admin from 'firebase-admin';
import { Item, ItemStatus } from './models';
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
                req.params.userId = decodedToken.uid;
                next()
            }).catch(function(error) {
                // Handle error
            });
    }
  })

router.get('/', (req, res) => {
    res.json({version: '0.0.1'});
    let addDoc = db.collection('test').add({ version: 1 })
        .then(ref => console.log('added ', ref.id));
});

router.post('/login', (req, res) => {
    const token = req.header("Authorization")

    res.json({message: 'Hello world'});
});

router.post('/item', (req, res) => {
    const item: Item = {
        id: uuid.v1().replace('-', ''),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        name: req.params.name,
        offerBy: req.params.userId,
        adoptBy: '',
        condition: req.params.condition,
        status: ItemStatus.Open,
        categories: req.params.categories,
        amount: req.params.amount,
        amountUnit: req.params.amountUnit,
    }

    db.collection('Item').add(item)
        .then(ref => res.json(item))
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
