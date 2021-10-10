"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twoChannel_1 = require("../../src/vendors/twoChannel");
const jest_mock_axios_1 = __importDefault(require("jest-mock-axios"));
const fakeResponse = {
    threads: [{ subject: "subject 1", num: "1" }],
};
afterEach(() => {
    jest_mock_axios_1.default.reset();
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
    jest_mock_axios_1.default.get.mockResolvedValueOnce({ data: fakeResponse });
    const twoChannel = (0, twoChannel_1.twoChannelFactory)();
    const result = await twoChannel.fetchThreads("b");
    expect(jest_mock_axios_1.default.get).toHaveBeenCalledWith("https://2ch.hk/b/threads.json");
    expect(result).toContainEqual(expectedThreadResult);
    expect(result).not.toContainEqual(notExpectedThreadResult);
});
it("Check fetching threads with urlOverrider", async () => {
    jest_mock_axios_1.default.get.mockResolvedValueOnce({ data: fakeResponse });
    const urlOverrider = url => `https://proxy.example/${url}`;
    const twoChannel = (0, twoChannel_1.twoChannelFactory)({ urlOverrider });
    await twoChannel.fetchThreads("b");
    expect(jest_mock_axios_1.default.get).toHaveBeenCalledWith("https://proxy.example/https://2ch.hk/b/threads.json");
});
