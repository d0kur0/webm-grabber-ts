"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twoChannel_1 = require("../../src/vendors/twoChannel");
const jest_mock_axios_1 = __importDefault(require("jest-mock-axios"));
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
const expectedJPGFile = {
    url: "https://2ch.hk/test-path.jpg",
    name: "full name of jpg file",
    previewUrl: "https://2ch.hk/test-thumbnail.jpg",
};
const expectedWEBMFile = {
    url: "https://2ch.hk/test-path.webm",
    name: "full name of webm file",
    previewUrl: "https://2ch.hk/test-thumbnail.jpg",
};
afterEach(() => {
    jest_mock_axios_1.default.reset();
});
it("Check fetching files", async () => {
    jest_mock_axios_1.default.get.mockResolvedValueOnce({ data: fakeResponse });
    const twoChannel = (0, twoChannel_1.twoChannelFactory)();
    const fakeThread = { board: "b", id: 1, url: "", subject: "" };
    const files = await twoChannel.fetchFiles(fakeThread);
    expect(jest_mock_axios_1.default.get).toHaveBeenCalledWith("https://2ch.hk/b/res/1.json");
    expect(files).toContainEqual(expectedJPGFile);
    expect(files).toContainEqual(expectedWEBMFile);
});
it("Check fetching files with requiredFileTypes", async () => {
    jest_mock_axios_1.default.get.mockResolvedValueOnce({ data: fakeResponse });
    const twoChannel = (0, twoChannel_1.twoChannelFactory)({ requiredFileTypes: ["webm"] });
    const fakeThread = { board: "b", id: 1, url: "", subject: "" };
    const files = await twoChannel.fetchFiles(fakeThread);
    expect(files).toContainEqual(expectedWEBMFile);
    expect(files).not.toContainEqual(expectedJPGFile);
});
