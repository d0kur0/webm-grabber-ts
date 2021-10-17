import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();
import fetchMock from "jest-fetch-mock";

import { fourChannelFactory } from "../../src";
import { Thread, UrlOverrider } from "../../src/types";

const fakeResponse = [
	{
		page: 1,
		threads: [
			{
				no: 1,
			},
			{
				no: 2,
			},
		],
	},
];

beforeEach(() => {
	fetchMock.mockResponse(JSON.stringify(fakeResponse));
});

it("Check fetching threads", async () => {
	const expectedThreadResult = {
		id: 1,
		url: "https://boards.4channel.org/b/thread/1",
		board: "b",
		subject: "undefined value",
	};

	const notExpectedThreadResult = {
		id: 3,
		url: "https://boards.4channel.org/b/thread/2",
		board: "b",
		subject: "undefined value",
	};

	const fourChannel = fourChannelFactory();
	const result = await fourChannel.fetchThreads("b");

	expect(fetchMock.mock.calls[0][0]).toEqual("https://a.4cdn.org/b/threads.json");
	expect(result).toContainEqual<Thread>(expectedThreadResult);
	expect(result).not.toContainEqual<Thread>(notExpectedThreadResult);
});

it("Check fetching threads with urlOverrider", async () => {
	const urlOverrider: UrlOverrider = url => `https://proxy.example/${url}`;
	const fourChannel = fourChannelFactory({ urlOverrider });
	await fourChannel.fetchThreads("b");

	expect(fetchMock.mock.calls[0][0]).toEqual(
		"https://proxy.example/https://a.4cdn.org/b/threads.json"
	);
});
