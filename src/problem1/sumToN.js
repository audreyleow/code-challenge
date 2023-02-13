// Problem 1: Three ways to sum to n

// first implementation - for loop
const sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// second implementation - recursive
const sum_to_n_b = function (n) {
  if (n == 1) {
    return 1;
  } else {
    return n + sum_to_n_b(n - 1);
  }
};

// third implementation - idk what's the term for this but it's what I do in my head normally
const sum_to_n_c = function (n) {
  const totalPairs = Math.floor(n / 2);
  if (n % 2 == 1) {
    return totalPairs * (n + 1) + (totalPairs + 1);
  } else {
    return totalPairs * (n + 1);
  }
};
// console.log(sum_to_n_a(3));
// console.log(sum_to_n_b(3));
// console.log(sum_to_n_c(3));
