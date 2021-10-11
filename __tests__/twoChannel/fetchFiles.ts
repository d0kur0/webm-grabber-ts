import { twoChannelFactory } from "../../src";
import mockAxios from "jest-mock-axios";
import { File } from "../../src/types";

const fakeResponse = {
	threads: [
		{
			posts: [
				{
					files: [
						{
							fullname: "full name of jpg file",
							path: "/test-path.jpg",
							thumbnail: "/test-thumbnail.jpg",
						},
					],
				},
				{
					files: [
						{
							fullname: "full name of webm file",
							path: "/test-path.webm",
							thumbnail: "/test-thumbnail.jpg",
						},
					],
				},
			],
		},
	],
};

const expectedJPGFile: File = {
	url: "https://2ch.hk/test-path.jpg",
	name: "full name of jpg file",
	previewUrl: "https://2ch.hk/test-thumbnail.jpg",
};

const expectedWEBMFile: File = {
	url: "https://2ch.hk/test-path.webm",
	name: "full name of webm file",
	previewUrl: "https://2ch.hk/test-thumbnail.jpg",
};

afterEach(() => {
	mockAxios.reset();
});

it("Check fetching files", async () => {
	mockAxios.get.mockResolvedValueOnce({ data: fakeResponse });

	const twoChannel = twoChannelFactory();
	const fakeThread = { board: "b", id: 1, url: "", subject: "" };
	const files = await twoChannel.fetchFiles(fakeThread);

	expect(mockAxios.get).toHaveBeenCalledWith("https://2ch.hk/b/res/1.json");
	expect(files).toContainEqual<File>(expectedJPGFile);
	expect(files).toContainEqual<File>(expectedWEBMFile);
});

it("Check fetching files with requiredFileTypes", async () => {
	mockAxios.get.mockResolvedValueOnce({ data: fakeResponse });

	const twoChannel = twoChannelFactory({ requiredFileTypes: ["webm"] });
	const fakeThread = { board: "b", id: 1, url: "", subject: "" };
	const files = await twoChannel.fetchFiles(fakeThread);

	expect(files).toContainEqual<File>(expectedWEBMFile);
	expect(files).not.toContainEqual<File>(expectedJPGFile);
});
