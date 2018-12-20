const express = require('express');
const router = express.Router();
const fs = require('fs');
const creatureData = JSON.parse(fs.readFileSync('./prehistoric_creatures.json'));


router.get('/', (req, res) => {
  const typeFilter = req.query.typeFilter;
  let filteredData = creatureData;
  if(typeFilter) {
    filteredData = filteredData.filter((creature) => {
      return creature.type.toLowerCase().includes(typeFilter.toLowerCase());
    });
  }
  res.render('prehistoric_creatures/index', {items: filteredData});
});

router.get('/new', (req, res) => {
  res.render('prehistoric_creatures/new');
});

router.post('/:idx', (req, res) => {
  const id = req.params.idx - 1;
  const data = (({ type, img_url }) => ({ type, img_url }))(req.body);
  if(req.body._method === 'PUT') {
    creatureData.splice(id, 1);
    creatureData.push(data);
    console.log('edited');
  } else if (req.body._method === 'DELETE') {
    creatureData.splice(id, 1);
    console.log('deleted');
  }
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));
  res.redirect('/prehistoric_creatures');
});

router.get('/:idx', (req, res) => {
  const creature = creatureData[req.params.idx - 1];
  if(creature) {
    res.render('prehistoric_creatures/show', {item: creature});
  } else {
    res.send('This is not the creature you are looking for.')
  }
});

router.get('/edit/:idx', (req, res) => {
  const creature = creatureData[req.params.idx - 1];
  if(creature) {
    res.render('prehistoric_creatures/edit', {item: creature, idx: req.params.idx});
  } else {
    res.send('There is no creature here to edit.')
  }
});

router.post('/', (req, res) => {
  creatureData.push(req.body);
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));
  res.redirect('/prehistoric_creatures');
});

module.exports = router;