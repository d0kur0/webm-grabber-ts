import { Files, Threads, VendorImplementation } from "../types";

const twoChannelFactory: VendorImplementation = () => {
	return {
		async fetchThreads(boardName: string) {
			return [] as Threads;
		},

		async fetchFiles(boardName: string, threadId: number) {
			return [] as Files;
		},
	};
};

export const twoChannel = twoChannelFactory();
