// Validation rule for optional URL fields (empty values are skipped by React Hook Form)
export const URL_RULE = {
  value: /^https?:\/\/\S+$/i,
  message: 'Must start with http:// or https://',
}

// True only for http(s) links. Used before rendering a user-supplied URL as a link
// or image, so values like "javascript:..." are never put in an href.
export const isHttpUrl = (url) => URL_RULE.value.test(url || '')