import axios from 'axios';
import EventSource from 'eventsource';
import { json, query } from 'express';

export const getTxDetails = async (txDetails) => {
    let dataLength = txDetails.data.length;
    let txData = txDetails.data;
    let ticker;
    let fromAddress;
    let toAddress;
    let amt;
    let tokenPrices;
    console.log('Tx Num = ', dataLength);

    try {
        tokenPrices = await axios.get(
            `https://storage.googleapis.com/kspr-api-v1/marketplace/marketplace.json?t=TIMESTAMP`
        );
        tokenPrices = tokenPrices.data;
        // console.log('Token Price = ', tokenPrices);
    } catch (err) {
        console.error('Error tx price data:', err);
    }

    for (let i = 0; i < dataLength; i++) {
        try {
            let txID = txData[i].transaction_id;
            const ithDetails = await axios.get(
                `https://api.kasplex.org/v1/krc20/op/${txID}`
            );
            const result = ithDetails.data.result;
            // console.log('Transaction Detail = ', result);
            console.log('Tx Id = ', txID);
            for (let j = 0; j < result.length; j ++) {
                console.log('Tick : ', result[j].tick);
                
                console.log('Amount : ', result[j].amt);
                console.log('From : ', result[j].from);
                console.log('To : ', result[j].to);
                console.log('Price : ', tokenPrices[result[j].tick].floor_price);
            }
        } catch (err) {
            // console.error('Error tx detail data:', err);
        }
        await sleep(1000);
    };

};

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getFullTransactions = async (kaspaAddress) => {
    const interval = setInterval(async () => {
        try {
            const txData = await axios.get(
                `https://api.kaspa.org/addresses/${kaspaAddress}/full-transactions`,
                {

                }
            );
            console.log('Success Full Transactions...');
            getTxDetails(txData);
        } catch (err) {
            console.error('Error Full Transaction Data:');
        }
    }, 5000);
};

