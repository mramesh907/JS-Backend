// require('dotenv').config()
// const express = require('express')
// const app = express()
// const port = 3000


// const demoData = {
//     "menu": {
//         "id": "file",
//         "value": "File",
//         "popup": {
//             "menuitem": [
//                 { "value": "New", "onclick": "CreateNewDoc()" },
//                 { "value": "Open", "onclick": "OpenDoc()" },
//                 { "value": "Close", "onclick": "CloseDoc()" }
//             ]
//         }
//     }
// }
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })
// app.get('/twitter', (req, res) => {
//     res.send('rameshmaity')
// })
// app.get('/login', (req, res) => {
//     res.send('<h1>please login at twitter</h1>')
// })
// app.get('/facebook',(req,res)=>{
//     res.send('<h1>please login at facebook</h1>')
// })
// app.get('/demo',(req,res)=>{
//     res.json(demoData)
// })
// app.listen(process.env.PORT, () => {
//     console.log(`Example app listening on port ${port}`)
// })
























import express from 'express';

const app = express();

// get a demo text
app.get('/', (req, res) => {
    res.send('<h1>This is HOME Page</h1>');
});

// get a list of 5 jokes
app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            "id": 1,
            "title": "Math Problem",
            "content": "Why was the math book sad? It had too many problems."
        },
        {
            "id": 2,
            "title": "Parallel Lines",
            "content": "Parallel lines have so much in common. It’s a shame they’ll never meet."
        },
        {
            "id": 3,
            "title": "Elevator Joke",
            "content": "I’m reading a book on anti-gravity. It’s impossible to put down."
        },
        {
            "id": 4,
            "title": "Time Traveler",
            "content": "Why did the time traveler keep stopping in the past? He liked things 'before' they were cool."
        },
        {
            "id": 5,
            "title": "Light Bulb",
            "content": "How many software engineers does it take to change a light bulb? None, that’s a hardware problem."
        }
    ]

    res.send(jokes);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
});


// npm run start(start= node index.js)
       