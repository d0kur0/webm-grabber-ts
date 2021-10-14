# WebmFinder
JS utility for searching media files on imageboards, at the moment there are two implemented vendors: 2ch and 4chan. You can make adapters for any other, maybe someday I'll add something else myself.

## Installation
if you use npm: 

```npm i webm-finder```

if you use yarn:

```yarn add webm-finder```

## Examples

```javascript
import { twoChannelFactory } from "webm-finder";

// Get all files from /b/
const twoChannel = twoChannelFactory(); // or use fourChannelFactory
const [board] = await twoChannel.fetchThreads("b");
const files = await twoChannel.fetchFiles(board);
console.log(files);

// Get files with only the required extensions
const twoChannel = twoChannelFactory({ requiredFileTypes: ["webm"] }); // or use fourChannelFactory
const [board] = await twoChannel.fetchThreads("b");
const files = await twoChannel.fetchFiles(board);
console.log(files);

// Get all video files from miltiply boards + vendors
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

To bypass the CORS and use the library in the browser, you will need to make a proxy server, for this each vendor has a urlOverrider parameter, an example of its use:
```javascript
const urlOverrider: UrlOverrider = url => `https://proxy.example/${url}`;
const twoChannel = twoChannelFactory({ urlOverrider });
const [board] = await twoChannel.fetchThreads("b");
const files = await twoChannel.fetchFiles(board);
console.log(files);
```