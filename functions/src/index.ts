import * as functions from 'firebase-functions';
import * as express from 'express';
import * as admin from 'firebase-admin';

admin.initializeApp();

const app = express();
const router = express.Router()

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
});

router.post('/login', (req, res) => {
    const token = req.header("Authorization")

    res.json({message: 'Hello world'});
});

app.use('/api', router)

exports.app = functions.https.onRequest(app);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
