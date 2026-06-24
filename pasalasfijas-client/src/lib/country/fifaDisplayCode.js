const fifaByIso2 = {
  AR: 'ARG',
  AU: 'AUS',
  AT: 'AUT',
  BE: 'BEL',
  BA: 'BIH',
  BR: 'BRA',
  CA: 'CAN',
  CV: 'CPV',
  CL: 'CHI',
  CO: 'COL',
  HR: 'CRO',
  CW: 'CUW',
  CZ: 'CZE',
  CD: 'COD',
  EC: 'ECU',
  EG: 'EGY',
  GB: 'ENG',
  FR: 'FRA',
  DE: 'GER',
  GH: 'GHA',
  HT: 'HAI',
  IR: 'IRN',
  IQ: 'IRQ',
  CI: 'CIV',
  JP: 'JPN',
  JO: 'JOR',
  MX: 'MEX',
  MA: 'MAR',
  NL: 'NED',
  NZ: 'NZL',
  NO: 'NOR',
  PA: 'PAN',
  PY: 'PAR',
  PT: 'POR',
  QA: 'QAT',
  SA: 'KSA',
  SN: 'SEN',
  ZA: 'RSA',
  KR: 'KOR',
  ES: 'ESP',
  SE: 'SWE',
  CH: 'SUI',
  TN: 'TUN',
  TR: 'TUR',
  US: 'USA',
  UY: 'URU',
  UZ: 'UZB',
  DZ: 'ALG'
}

export const getFifaDisplayCode = iso2Code => {
  if (!iso2Code) return null

  const normalized = String(iso2Code).trim().toUpperCase()

  return fifaByIso2[normalized] ?? normalized
}
