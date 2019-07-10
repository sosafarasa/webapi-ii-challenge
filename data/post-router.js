const express = require('express');

const db = require('./db.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." }) 
    })
})

router.get('/:id', async (req, res) => {
    try {
        const postById = await db.findById(req.params.id);

        if(postById) {
            res.status(200).json(postById);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    }
    catch (err){
        console.log(err);
        res.status(500).json({ error: "The post information could not be retrieved." });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, contents } = req.body;
        if( !title || !contents ) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }

        const newPost = await db.insert(req.body);
        res.status(201).json(newPost);
    } 
    catch(err) {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const count = await db.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({ message: 'Post deleted.'})
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }

    }
    catch(err) {
        res.status(500).json({ error: "The post could not be removed" })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const postUpdate = await db.update(req.params.id, req.body);
        if(postUpdate){
            res.status(200).json(postUpdate);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    }
    catch(err) {
        res.status(500).json({ error: "The post information could not be modified." })
    }
});





module.exports = router;