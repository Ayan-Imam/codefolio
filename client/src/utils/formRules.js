// Validation rule for optional URL fields (empty values are skipped by React Hook Form)
export const URL_RULE = {
  value: /^https?:\/\/\S+$/i,
  message: 'Must start with http:// or https://',
}