export interface GHLWebhookPayload {
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  businessType: string;
  branchCount: number;
  state: string;
  locality: string;
  categories: string[];
  message: string;
}

export interface GHLWebhookResponse {
  success: boolean;
  message?: string;
}
