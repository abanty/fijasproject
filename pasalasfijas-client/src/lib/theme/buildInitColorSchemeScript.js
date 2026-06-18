import themeConfig from '@configs/themeConfig'

export const getModeStorageKey = () =>
  `${themeConfig.templateName.toLowerCase().split(' ').join('-')}-mui-template-mode`

export const buildInitColorSchemeScript = (defaultMode = 'system') => {
  const modeStorageKey = getModeStorageKey()
  const colorSchemeStorageKey = 'mui-color-scheme'
  const defaultLightColorScheme = 'light'
  const defaultDarkColorScheme = 'dark'
  const colorSchemeNode = 'document.documentElement'
  const attribute = 'data-%s'

  const setter = `
    ${colorSchemeNode}.removeAttribute('${attribute}'.replace('%s', light));
    ${colorSchemeNode}.removeAttribute('${attribute}'.replace('%s', dark));
    ${colorSchemeNode}.setAttribute('${attribute}'.replace('%s', colorScheme), "");
  `

  return `(function(){try{let colorScheme='';const mode=localStorage.getItem('${modeStorageKey}')||'${defaultMode}';const dark=localStorage.getItem('${colorSchemeStorageKey}-dark')||'${defaultDarkColorScheme}';const light=localStorage.getItem('${colorSchemeStorageKey}-light')||'${defaultLightColorScheme}';if(mode==='system'){const mql=window.matchMedia('(prefers-color-scheme: dark)');if(mql.matches){colorScheme=dark}else{colorScheme=light}}if(mode==='light'){colorScheme=light}if(mode==='dark'){colorScheme=dark}if(colorScheme){${setter}}}catch(e){}})();`
}
