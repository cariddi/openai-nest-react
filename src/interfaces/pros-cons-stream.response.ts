export interface ProsConsStreamResponse {
	role: string;
	content: string;
	refusal: null;
	annotations: any[];
}

export interface ProsConsStreamResponseWithStatus
	extends ProsConsStreamResponse {
	ok: boolean;
}
