export const AI_PREDICTION_PROVIDER = 'AI_PREDICTION_PROVIDER'

export type AiPredictionInput = Record<string, unknown>
export type AiPredictionResult = Record<string, unknown>

export interface AiPredictionProvider {
  generatePrediction(input: AiPredictionInput): Promise<AiPredictionResult>
}
