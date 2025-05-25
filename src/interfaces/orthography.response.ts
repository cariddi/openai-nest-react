export interface OrthographyResponse {
	userScore: number;
	errors: string[];
	message: string;
}

export interface OrthographyResponseWithStatus {
	ok: boolean;
	userScore: number;
	errors: string[];
	message: string;
}
