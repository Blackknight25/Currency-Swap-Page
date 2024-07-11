var sum_to_n_a = function(n) {
    let sum = 0;
    for(let i = 1; i <= n; i++){
        sum += i;
    }
    return sum;
} //Runtime: O(n)

var sum_to_n_b = function(n) {
    return n * (n + 1) /2;
} //Runtime: O(1)

var sum_to_n_c = function(n) {
    let sum = 0;
    for(let i = 1; i <= Math.floor(n / 2); i++){
        sum += i + (n - i + 1);
    }
    if(n % 2 !== 0){
        sum += Math.ceil(n / 2);
    }
    return sum;
} //Runtime: O(n/2)