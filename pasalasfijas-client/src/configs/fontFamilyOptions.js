export const fontFamilyCatalog = [
  { id: 'inter', label: 'Inter', stack: 'var(--font-inter), Inter, sans-serif' },
  { id: 'public-sans', label: 'Public Sans', stack: 'var(--font-public-sans), "Public Sans", sans-serif' },
  { id: 'roboto', label: 'Roboto', stack: 'var(--font-roboto), Roboto, sans-serif' },
  { id: 'open-sans', label: 'Open Sans', stack: 'var(--font-open-sans), "Open Sans", sans-serif' },
  { id: 'montserrat', label: 'Montserrat', stack: 'var(--font-montserrat), Montserrat, sans-serif' },
  { id: 'nunito-sans', label: 'Nunito Sans', stack: 'var(--font-nunito-sans), "Nunito Sans", sans-serif' }
]

export const defaultFontFamilyId = 'roboto'

const defaultFontFamilyOption =
  fontFamilyCatalog.find(item => item.id === defaultFontFamilyId) ?? fontFamilyCatalog[0]

export const getFontFamilyOption = id =>
  fontFamilyCatalog.find(item => item.id === id) || defaultFontFamilyOption

export const getFontFamilyStack = id => getFontFamilyOption(id).stack
