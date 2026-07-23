export interface AIService {
  generatePlan(): Promise<void>;
}

export const aiService: AIService = {
  async generatePlan() {
    // TODO: Gemini/OpenAI integration
  },
};