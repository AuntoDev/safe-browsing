/*

    Copyright (c) 2021 Aunto Development

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

*/


const fetch = require('node-fetch');
const version = '1.0.6';

let credentials = {
    google: {
        id: null,
        token: null
    }
};

module.exports = {
    version: version,
    authorize: function (api_key, client_id) {
        if (!api_key) throw new Error('You must specify an api_key.');
        if (typeof(api_key) != 'string' || (client_id && typeof(client_id) != 'string')) throw new TypeError('The api_key and client_id vars can only be set to strings.');
        credentials.google = {
            id: client_id || null,
            token: api_key
        };
    },
    lookup: async function (url) {
        if (!url) throw new Error('You must specify a URL to check!');
        if (typeof(url) != 'string') throw new TypeError('The URL provided is not a string.');
        if (!credentials.google.token) throw new Error('You have not authenticated with Google yet! "SafeBrowsing.authorize(api_key[, client_id])"');

        let res;

        try {
            res = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${credentials.google.token}`, {
                method: 'POST',
                headers: {
                    'User-Agent': 'NPM:@auntodev/safe-browsing [using node-fetch] (+https://npmjs.com/package/@auntodev/safe-browsing)',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    client: {
                        clientId: credentials.google.id || 'unknown',
                        clientVersion: '1.5.2'
                    },
                    threatInfo: {
                        threatTypes: ['MALWARE','SOCIAL_ENGINEERING'],
                        platformTypes: ['ANY_PLATFORM'],
                        threatEntryTypes: ['URL'],
                        threatEntries: [{ url }]
                    }
                })
            }).then(x => x.json());
        } catch (err) {
            console.error(err);
            throw new Error('Failed to fetch from Google\'s servers. More information is likely above!');
        };

        if (!res.matches || res.matches.length < 1) return { url, type: 'SAFE', flagged: false };
        return { url, type: res.matches[0].threatType, flagged: true, type: res.matches[0].threatType };
    }
};

console.info(`\nYou're running @auntodev/safe-browsing version ${version}!\nPlease see: https://developers.google.com/safe-browsing/v4/usage-limits\n`);