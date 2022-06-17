/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */
const express = require('express');

const app = express();
const admin = require('firebase-admin');
const credentials = require('./samuelmwangi-ca822-firebase-adminsdk-s47k1-6f87defc30.json');


admin.initializeApp({
    credential: admin.credential.cert(credentials)
});



app.use(express.json());
app.post('/signup', async (req, res) => {
 
    const User = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }

    const userResponse = await admin.auth().createUser({
       username:User.username,
        email: User.email,
        password: User.password,
        emailVerified: false,
        disabled: false,
    })

    res.send({ msg: "user added " });
    res.json(userResponse);
})


app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('server is up PORT')
    console.log(PORT)
});
