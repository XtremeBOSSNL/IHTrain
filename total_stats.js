const data = require('./data.json');
// Emblem stats to start of with
let fixed_attack = 1200000;
let fixed_hp = 108000000;

data.options.forEach(ele => {
  if (ele.stats?.fixed_attack) {
    fixed_attack += ele.stats.fixed_attack[4];
  }
  if (ele.stats?.fixed_hp) {
    fixed_hp += ele.stats.fixed_hp[4];
  }
});

console.log(`Total Attack: ${fixed_attack}\nTotal Hp: ${fixed_hp}`);