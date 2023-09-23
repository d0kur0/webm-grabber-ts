import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();
import fetchMock from "jest-fetch-mock";

import { twoChannelFactory } from "../../src";
import { Thread, UrlOverrider } from "../../src";

const fakeResponse = {
	threads: [{ subject: "subject 1", num: "1" }],
};

beforeEach(() => {
	fetchMock.mockResponse(JSON.stringify(fakeResponse));
});

afterEach(() => {
	fetchMock.mockReset();
});

it("Check fetching threads", async () => {
	const expectedThreadResult = {
		id: 1,
		url: "https://2ch.hk/b/res/1.html",
		board: "b",
		subject: "subject 1",
	};

	const notExpectedThreadResult = {
		id: 3,
		url: "https://2ch.hk/b/res/3.html",
		board: "b",
		subject: "subject 3",
	};

	const twoChannel = twoChannelFactory();
	const result = await twoChannel.fetchThreads("b");

	expect(fetchMock.mock.calls[0][0]).toEqual("https://2ch.hk/b/threads.json");
	expect(result).toContainEqual<Thread>(expectedThreadResult);
	expect(result).not.toContainEqual<Thread>(notExpectedThreadResult);
});

it("Check fetching threads with urlOverrider", async () => {
	const urlOverrider: UrlOverrider = url => `https://proxy.example/${url}`;
	const twoChannel = twoChannelFactory({ urlOverrider });
	await twoChannel.fetchThreads("b");

	expect(fetchMock.mock.calls[0][0]).toEqual(
		"https://proxy.example/https://2ch.hk/b/threads.json"
	);
});
