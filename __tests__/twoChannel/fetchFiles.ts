import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();
import fetchMock from "jest-fetch-mock";

import { twoChannelFactory } from "../../src";
import { File } from "../../src";
import { Thread } from "../../src";

const fakeResponse = {
	threads: [
		{
			posts: [
				{
					date: "11/01/22 Втр 15:30:53",
					files: [
						{
							fullname: "full name of jpg file",
							path: "/test-path.jpg",
							thumbnail: "/test-thumbnail.jpg",
							width: 10,
							height: 10,
							tn_width: 10,
							tn_height: 10,
						},
					],
				},
				{
					date: "11/01/22 Втр 15:30:53",
					files: [
						{
							fullname: "full name of webm file",
							path: "/test-path.webm",
							thumbnail: "/test-thumbnail.jpg",
							width: 10,
							height: 10,
							tn_width: 10,
							tn_height: 10,
						},
					],
				},
			],
		},
	],
};

const fakeThread: Thread = { board: "b", id: 1, url: "", subject: "" };

beforeEach(() => {
	fetchMock.mockResponse(JSON.stringify(fakeResponse));
});

const expectedJPGFile: File = {
	url: "https://2ch.hk/test-path.jpg",
	name: "full name of jpg file",
	rootThread: fakeThread,
	previewUrl: "https://2ch.hk/test-thumbnail.jpg",
	date: 1641904253,
	width: 10,
	height: 10,
	tnWidth: 10,
	tnHeight: 10,
};

const expectedWEBMFile: File = {
	url: "https://2ch.hk/test-path.webm",
	name: "full name of webm file",
	rootThread: fakeThread,
	previewUrl: "https://2ch.hk/test-thumbnail.jpg",
	date: 1641904253,
	width: 10,
	height: 10,
	tnWidth: 10,
	tnHeight: 10,
};

it("Check fetching files", async () => {
	const twoChannel = twoChannelFactory();
	const files = await twoChannel.fetchFiles(fakeThread);

	expect(fetchMock.mock.calls[0][0]).toEqual("https://2ch.hk/b/res/1.json");
	expect(files).toContainEqual<File>(expectedJPGFile);
	expect(files).toContainEqual<File>(expectedWEBMFile);
});

it("Check fetching files with requiredFileTypes", async () => {
	const twoChannel = twoChannelFactory({ requiredFileTypes: ["webm"] });
	const files = await twoChannel.fetchFiles(fakeThread);

	expect(files).toContainEqual<File>(expectedWEBMFile);
	expect(files).not.toContainEqual<File>(expectedJPGFile);
});
