const express = require('express');
const router = express.Router();
const fs = require('fs');
const dinoData = JSON.parse(fs.readFileSync('./dinosaurs.json'));


router.get('/', (req, res) => {
  const nameFilter = req.query.nameFilter;
  let filteredData = dinoData;
  if(nameFilter) {
    filteredData = filteredData.filter((dino) => {
      return dino.name.toLowerCase().includes(nameFilter.toLowerCase());
    });
  }
  res.render('dinosaurs/index', {items: filteredData});
});

router.get('/new', (req, res) => {
  res.render('dinosaurs/new');
});

router.post('/:idx', (req, res) => {
  const id = req.params.idx - 1;
  const data = (({ type, name }) => ({ type, name }))(req.body);
  if(req.body._method === 'PUT') {
    dinoData.splice(id, 1);
    dinoData.push(data);
    console.log('edited');
  } else if (req.body._method === 'DELETE') {
    dinoData.splice(id, 1);
    console.log('deleted');
  }
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
  res.redirect('/dinosaurs');
});

router.get('/:idx', (req, res) => {
  const dino = dinoData[req.params.idx - 1];
  if(dino) {
    res.render('dinosaurs/show', {item: dino});
  } else {
    res.send('This is not the dino you are looking for.')
  }
});

router.get('/edit/:idx', (req, res) => {
  const dino = dinoData[req.params.idx - 1];
  if(dino) {
    res.render('dinosaurs/edit', {item: dino, idx: req.params.idx});
  } else {
    res.send('There is no dino here to edit.')
  }
});


router.post('/', (req, res) => {
  dinoData.push(req.body);
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
  res.redirect('/dinosaurs');
});


module.exports = router;