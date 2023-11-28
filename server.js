const express = require('express');
const PORT = 3000;
let list = require('./src/list.json')
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  return res.json(list);
});

app.get('/:id', (req, res)=>{
  const itemId = parseInt(req.params.id)
  const foundItem = list.find(item => item.id ==itemId)

  if (!foundItem){
    return res.status(404).send('item nao encontrado')
  }
})

app.post('/:id', (req, res) =>{
 const { name } = req.body

 if(!name){
    return res.status(400).send('o item é obrigatório')
 }

 const newItem = {
  id: list.length + 1,
  name
 }

 list.push(newItem)
 res.status(201).json(newItem)
})

app.delete('/:id', (req,res) =>{
const itemId = req.params.id  
const index = list.find(item => item.id === itemId)

if(!itemId){
  return res.status(404).send('item nao encontrado')
  }
  list.splice(index, 1)
  res.sendStatus(204)
})

app.put('/:id', (req,res) =>{
  const itemId = parseInt(req.params.id)
  const newName = req.body.name

  const itemToUpdate =  list.find(item => item.id == itemId)

  if (!itemToUpdate) {
    return res.status(404).send('item nao encontrado')}
  itemToUpdate.name = newName
  res.json(itemToUpdate)

  

})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

