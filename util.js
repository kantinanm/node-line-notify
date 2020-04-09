const functions = require('firebase-functions');
const admin = require('firebase-admin');
var config = require('./config.js');

var serviceAccount = require(config.serviceAccountPath);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.databaseURL
});

const db = admin.firestore();

exports.getData = async function (date_notify, cb) {

    db.collection('forms').where('date_en', '==', date_notify).onSnapshot(
        await
        function (snapshot) {
            const events = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            cb(events);

        })
};

exports.webHookInfo = new Promise((resolve, reject) => {
    db.collection('forms').where('date_en', '==', new Date().toISOString().slice(0, 10)).get()
        .then(snapshot => {
            let link = '';
            let date_th = '';
            const datas = snapshot.docs.map(doc => ({
                id: doc.id,
                link: doc.data().link,
                date_th: doc.data().date_th
            }))
            console.log(datas)

            link = snapshot.docs[0].data().link
            date_th = snapshot.docs[0].data().date_th



            console.log("done ")
            console.log(link)
            console.log("link done ")
            //resolve(JSON.stringify(datas))
            //resolve(link)

            resolve({
                'link': link,
                'date_th': date_th
            })

        }).catch(e => {
            console.log("reject ");
            reject(null);
        })

}).catch(e => {
    console.log('That did not go well.')
    throw e
})