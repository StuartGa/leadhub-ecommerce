export interface GHLWebhookPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  productInterest?: string;
}

export interface GHLWebhookResponse {
  success: boolean;
  message?: string;
}
