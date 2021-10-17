import { File, Thread, VendorImplementation } from "../types";
import { defaultUrlOverrider } from "../utils/defaultUrlOverrider";

type ThreadsResponse = [
	{
		threads: [{ no: string }];
	}
];

type ThreadResponse = {
	posts: [
		{
			ext: string;
			filename: string;
			tim: number;
		}
	];
};

export const fourChannelFactory: VendorImplementation = props => {
	const urlOverrider = props?.urlOverrider || defaultUrlOverrider;

	return {
		async fetchThreads(boardName: string) {
			try {
				const requestUrl = urlOverrider(`https://a.4cdn.org/${boardName}/threads.json`);
				const response: ThreadsResponse = await fetch(requestUrl).then(r => r.json());
				const flatThreads = response.map(({ threads }) => threads).flat();

				return flatThreads.map(
					(rawThread): Thread => ({
						id: +rawThread.no,
						url: `https://boards.4channel.org/${boardName}/thread/${rawThread.no}`,
						board: boardName,
						subject: "undefined value",
					})
				);
			} catch (error) {
				console.warn(`fourChannel::fetchThreads error`);
				console.error(error);
				return [];
			}
		},

		async fetchFiles(thread: Thread) {
			try {
				const requestUrl = urlOverrider(
					`https://a.4cdn.org/${thread.board}/res/${thread.id}.json`
				);

				console.log(requestUrl);

				const response: ThreadResponse = await fetch(requestUrl).then(r => r.json());

				const files = response.posts
					.filter(post => post.filename)
					.map(
						(rawPost): File => ({
							url: `https://i.4cdn.org/${thread.board}/${rawPost.tim}${rawPost.ext}`,
							name: rawPost.filename,
							previewUrl: `https://i.4cdn.org/${thread.board}/${rawPost.tim}s.jpg`,
						})
					);

				if (!props?.requiredFileTypes) return files;

				return files.filter(({ url }) => {
					const fileType = url.split(".").pop();
					return props.requiredFileTypes?.includes(fileType || "");
				});
			} catch (error) {
				console.warn(`fourChannel::fetchFiles error`);
				console.error(error);
				return [];
			}
		},
	};
};
