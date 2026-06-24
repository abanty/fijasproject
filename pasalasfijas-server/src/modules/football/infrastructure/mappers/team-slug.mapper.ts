export const slugifyTeamName = (name: string): string =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const buildTeamPairKey = (homeName: string, awayName: string): string =>
  [slugifyTeamName(homeName), slugifyTeamName(awayName)].sort().join('-')
