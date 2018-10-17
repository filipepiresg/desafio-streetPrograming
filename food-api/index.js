const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const path = 'foods.json';
const port = 8080;
let foods = {}
fs.readFile(path, 'utf8', (err, data) => {
  if(err) console.log(err);
  else foods = {...JSON.parse(data || {})}
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// () -> comidas
app.get('/food', (_, res) => {
  console.log('search all on /food');
  (foods) 
    ? res.status(200).send(foods)
    : res.status(500).send('Arquivo não encontrado!');
});

// comida -> valor calorico
app.get('/food/:name', (req, res) => {
  const name = req.params.name;
  console.log(`search ${name} on /food`);
  if ( foods[name] !== undefined ) {
    res.status(200).send(`${foods[name]}`)
  } else {
    res.status(404).send('Item not found!');
  }
});

// { comida: valor_calorico }
app.post('/food', (req, res) => {
  const body = req.body;
  const name = Object.getOwnPropertyNames(body)[0];
  const calories = body[name];
  // if(typeof calories !== 'number') {
  //   res.status(400).send(`Calories value (${calories}) not permited`)
  //   return;
  // }
  // if(typeof name !== 'string') {
  //   res.status(400).send(`Food name (${name}) not allowed`)
  //   return;
  // }
  console.log(`insert into ${name}:${calories} on /food`);
  if(!foods[name]) {
    const newFoods = {...foods };
    newFoods[name] = calories
    fs.writeFile('foods.json', JSON.stringify(newFoods), (err) => {
      if(err) console.log(err);
    })
    res.status(201).send('Item has been created');
  } else {
    res.status(304).send('Existing item');
  }
  });
  
  // { comida: novo_valor_calorico }
app.patch('/food', (req, res) => {
  const body = req.body;
  const name = Object.getOwnPropertyNames(body)[0];
  const calories = body[name];
  // if(typeof calories !== 'number') {
  //   res.status(400).send(`Calories value (${calories}) not permited`)
  //   return;
  // }
  console.log(`update ${name} with ${calories} on /food`);
  if(foods[name]) {
    const newFoods = {...foods };
    newFoods[name] = calories;
    fs.writeFile('foods.json', JSON.stringify(newFoods), (err) => {
      if(err) console.log(err);
    })
    res.status(200).send('Item has been modified');
  } else {
    res.status(404).send('Item not found!');
  }
});

// comida -> ()
app.delete('/food/:name', (req, res) => {
  const name = req.params.name;
  console.log(`delete ${name} on /food`);
  if(foods[name]) {
    delete foods[name]
    fs.writeFile('foods.json', JSON.stringify(foods), (err) => {
      if(err) console.log(err);
    })
    res.status(410).send('Item has been deleted');
  }
  else res.status(404).send('Item not found!');
});