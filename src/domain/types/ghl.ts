export interface GHLWebhookPayload {
  email: string;
  phone: string;
  message: string;
  businessType: string;
  branchCount: number;
  location: string;
  productInterestIds: string[];
  productInterestNames: string[];
}

export interface GHLWebhookResponse {
  success: boolean;
  message?: string;
}
