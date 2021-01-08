## Install
To install this package, use `npm install @auntodev/safe-browsing --save`.

## Getting started
First, you must require the package:
```js
const SafeBrowsing = require('@auntodev/safe-browsing');
```

Now, you must provide your Google API credentials. Use the following to do this:
```js
SafeBrowsing.authorize(
    'api_key', // Your Google API key
    'client_id' // Optional. If not provided, 'unknown' is used.
);
```

Finally, you can make a request:
```js
// Async:
await SafeBrowsing.lookup('https://example.com');

// Then functions:
SafeBrowsing.lookup('https://example.com').then((result) => {
    /*
        {
            "url": "https://example.com",
            "type": "SAFE",
            "flagged": false
        }
    */
});
```

## Output
When something **isn't** flagged, something similar will be given:
```json
{
    "url": "https://example.com",
    "type": "SAFE",
    "flagged": false
}
```

When something **is** flagged, something similar will be given:
```json
{
    "url": "https://example.com",
    "type": "MALWARE",
    "flagged": false
}
```

## License and Disclaimers
```
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
```
```
Google works to provide the most accurate and up-to-date information about
unsafe web resources. However, Google cannot guarantee that its information is
comprehensive and error-free: some risky sites may not be identified, and some
safe sites may be identified in error.
```