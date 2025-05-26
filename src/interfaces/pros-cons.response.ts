export interface ProsConsResponse {
	role: string;
	content: string;
	refusal: null;
	annotations: any[];
}

export interface ProsConsResponseWithStatus extends ProsConsResponse {
	ok: boolean;
}
