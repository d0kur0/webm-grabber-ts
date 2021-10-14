import { fourChannelFactory } from "../../src";
import mockAxios from "jest-mock-axios";
import { Thread, UrlOverrider } from "../../src/types";

afterEach(() => {
	mockAxios.reset();
});

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

it("Check fetching threads", async () => {
	mockAxios.get.mockResolvedValueOnce({ data: fakeResponse });

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

	expect(mockAxios.get).toHaveBeenCalledWith("https://a.4cdn.org/b/threads.json");
	expect(result).toContainEqual<Thread>(expectedThreadResult);
	expect(result).not.toContainEqual<Thread>(notExpectedThreadResult);
});

it("Check fetching threads with urlOverrider", async () => {
	mockAxios.get.mockResolvedValueOnce({ data: fakeResponse });

	const urlOverrider: UrlOverrider = url => `https://proxy.example/${url}`;
	const fourChannel = fourChannelFactory({ urlOverrider });
	await fourChannel.fetchThreads("b");

	expect(mockAxios.get).toHaveBeenCalledWith(
		"https://proxy.example/https://a.4cdn.org/b/threads.json"
	);
});
