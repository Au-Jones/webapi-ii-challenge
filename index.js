const express = require('express');

const server = express();

const db = require('./data/db');

server.use(express.json());

server.get('/', (req,res) => {
    res.send('Hello Angel')
})

server.post('/api/posts', (req,res) => {
    const apiInfo = req.body;
    if( !apiInfo.title || !apiInfo.contents) {
        res.status(400).json({errorMessage: 'please provide title and content for the post'})
    }else{
        bd.insert(apiInfo)
        .then(post => res.status(201).json(post))
        .catch(err => res.status(500).json ({error: 'There was an error while saving the post to the database'}))
    }
})

server.post('/api/posts/:id/comments', (req, res) => {
const id = req.params.comments;
const comment = req.body;
db.findById(id)
.then(post => {
    if(post){
        if(!comment.title || !comment.contents) {
            db.update(id, comment)
            .then(updated =>res.status(200).json(updated))
            .catch(err => res.status(500).json({error: 'there was a error while saving comment to the database'}))
        }
        else{
            res.status(400).json({errorMessage:'please provide text for the comment'})
        }
       
    }
    else{
        res.status(404).json({message: 'the post with the specified Id does not exist'})
    }
})
.call(err => res.status(500).json({error:'there was an error will saving comment to the database'}))
})


server.get('/api/posts', (req , res) => {
    bd.find()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({error: "The posts information could not be retrieved."}))
})

server.get('api/posts/:id', (req, res) => {
    db.findById(id)
    .then(posts => res.status(404).json({ message: "The post with the specified ID does not exist." }))
    .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))

})

server.get('/api/posts/:id/comments',(req, res)=>{
    db.findById(id)
    .then(posts => res.status(404).json({ message: "The post with the specified ID does not exist." }))
    .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))

})

server.delete('/api/posts/:id', (req, res) => {
    const id = req.param.id
    db.remove(id)
    .then(posts => {
        if(posts) {
            res.status(200).end()
        }
        else{
            res.status(404).json({ message: 'thepost with the specified ID does not exist'})
        }
    })
    .catch(err => res.status(500).json({ error: 'the user could not be removed'}))
})

server.put('/api/posts/:id/', (req, res) => {
    const id = req.params.comments;
    const comment = req.body;
    db.findById(id)
    .then(post => {
        if(post){
            if(!comment.title || !comment.contents) {
                db.update(id, comment)
                .then(OK =>res.status(200).json(OK))
                .catch(err => res.status(500).json({error: 'there was a error while saving comment to the database'}))
            }
            else{
                res.status(400).json({errorMessage:'please provide text for the comment'})
            }
           
        }
        else{
            res.status(404).json({message: 'the post with the specified Id does not exist'})
        }
    })
    .call(err => res.status(500).json({error:'there was an error will saving comment to the database'}))
    })


server.listen(4444, () => console.log('my first express server is running on port 4444'));