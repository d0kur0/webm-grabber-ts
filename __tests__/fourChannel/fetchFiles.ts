import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();
import fetchMock from "jest-fetch-mock";

import { fourChannelFactory } from "../../src";
import { File } from "../../src";
import { Thread } from "../../src";

const fakeResponse = {
	posts: [
		{
			filename: "jpg file",
			ext: ".jpg",
			tim: "1",
		},
		{
			filename: "webm file",
			ext: ".webm",
			tim: "2",
		},
	],
};

const fakeThread: Thread = { board: "b", id: 1, url: "", subject: "" };

beforeEach(() => {
	fetchMock.mockResponse(JSON.stringify(fakeResponse));
});

const expectedJPGFile: File = {
	url: `https://i.4cdn.org/b/1.jpg`,
	name: "jpg file",
	rootThread: fakeThread,
	previewUrl: `https://i.4cdn.org/b/1s.jpg`,
};

const expectedWEBMFile: File = {
	url: `https://i.4cdn.org/b/2.webm`,
	name: "webm file",
	rootThread: fakeThread,
	previewUrl: `https://i.4cdn.org/b/2s.jpg`,
};

it("Check fetching files", async () => {
	const fourChannel = fourChannelFactory();
	const files = await fourChannel.fetchFiles(fakeThread);

	expect(fetchMock.mock.calls[0][0]).toEqual(`https://a.4cdn.org/b/res/1.json`);
	expect(files).toContainEqual<File>(expectedJPGFile);
	expect(files).toContainEqual<File>(expectedWEBMFile);
});

it("Check fetching files with requiredFileTypes", async () => {
	const fourChannel = fourChannelFactory({ requiredFileTypes: ["webm"] });
	const files = await fourChannel.fetchFiles(fakeThread);

	expect(files).toContainEqual<File>(expectedWEBMFile);
	expect(files).not.toContainEqual<File>(expectedJPGFile);
});
