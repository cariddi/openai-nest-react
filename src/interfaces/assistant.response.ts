export interface AssistantResponseItem {
	role: 'user' | 'assistant';
	content: string[];
}

export interface AssistantResponse {
	item: AssistantResponseItem[];
}

export interface AssistantResponseWithStatus extends AssistantResponse {
	ok: boolean;
}
