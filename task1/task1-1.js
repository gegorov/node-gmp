const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (input) => {
  console.log(input.split('').reverse().join(''));
});
