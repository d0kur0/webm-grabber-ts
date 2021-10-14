import mockAxios from "jest-mock-axios";
import { fourChannelFactory } from "../../src";
import { File } from "../../src/types";

afterEach(() => {
	mockAxios.reset();
});

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

const expectedJPGFile: File = {
	url: `https://i.4cdn.org/b/1.jpg`,
	name: "jpg file",
	previewUrl: `https://i.4cdn.org/b/1s.jpg`,
};

const expectedWEBMFile: File = {
	url: `https://i.4cdn.org/b/2.webm`,
	name: "webm file",
	previewUrl: `https://i.4cdn.org/b/2s.jpg`,
};

it("Check fetching files", async () => {
	mockAxios.get.mockResolvedValueOnce({ data: fakeResponse });

	const fourChannel = fourChannelFactory();
	const fakeThread = { board: "b", id: 1, url: "", subject: "" };
	const files = await fourChannel.fetchFiles(fakeThread);

	expect(mockAxios.get).toHaveBeenCalledWith(`https://a.4cdn.org/b/res/1.json`);
	expect(files).toContainEqual<File>(expectedJPGFile);
	expect(files).toContainEqual<File>(expectedWEBMFile);
});

it("Check fetching files with requiredFileTypes", async () => {
	mockAxios.get.mockResolvedValueOnce({ data: fakeResponse });

	const fourChannel = fourChannelFactory({ requiredFileTypes: ["webm"] });
	const fakeThread = { board: "b", id: 1, url: "", subject: "" };
	const files = await fourChannel.fetchFiles(fakeThread);

	expect(files).toContainEqual<File>(expectedWEBMFile);
	expect(files).not.toContainEqual<File>(expectedJPGFile);
});
