const express = require('express');
const router = express.Router();
const fs = require('fs');
const creatureData = JSON.parse(fs.readFileSync('./prehistoric_creatures.json'));


// Show list of creatures
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

// Add new creature form
router.get('/new', (req, res) => {
  res.render('prehistoric_creatures/new');
});

// Delete creature 
router.delete('/:idx', (req, res) => {
  // const id = req.params.idx - 1;
  creatureData.splice(req.params.idx, 1);
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));
  res.redirect('/prehistoric_creatures');
});

// Edit dino data
router.put('/:idx', (req, res) => {
  // const id = req.params.idx - 1;
  creatureData.splice(req.params.idx, 1);
  creatureData.push(req.body);
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));
  res.redirect('/prehistoric_creatures');
})

// 
// router.post('/:idx', (req, res) => {
//   const id = req.params.idx - 1;
//   const data = (({ type, img_url }) => ({ type, img_url }))(req.body);
//   if(req.body._method === 'PUT') {
//     creatureData.splice(id, 1);
//     creatureData.push(data);
//     console.log('edited');
//   } else if (req.body._method === 'DELETE') {
//     creatureData.splice(id, 1);
//     console.log('deleted');
//   }
//   fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));
//   res.redirect('/prehistoric_creatures');
// });

// Show one creature
router.get('/:idx', (req, res) => {
  const creature = creatureData[req.params.idx];
  if(creature) {
    res.render('prehistoric_creatures/show', {item: creature});
  } else {
    res.send('This is not the creature you are looking for.')
  }
});

// Show edit form
router.get('/edit/:idx', (req, res) => {
  const creature = creatureData[req.params.idx];
  if(creature) {
    res.render('prehistoric_creatures/edit', {item: creature, idx: req.params.idx});
  } else {
    res.send('There is no creature here to edit.')
  }
});

// Add new creature
router.post('/', (req, res) => {
  creatureData.push(req.body);
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));
  res.redirect('/prehistoric_creatures');
});

module.exports = router;