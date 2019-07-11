const express = require('express'),
    router = express.Router(),
    mongo = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectId, 
    url = 'mongodb://localhost:27017/trello';

mongo.connect(url, {useNewUrlParser: true}, (err, client) => {
    if(err) {
        console.log(err);
        return
    }
    const db = client.db('trello');

    router.get('/', (req, res, next) => {
        if (req.session.user) {
            const boards = db.collection('boards').find({ creator: req.session.user.login }).toArray().then((boards) => {
                res.send(boards);
            });
        } else {
            res.send('[]');
        }
    })

    router.post('/', (req, res, next) => {
        db.collection('boards').insertOne({  
            creator: req.session.user.login, 
            name: req.body.board
        });
        res.send('OK');
    })

    router.get('/:id', (req, res, next) => {
        board = db.collection('boards').findOne({_id: new ObjectId(req.params.id)}, (err, resp) => {
            console.log(resp)
            if(err) throw err;
            if(resp && resp._id) {
                res.send(resp);
            } else {
                res.send("NOK");
            }
        })
    })
})



module.exports = router;
