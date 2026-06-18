const teamCountryCodes = {
  argentina: 'AR',
  mexico: 'MX',
  brasil: 'BR',
  brazil: 'BR',
  'estados unidos': 'US',
  usa: 'US',
  francia: 'FR',
  france: 'FR',
  japon: 'JP',
  japan: 'JP',
  espana: 'ES',
  spain: 'ES',
  marruecos: 'MA',
  morocco: 'MA',
  portugal: 'PT',
  uruguay: 'UY',
  inglaterra: 'GB',
  england: 'GB',
  senegal: 'SN',
  italia: 'IT',
  italy: 'IT',
  chile: 'CL'
}

export const normalizeTeamName = name =>
  String(name ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

export const getCountryCodeByTeamName = teamName => {
  const key = normalizeTeamName(teamName)

  return teamCountryCodes[key] ?? null
}

export default teamCountryCodes
