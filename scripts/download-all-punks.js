#!/usr/bin/env node
const missingIds = require('./missingIds.json');
const { default: axios } = require('axios');
const { promises: fs } = require('fs');
const path = require('path');
const randomUseragent = require('random-useragent');

const punkIds = Array.from({ length: 10001 - 5000 }, (_, i) => i + 5020);

const BASE_URL = 'https://www.larvalabs.com/cryptopunks';
const INTERVAL_TIME = 1000;

const sleep = (timeMs) => new Promise((resolve) => setTimeout(resolve, timeMs));

const storeImage = async (image, punkId) =>
  fs.writeFile(path.resolve(__dirname, 'images', `punk${punkId}.png`), image);

const fetchPunkIdImage = async (punkId, storeIdOnError = true) => {
  console.log(`FETCHING IMAGE FOR PUNK ID - ${punkId}`);
  try {
    const { data } = await axios.get(`${BASE_URL}/cryptopunk${punkId}.png`, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': randomUseragent.getRandom(),
      },
    });
    await storeImage(data, punkId);
    return true;
  } catch (err) {
    if (storeIdOnError) {
      missingIds.push(punkId);
      await fs.writeFile(
        path.resolve(__dirname, 'missingIds.json'),
        JSON.stringify(missingIds, null)
      );
    }
    console.log(err.response.data);
    return null;
  }
};

(async function () {
  for (let startCounter = 0; startCounter < punkIds.length; startCounter++) {
    const res = await fetchPunkIdImage(punkIds[startCounter]);
    if (!res) {
      console.log('RATE LIMIT DETECTED. PAUSING FOR 20 SECONDS');
      await sleep(20000);
      continue;
    }
    console.log('PAUSING FOR ' + INTERVAL_TIME / 1000 + ' SECONDS');
    await sleep(INTERVAL_TIME);
  }

  while (missingIds.length > 0) {
    const msIds = JSON.parse(
      await fs.readFile(path.resolve(__dirname, 'missingIds.json'), {
        encoding: 'utf-8',
      })
    );
    const missingId = msIds[msIds.length - 1];
    const res = await fetchPunkIdImage(missingId, false);
    if (!res) {
      console.log('RATE LIMIT DETECTED. PAUSING FOR 20 SECONDS');
      await sleep(20000);
      continue;
    }
    msIds.pop();
    missingIds = [...msIds];
    console.log('PAUSING FOR ' + INTERVAL_TIME / 1000 + ' SECONDS');
    await sleep(INTERVAL_TIME);
    await fs.writeFile(
      path.resolve(__dirname, 'missingIds.json'),
      JSON.stringify(msIds, null)
    );
  }
})();
