const express = require('express');
const PORT = 3000;
let list = require('./src/list.json')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  return res.json(list);
});

app.post('/', (req, res) =>{
  const mensagem = req.body.post;
  const number = req.body.number;
  list.push({post: mensagem, number: number})
  return res.json(list)
})

app.delete('/', (req,res) =>{
  req.body
  return res.json(list.pop())
})

app.put('/', (req,res) =>{
  const updatePost = req.body.post
  const itemToUpdate = list.find(item => item.post === updatePost)

  if (itemToUpdate) {
    itemToUpdate.post = updatePost
    return res.json(list)}

  

})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

