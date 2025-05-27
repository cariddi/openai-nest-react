export interface TranslateResponse {
	message: string;
}

export interface TranslateResponseWithStatus extends TranslateResponse {
	ok: boolean;
}
