const data = require('./data.json');
const refundAmounts = {
  purple: 1000,
  green: 1500,
  red: 2800,
  orange: 14000,
  pink: 21000,
}

function run () {
  let current_chance = 0;
  data.options.forEach(treasure => {
    treasure.amount = 0;
    treasure.shards = 0;
    treasure.maxed = false;
    //Setup the chances
    let chances = treasure.chances;
    treasure.minchance = current_chance;
    treasure.full = current_chance;
    current_chance += (chances[0] * 1000);
    treasure.three_shards = current_chance;
    current_chance += (chances[1] * 1000);
    treasure.two_shards = current_chance;
    current_chance += (chances[2] * 1000);
    treasure.one_shards = current_chance;
    current_chance += (chances[3] * 1000);
    treasure.maxchance = current_chance;
  });

  let maxed = false

  let pulls = 0; // Just total pulls
  let new_currency = 0; // New Currency Put into the system
  let currency_refunded = 0; // Total currency refunded
  let current_currency = 0; // Just for sim purposes

  while (!maxed) {
    pulls++;
    if (current_currency >= 1000) {
      current_currency -= 1000;
    } else {
      new_currency += (1000 - current_currency);
    }
    let number = drawNumber();
    let loot = findTreasure(number);
    let status = addLoot(loot,number);
    if (status === -1) { // Any errors
      console.log(`Loot: ${loot}\nNumber:${number}`);
      process.exit();
    }
    if (status === 2) {
      status = craftLoot(loot);
    }
    if (status === 1) {
      status = isTreasureMaxed(loot);
    }
    if (status === 4 ) {
      let refund = refundAmount(loot);
      current_currency += refund;
      currency_refunded += refund;
    }
    if (status === 3) {
      status = isEverythingMaxed(data.options);
    }
    if (status === 10) {
      maxed = true;
    }
  }
  // console.log(`Total Pulls: ${pulls}\nTotal new Currency: ${new_currency}\nTotal Refunded Currency: ${currency_refunded}`);
  return [pulls, new_currency, currency_refunded];
}

// 100 10 1   0.1  0.01  0.001
// 1   10 100 1000 10000 100000


function drawNumber () {
  return Math.floor(Math.random() * 100000);
}

function findTreasure (number) {
  return data.options.find(({ minchance, maxchance}) => minchance <= number && maxchance > number);
}

function addLoot (loot, number) {
  if (loot.full <= number && number < loot.three_shards) {
    loot.amount++;
    return 1;
  } else if (loot.three_shards <= number && number < loot.two_shards) {
    loot.shards += 3;
    return 2;
  } else if (loot.two_shards <= number && number < loot.one_shards) {
    loot.shards += 2;
    return 2;
  } else if (loot.one_shards <= number && number < loot.maxchance) {
    loot.shards += 1;
    return 2;
  } else {
    return -1;
  }
}

function craftLoot (loot) {
  if (loot.shards > data.rarity_shards[loot.rarity]) {
    loot.shards -= data.rarity_shards[loot.rarity];
    loot.amount++;
    return 1;
  } else {
    return 2;
  }
}

function isTreasureMaxed(loot) {
  if (loot.maxed == true) {
    return 4;
  } else if (loot.amount >= 16) {
    loot.maxed = true;
    return 3;
  } else {
    return 0;
  }
}

function isEverythingMaxed(treasures) {
  let notMaxed = treasures.find(({ amount }) => amount < 16);
  if (notMaxed) {
    return 0;
  } else {
    return 10;
  }
}

function refundAmount (loot) {
  return refundAmounts[loot.rarity];
}

module.exports = {run}