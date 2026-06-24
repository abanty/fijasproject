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
  chile: 'CL',
  algeria: 'DZ',
  australia: 'AU',
  austria: 'AT',
  belgium: 'BE',
  'bosnia & herzegovina': 'BA',
  canada: 'CA',
  'cape verde': 'CV',
  colombia: 'CO',
  croatia: 'HR',
  curacao: 'CW',
  'czech republic': 'CZ',
  'dr congo': 'CD',
  ecuador: 'EC',
  egypt: 'EG',
  germany: 'DE',
  ghana: 'GH',
  haiti: 'HT',
  iran: 'IR',
  iraq: 'IQ',
  'ivory coast': 'CI',
  jordan: 'JO',
  netherlands: 'NL',
  'new zealand': 'NZ',
  norway: 'NO',
  panama: 'PA',
  paraguay: 'PY',
  qatar: 'QA',
  'saudi arabia': 'SA',
  scotland: 'GB',
  'south africa': 'ZA',
  'south korea': 'KR',
  sweden: 'SE',
  switzerland: 'CH',
  tunisia: 'TN',
  turkey: 'TR',
  uzbekistan: 'UZ'
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
