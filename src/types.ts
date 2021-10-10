export type Thread = {
	id: number;
	subject: string;
	url: string;
};

export type Threads = Thread[];

export type File = {
	name: string;
	url: string;
	previewUrl: string;
};

export type Files = File[];

export type VendorMethods = {
	fetchThreads(boardName: string): Promise<Threads>;
	fetchFiles(boardName: string, threadId: number): Promise<Files>;
};

export type VendorImplementation = () => VendorMethods;
