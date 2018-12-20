const express = require('express');
const router = express.Router();
const fs = require('fs');
const dinoData = JSON.parse(fs.readFileSync('./dinosaurs.json'));


// Show list of Dinos
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


// Add new dino form
router.get('/new', (req, res) => {
  res.render('dinosaurs/new');
});


// Delete dino
router.delete('/:idx', (req, res) => {
  // const id = req.params.idx - 1;
  dinoData.splice(req.params.idx, 1);
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
  res.redirect('/dinosaurs');
});

// Edit dino data
router.put('/:idx', (req, res) => {
  // const id = req.params.idx - 1;
  dinoData.splice(req.params.idx, 1);
  dinoData.push(req.body);
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
  res.redirect('/dinosaurs');
})

// Show one dino
router.get('/:idx', (req, res) => {
  // const dino = dinoData[req.params.idx - 1];
  const dino = dinoData[req.params.idx];
  if(dino) {
    res.render('dinosaurs/show', {item: dino});
  } else {
    res.send('This is not the dino you are looking for.')
  }
});

// Show edit form
router.get('/edit/:idx', (req, res) => {
  // const dino = dinoData[req.params.idx - 1];
  const dino = dinoData[req.params.idx];
  if(dino) {
    res.render('dinosaurs/edit', {item: dino, idx: req.params.idx});
  } else {
    res.send('There is no dino here to edit.')
  }
});

// Add new dino
router.post('/', (req, res) => {
  dinoData.push(req.body);
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
  res.redirect('/dinosaurs');
});


module.exports = router;