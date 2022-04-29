require('dotenv').config();
const prompt = require('prompt')
prompt.start();

const Web3 = require('web3');
var url = '';
var balance = 0;

if (process.env.NETWORK === 'MAIN') {
    url = process.env.HTTPS_MAIN; // default is to connect on main check .env
} else {
    url = process.env.HTTP_ROPSTEN; //change here as you want. Change also .env
}

const w3 = new Web3(url);
main();

function main() {
    prompt.get(['address'], (err, result) => {
        if (err) {
            return onError();
        }
    
        return getBalance(result.address)
            .then(bal => console.log(`   BALANCE: ${bal}`))
            .catch(error => console.log(`   ERROR: ${error.message}`))
            .then(_ => main());
    });
}

function onError(error) {
    return error;
}

async function getBalance(address) {
    try {
        return w3.eth.getBalance(address, (err, bal) => bal )
    } catch(error) {
        return error;
    }
}

