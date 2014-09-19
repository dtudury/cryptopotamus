var crypto = require('crypto');
var BN = require('bignum');
var RandExp = require('randexp');
var Clipboard = require("copy-paste").noConflict().silent();

var config = require('./sample.json');

//product of 2 BN.prime(128) results (for blum blum shub)
var M = BN('78098118281233005579972958143295588852526594861094468258402109666655482488793');
var seed;
function prng(a, b) {
    seed = BN.powm(seed, 2, M);
    return seed.mod(1 + b - a).add(a).toNumber();
}
RandExp.prototype.randInt = prng;


function shuffle(str) {
    var output = "";
    var arr = str.split('');
    while (arr.length) {
        output += arr.splice(prng(0, arr.length - 1), 1)[0];
    }
    return output;
}

function generate(generator) {
    var output = "";
    if (generator.sequence) {
        generator.sequence.forEach(function (subGenerator) {
            output += generate(subGenerator);
        });
    } else if (generator.regex) {
        output = RandExp.randexp(RegExp(generator.regex));
    }
    if (generator.shuffle) {
        output = shuffle(output);
    }
    return output;
}

function renderTarget(target, password) {
    var salt = target.username + '\0' + target.website + '\0' + target.version;
    var hash = crypto.pbkdf2Sync(password, salt, target.iterations, 32);
    seed = BN.fromBuffer(hash);
    return generate(target.generator);
}

var password = "asdf1234";
var key = renderTarget(config[0], password);
console.log(key);
Clipboard.copy(key)
