const express = require('express');
const request = require("request-promise");


var config = require('./config.js');
var util = require('./util');
const LINE_NOTIFY_API = "https://notify-api.line.me/api/notify";

var app = express();


app.get('/', async function (req, res) {

    console.log("To day is date :" + new Date().toISOString().slice(0, 10));

    util.webHookInfo.then(function (doc) {
        console.log('Document is ' + doc);
        console.log(doc);

        request({
            method: "POST",
            uri: LINE_NOTIFY_API,
            headers: {
                Authorization: `Bearer ${config.accessToken}`
            },
            formData: {
                message: `แบบรายงานตัว วันที่ ${doc.date_th}   ${doc.link}`,
                stickerPackageId: 4,
                stickerId: 613
            }
        }).then(function (response) {
            console.log('Sent');
            res.json({
                "item": doc,
                "response": response
            });
        }).catch(function (err) {
            console.log('Error:', err.message);
            res.json({
                "item": doc,
                "Error": err.message
            });
        });

    })


});



var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Starting node.js on port ' + port);

});