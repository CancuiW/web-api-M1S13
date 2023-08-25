// implement your API here
const express=require('express')
const server=express()
//this teaches express to parse req.body
server.use(express.json());
let id = 0
let getId = () => ++id // helper function to create auto-incrementing ids

let hobbits = [ // our fake hobbits database table
    { id: getId(), name: 'S11' },
    { id: getId(), name: 'F22' },
];

//-----------get()method---------------
server.get('/',(req,res)=>{
    res.send('Hello World...')
})

server.get('/hobbits',(req,res)=>{
    
    res.status(200).json(hobbits)
})
server.get('/hobbits/:id', (req, res) => { // GET EXISTING HOBBIT BY id
    // the desired id comes in the URL, and is found in `req.params.id`
    res.status(200).json(hobbits.find(hob => hob.id == req.params.id));
});

//-----------post()method---------------

server.post('/hobbits', (req, res) => { // POST NEW HOBBIT
    // the desired name comes in the body, and is found in `req.body.name`
    hobbits.push({ id: getId(), name: req.body.name });
    res.status(201).json(hobbits); // 201 means "Created"
});

//-----------put()method---------------

server.put('/hobbits/:id', (req, res) => { // PUT EXISTING HOBBIT
    // the id to update is in `req.params.id` and the desired name in `req.body.name`
    hobbits = hobbits.map(hob => hob.id == req.params.id
        ? { ...hob, name: req.body.name } : hob);
    res.status(200).json(hobbits);
});

//-----------delete()method---------------

server.delete('/hobbits/:id', (req, res) => { // DELETE EXISTING HOBBIT
    hobbits = hobbits.filter(hob => hob.id != req.params.id);
    res.status(200).json(hobbits);
});








server.listen(8000,()=>{
    console.log('API running on port 8000')
})