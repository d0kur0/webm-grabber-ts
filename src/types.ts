export type Thread = {
	id: number;
	url: string;
	board: string;
	subject?: string;
};

export type Threads = Thread[];

export type File = {
	url: string;
	name: string;
	date: number;
	rootThread: Thread;
	previewUrl: string;
};

export type Files = File[];

export type UrlOverrider = (url: string) => string;

export type VendorMethods = {
	fetchFiles(thread: Thread): Promise<Files>;
	fetchThreads(boardName: string): Promise<Threads>;
};

export type VendorProps = {
	urlOverrider?: UrlOverrider;
	requiredFileTypes?: string[];
};

export type VendorImplementation = (props?: VendorProps) => VendorMethods;
