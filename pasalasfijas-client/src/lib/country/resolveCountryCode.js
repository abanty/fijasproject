import { getCountryCodeByTeamName } from '@/lib/country/teamCountryCodes'

export const resolveCountryCode = (teamName, explicitCode) => {
  if (explicitCode) {
    return String(explicitCode).trim().toUpperCase()
  }

  return getCountryCodeByTeamName(teamName)
}
