/** Ruta pública de banderas exportadas desde Figma: public/images/flags/{code}.svg */
export const getCustomCountryFlagSrc = code => {
  const normalized = String(code ?? '')
    .trim()
    .toLowerCase()

  if (!/^[a-z]{2}$/.test(normalized)) return null

  return `/images/flags/${normalized}.svg`
}
