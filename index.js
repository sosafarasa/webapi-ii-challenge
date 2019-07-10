const express = require('express');

const server = express();

const postRouter = require('./posts/post-router');

server.use(express.json());
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
    res.send(`<h1>API Running</h1>`)
})

server.listen(5000, () => {
    console.log('\n*** Server Running on http://localhost:5000 ***\n');
});