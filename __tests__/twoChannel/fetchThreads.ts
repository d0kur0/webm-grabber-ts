import { twoChannelFactory } from "../../src";
import mockAxios from "jest-mock-axios";
import { Thread, UrlOverrider } from "../../src/types";

const fakeResponse = {
	threads: [{ subject: "subject 1", num: "1" }],
};

afterEach(() => {
	mockAxios.reset();
});

it("Check fetching threads", async () => {
	const expectedThreadResult = {
		id: 1,
		url: "https://2ch.hk/b/res/1.json",
		board: "b",
		subject: "subject 1",
	};
	const notExpectedThreadResult = {
		id: 3,
		url: "https://2ch.hk/b/res/3.json",
		board: "b",
		subject: "subject 3",
	};

	mockAxios.get.mockResolvedValueOnce({ data: fakeResponse });

	const twoChannel = twoChannelFactory();
	const result = await twoChannel.fetchThreads("b");

	expect(mockAxios.get).toHaveBeenCalledWith("https://2ch.hk/b/threads.json");
	expect(result).toContainEqual<Thread>(expectedThreadResult);
	expect(result).not.toContainEqual<Thread>(notExpectedThreadResult);
});

it("Check fetching threads with urlOverrider", async () => {
	mockAxios.get.mockResolvedValueOnce({ data: fakeResponse });

	const urlOverrider: UrlOverrider = url => `https://proxy.example/${url}`;
	const twoChannel = twoChannelFactory({ urlOverrider });

	await twoChannel.fetchThreads("b");

	expect(mockAxios.get).toHaveBeenCalledWith(
		"https://proxy.example/https://2ch.hk/b/threads.json"
	);
});
