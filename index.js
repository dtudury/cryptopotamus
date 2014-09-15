var crypto = require('crypto');
var bn = require('bignum');
var RandExp = require('randexp');

var config = require('./sample.json');

//product of 2 bn.prime(128) results (for blum blum shub)
var M = bn('78098118281233005579972958143295588852526594861094468258402109666655482488793');
var seed;
function prng(a, b) {
    seed = bn.powm(seed, 2, M);
    return seed.mod(1 + b - a).add(a).toNumber();
}
RandExp.setRandIntFunction(prng);

var password = "asdf1234";

var entry = config[0];

var hash = crypto.pbkdf2Sync(password, entry.version, entry.iterations, 32);
seed = bn.fromBuffer(hash);

function shuffle(str) {
    var output = "";
    var arr = str.split('');
    while (arr.length) {
        output += arr.splice(prng(0, arr.length - 1), 1)[0];
    }
    return output;
}

function renderTarget(obj) {
    var output = "";
    if (obj.sequence) {
        obj.sequence.forEach(function (step) {
            output += renderTarget(step);
        });
    } else if (obj.regex) {
        output = RandExp.randexp(RegExp(obj.regex));
    }
    if (obj.shuffle) {
        output = shuffle(output);
    }
    return output;
}

var output = renderTarget(entry.generator);
console.log(output);
