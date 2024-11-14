var bigInt = require("big-integer");
 
const memo = {};
 
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
 
    let nth = req.body.nth;
 
    if (nth < 0) {
        throw 'The value of "nth" must be greater than or equal to 0';
    }
 
    const answer = fibonacci(bigInt(nth));
 
    context.res = {
        body: answer.toString()
    };
};
 
function fibonacci(n) {
    if (n.equals(0)) return bigInt.zero;
    if (n.equals(1)) return bigInt.one;
 
    if (memo[n]) {
        return memo[n];
    }
 
    memo[n] = fibonacci(n.subtract(1)).add(fibonacci(n.subtract(2)));
    return memo[n];
}