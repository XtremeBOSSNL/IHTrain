const sim = require('./simulate');

let total = 0; // Total Pulls
let min = 9999999999999; // Least amount of pulls
let max = 0; // Highest amount of pulls

for (let i = 0;i < 1000;i++) {
  let result = sim.run();
  result[1] /= 1000; //Convert currency to pulls;
  if (result[1] < min) {
    min = result[1];
  }
  if (result[1] > max) {
    max = result[1];
  }
  total += result[1];
}

total /= 1000;

console.log(`Average Amount of pulls: ${total}\n$${total*4}\n${total*10}`);
console.log(`Min Amount of pulls: ${min}\n$${min*4}\n${min*10}`);
console.log(`Max Amount of pulls: ${max}\n$${max*4}\n${max*10}`);