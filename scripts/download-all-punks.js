#!/usr/bin/env node

// Script by the allmighty Sun Guru to fetch all the punks and store them locally

const axios = require('axios');
const FileReader = require('filereader');

const punkIndices = Array(1).keys();

function stringToUint(string) {
  const parsedString = btoa(unescape(encodeURIComponent(string)));
  const charList = parsedString.split('');
  const uintArray = [];
  for (let i = 0; i < charList.length; i++) {
    uintArray.push(charList[i].charCodeAt(0));
  }
  return new Uint8Array(uintArray);
}

const toDataURLFromBlob = (data) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () =>
      resolve(Buffer.from(data.data, 'base64').toString());
    reader.onerror = reject;
    console.log(Buffer.from(data.data, 'base64').toString());
    // reader.readAsDataURL(Buffer.from(data.data, 'base64'));
  });
};

for (const punkIx of punkIndices) {
  const dataURL = `https://www.larvalabs.com/cryptopunks/cryptopunk${punkIx}.png`;
  axios.get(dataURL).then((response) => {
    const base58 = toDataURLFromBlob(response);
    console.log(base58);
  });
  // sleep(100).then((d) => true);
}

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
