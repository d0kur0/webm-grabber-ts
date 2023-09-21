# @d0kur0/webm-finder
[![Npm package version](https://badgen.net/npm/v/webm-finder)](https://npmjs.com/package/webm-finder)

JS utility for searching media files on imageboards, at the moment there are two implemented vendors: 2ch and 4chan. You can make adapters for any other, maybe someday I'll add something else myself.

## Installation
if you use npm: 

```npm i webm-finder```

## Examples

```javascript
import { twoChannelFactory } from "webm-finder";

// Get all files from /b/
const twoChannel = twoChannelFactory(); // or use fourChannelFactory
const [firstThread] = await twoChannel.fetchThreads("b");
const files = await twoChannel.fetchFiles(firstThread);
console.log(files);

// Get files with only the required extensions
const twoChannel = twoChannelFactory({ requiredFileTypes: ["webm"] }); // or use fourChannelFactory
const [firstThread] = await twoChannel.fetchThreads("b");
const files = await twoChannel.fetchFiles(firstThread);
console.log(files);

// Get all video files from multiply boards + vendors
const requiredFileTypes = ["webm", "mp4"];
const twoChannel = twoChannelFactory({ requiredFileTypes });
const fourChannel = fourChannelFactory({ requiredFileTypes });

const findScheme = [
  {
    vendor: twoChannel,
     boards: ["media"],
  },
  {
    vendor: fourChannel,
    boards: ["b"],
  },
];

const files = [];

for (const { vendor, boards } of findScheme) {
  const threads = [];

  for (const board of boards) threads.push(...(await vendor.fetchThreads(board)));
  for (const thread of threads) files.push(...(await vendor.fetchFiles(thread)));
}

console.log(files);
```

### Browser context and CORS

#### Way 1: UrlOverrider

To bypass the CORS and use the library in the browser, you will need to make a proxy server, for this each vendor has a urlOverrider parameter, an example of its use:
```javascript
const urlOverrider: UrlOverrider = url => `https://proxy.example/${url}`;
const twoChannel = twoChannelFactory({ urlOverrider });
const [firstThread] = await twoChannel.fetchThreads("b");
const files = await twoChannel.fetchFiles(firstThread);
console.log(files);
```

#### Way 2: create simple node.js server

Take any framework/library for create HTTP server and make enpoint for server parsed files
