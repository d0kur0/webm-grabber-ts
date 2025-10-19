import { File, Thread, VendorImplementation } from "../types";
import { defaultUrlOverrider } from "../utils/defaultUrlOverrider";
import { parse } from "date-fns";

type ThreadsResponse = {
	threads: {
		subject: string;
		num: string;
	}[];
};

type ThreadResponse = {
	threads: {
		posts: {
			date: string;
			files: [
				{
					path: string;
					width: number;
					height: number;
					fullname: string;
					tn_width: number;
					tn_height: number;
					thumbnail: string;
				}
			];
		}[];
	}[];
};

export const twoChannelFactory: VendorImplementation = props => {
	const urlOverrider = props?.urlOverrider || defaultUrlOverrider;

	return {
		async fetchThreads(boardName: string) {
			try {
				const requestUrl = urlOverrider(`https://2ch.su/${boardName}/threads.json`);
				const response: ThreadsResponse = await fetch(requestUrl).then(r => r.json());

				return response.threads.map(
					(rawThread): Thread => ({
						id: +rawThread.num,
						url: `https://2ch.su/${boardName}/res/${rawThread.num}.html`,
						board: boardName,
						subject: rawThread.subject,
					})
				);
			} catch (error) {
				return [];
			}
		},

		async fetchFiles(thread: Thread) {
			try {
				const requestUrl = urlOverrider(
					`https://2ch.su/${thread.board}/res/${thread.id}.json`
				);

				const response = await fetch(requestUrl);
				if (!response.ok) return [];

				const threadResponse: ThreadResponse = await response.json();
				const rawFiles = threadResponse.threads?.[0].posts
					.map(({ files, date }) => files?.map(file => ({ ...file, date })) || [])
					.flat();

				const files = rawFiles.map<File>(rawFile => ({
					url: `https://2ch.su${rawFile.path}`,
					name: rawFile.fullname,
					date:
						+parse(
							rawFile.date.replace(/\s(.+)\s/, " "),
							"dd/MM/yy HH:mm:ss",
							new Date()
						) / 1000,
					width: rawFile.width || 0,
					height: rawFile.height || 0,
					tnWidth: rawFile.tn_width,
					tnHeight: rawFile.tn_height,
					rootThread: thread,
					previewUrl: `https://2ch.su${rawFile.thumbnail}`,
				}));

				if (!props?.requiredFileTypes) return files;

				return files.filter(({ url }) => {
					const fileType = url.split(".").pop();
					return props.requiredFileTypes?.includes(fileType || "");
				});
			} catch (error) {
				return [];
			}
		},
	};
};
