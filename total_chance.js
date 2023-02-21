const data = require('./data.json');
// Emblem stats to start of with
let chance = 0;

data.options.forEach(ele => {
  ele.chances.forEach(el => {
    chance += el;
  })
});

console.log(`Total Chance: ${chance}`);