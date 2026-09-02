export const DEFAULT_NOTIFICATION_EMAILS = [
  "fhassey@alimentosconvenientes.com.mx",
  "oluna@alimentosconvenientes.com.mx",
];

export function resolveNotificationEmails(envValue) {
  if (typeof envValue === "string" && envValue.trim().length > 0) {
    return envValue
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);
  }

  return [...DEFAULT_NOTIFICATION_EMAILS];
}
