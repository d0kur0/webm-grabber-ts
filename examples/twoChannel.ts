import { twoChannel } from "../src/vendors/twoChannel";

const threads = await twoChannel.fetchThreads("b");
console.log(threads);
