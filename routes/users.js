const express = require('express'),
    router = express.Router(),
    mongo = require('mongodb').MongoClient, 
    url = 'mongodb://localhost:27017/trello';

mongo.connect(url, {useNewUrlParser: true}, (err, client) => {
    if(err) {
        console.log(err);
        return
    }
    const db = client.db('trello');

    /* GET users listing. */
    router.get('/', function(req, res, next) {
    res.send('respond with a resource');
    });

    /* Check credentials */
    router.post('/login', (req, res, next) => {
        db.collection('users').findOne({ 
            $and: [
                { password: req.body.password },
                {$or: [
                    { login : req.body.login },
                    { email : req.body.login }
                ]}]}, (err, resp) => {
            if(err) throw err;
            if(resp && resp._id) {
                req.session.user = resp;
                console.log(req.session.user)
                res.send("OK");
            } else {
                req.session.destroy();
                res.send("NOK");
            }
        })
    });
    
    /* Create credentials */
    router.post('/create', (req, res, next) => {
        console.log(req)
        try {
            db.collection('users').insertOne({ 
                login: req.body.login, 
                email: req.body.email,
                password: req.body.password
            });
        } catch(e) {
            print (e);
        }
        console.log(res.body);
        res.render('index', { title: 'Trello' });
    });

    router.get('/logout', (req, res, next) => {
        req.session.destroy();
        res.redirect('/');
    });
})

module.exports = router;
