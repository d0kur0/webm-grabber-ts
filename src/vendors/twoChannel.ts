import { File, Thread, VendorImplementation } from "../types";
import { defaultUrlOverrider } from "../utils/defaultUrlOverrider";
import axios from "axios";

type ThreadsResponse = {
	threads: {
		subject: string;
		num: string;
	}[];
};

type ThreadResponse = {
	threads: {
		posts: { files: [{ fullname: string; path: string; thumbnail: string }] }[];
	}[];
};

export const twoChannelFactory: VendorImplementation = props => {
	const urlOverrider = props?.urlOverrider || defaultUrlOverrider;

	return {
		async fetchThreads(boardName: string) {
			try {
				const requestUrl = urlOverrider(`https://2ch.hk/${boardName}/threads.json`);
				const response = await axios
					.get<ThreadsResponse>(requestUrl)
					.then(({ data }) => data);

				return response.threads.map(
					(rawThread): Thread => ({
						id: +rawThread.num,
						subject: rawThread.subject,
						url: `https://2ch.hk/${boardName}/res/${rawThread.num}`,
						board: boardName,
					})
				);
			} catch (error) {
				console.warn(`twoChannel::fetchThreads error`);
				console.error(error);
				return [];
			}
		},

		async fetchFiles(thread: Thread) {
			try {
				const requestUrl = urlOverrider(
					`https://2ch.hk/${thread.board}/res/${thread.id}.json`
				);

				const response = await axios
					.get<ThreadResponse>(requestUrl)
					.then(({ data }) => data);

				const rawFiles = response.threads?.[0].posts.map(({ files }) => files).flat();

				const files = rawFiles.map<File>(rawFile => ({
					name: rawFile.fullname,
					url: `https://2ch.hk${rawFile.path}`,
					previewUrl: `https://2ch.hk${rawFile.thumbnail}`,
				}));

				if (!props?.requiredFileTypes) return files;

				return files.filter(({ url }) => {
					const fileType = url.split(".").pop();
					return props.requiredFileTypes?.includes(fileType || "");
				});
			} catch (error) {
				console.warn(`twoChannel::fetchFiles error`);
				console.error(error);
				return [];
			}
		},
	};
};
