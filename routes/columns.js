var express = require('express');
var router = express.Router();

/* GET columns listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', (req, res, next) => {
    column = db.collection('columns').find({boardId: (req.params.id)}, (err, resp) => {
        if(err) throw err;
        if(resp && resp._id) {
            res.send(resp);
        } else {
            res.send("NOK");
        }
    })
})

router.post('/', (req, res, next) => {
    db.collection('columns').insertOne({  
        content: req.body.content, 
        id: req.body.id
    });
    res.send('OK');
})

module.exports = router;
