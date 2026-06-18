export const MAX_INLINE_HELP_LENGTH = 50

export const shouldUseHelpTooltip = text => {
  if (!text) return false

  return String(text).trim().length > MAX_INLINE_HELP_LENGTH
}
