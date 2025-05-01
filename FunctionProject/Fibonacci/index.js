var bigInt = require("big-integer");

const memo = {
    0: bigInt.zero,
    1: bigInt.one
};

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const nth = req.body.nth;

    if (nth < 0) {
        throw 'must be greater than 0';
    }

    const answer = fiboMem(nth);
    context.res = {
        body: answer.toString()
    };
};

function fiboMem(n) {
    if (memo.hasOwnProperty(n)) {
        return memo[n];
    }

    const result = fiboMem(n - 1).add(fiboMem(n - 2));
    
    memo[n] = result;
    
    return result;
};