import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";

export type SagePromptData = {
  prompt: string;
  has_default?: boolean;
};

export const getSagePrompt = () => clientApi.get<{ data: SagePromptData }>(ENDPOINTS.sageAi.prompt);

export const updateSagePrompt = (prompt: string) =>
  clientApi.put<{ data: SagePromptData }>(ENDPOINTS.sageAi.prompt, { prompt });

export const resetSagePrompt = () =>
  clientApi.post<{ data: SagePromptData }>(ENDPOINTS.sageAi.resetPrompt, {});
