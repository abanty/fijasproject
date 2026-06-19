import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const flagsDir = path.join(__dirname, '../public/images/flags')
const nonIsoDir = path.join(flagsDir, '_non-iso')
const duplicatesDir = path.join(nonIsoDir, 'duplicates')

/** Nombre de archivo Figma (sin .svg) → ISO 3166-1 alpha-2 */
const nameToIso = {
  afghanistan: 'af',
  albania: 'al',
  algeria: 'dz',
  american_samoa: 'as',
  andorra: 'ad',
  angola: 'ao',
  anguilla: 'ai',
  antarctica: 'aq',
  antigua_barbuda: 'ag',
  argentina: 'ar',
  armenia: 'am',
  aruba: 'aw',
  australia: 'au',
  austria: 'at',
  azerbaijan: 'az',
  bahamas: 'bs',
  bahrain: 'bh',
  bangladesh: 'bd',
  barbados: 'bb',
  belarus: 'by',
  belgium: 'be',
  belize: 'bz',
  benin: 'bj',
  bermuda: 'bm',
  bhutan: 'bt',
  bolivia: 'bo',
  bosnia_herzegovina: 'ba',
  botswana: 'bw',
  brazil: 'br',
  britain: 'gb',
  british_indian_ocean_territory: 'io',
  british_virgin_islands: 'vg',
  brunei: 'bn',
  bulgaria: 'bg',
  burkina_faso: 'bf',
  burma_myanmar: 'mm',
  burundi: 'bi',
  cambodia: 'kh',
  cameroon: 'cm',
  canada: 'ca',
  cape_verde: 'cv',
  cayman_islands: 'ky',
  central_african_republic: 'cf',
  chad: 'td',
  chile: 'cl',
  china: 'cn',
  christmas_island: 'cx',
  colombia: 'co',
  comoros: 'km',
  congo_brazzaville: 'cg',
  cook_islands: 'ck',
  costa_rica: 'cr',
  cote_d_ivoire: 'ci',
  croatia: 'hr',
  cuba: 'cu',
  cyprus: 'cy',
  czec_republic: 'cz',
  denmark: 'dk',
  dijibouti: 'dj',
  dominica: 'dm',
  dominican_republic: 'do',
  east_timor: 'tl',
  ecuador: 'ec',
  egypt: 'eg',
  el_salvador: 'sv',
  equatorial_guinea: 'gq',
  eritrea: 'er',
  estonia: 'ee',
  ethiopia: 'et',
  falkland_islands: 'fk',
  faroes: 'fo',
  fiji: 'fj',
  finland: 'fi',
  france: 'fr',
  french_polynesia: 'pf',
  french_southern_antarctic_lands: 'tf',
  gabon: 'ga',
  gambia: 'gm',
  georgia: 'ge',
  germany: 'de',
  ghana: 'gh',
  gibraltar: 'gi',
  greece: 'gr',
  greenland: 'gl',
  grenada: 'gd',
  guam: 'gu',
  guatemala: 'gt',
  guernsey: 'gg',
  guinea: 'gn',
  guinea_bissau: 'gw',
  guyana: 'gy',
  haiti: 'ht',
  holy_see: 'va',
  honduras: 'hn',
  hong_kong: 'hk',
  hungary: 'hu',
  iceland: 'is',
  india: 'in',
  indonesia: 'id',
  iran: 'ir',
  iraq: 'iq',
  ireland: 'ie',
  isle_of_man: 'im',
  italy: 'it',
  jamaica: 'jm',
  japan: 'jp',
  jersey: 'je',
  jordan: 'jo',
  kazakhstan: 'kz',
  kenya: 'ke',
  kiribati: 'ki',
  kuwait: 'kw',
  kyrgyzstan: 'kg',
  laos: 'la',
  latvia: 'lv',
  lebanon: 'lb',
  lesotho: 'ls',
  liberia: 'lr',
  liechtenstein: 'li',
  lithuania: 'lt',
  luxembourg: 'lu',
  macao: 'mo',
  macedonia: 'mk',
  madagascar: 'mg',
  malawi: 'mw',
  malaysia: 'my',
  maldives: 'mv',
  mali: 'ml',
  malta: 'mt',
  marshall_islands: 'mh',
  mauritania: 'mr',
  mauritius: 'mu',
  mexico: 'mx',
  micronesia: 'fm',
  moldova: 'md',
  monaco: 'mc',
  mongolia: 'mn',
  montenegro: 'me',
  montserrat: 'ms',
  morocco: 'ma',
  mozambique: 'mz',
  myanmar: 'mm',
  namibia: 'na',
  nauru: 'nr',
  nepal: 'np',
  netherlands: 'nl',
  netherlands_antilles: 'an',
  new_caledonia: 'nc',
  new_zealand: 'nz',
  nicaragua: 'ni',
  niger: 'ne',
  nigeria: 'ng',
  niue: 'nu',
  norfolk_island: 'nf',
  north_korea: 'kp',
  northern_marianas: 'mp',
  norway: 'no',
  oman: 'om',
  pakistan: 'pk',
  palau: 'pw',
  palestine: 'ps',
  panama: 'pa',
  papua_new_guinea: 'pg',
  paraguay: 'py',
  peru: 'pe',
  phillipines: 'ph',
  pitcairn_islands: 'pn',
  poland: 'pl',
  portugal: 'pt',
  puerto_rico: 'pr',
  qatar: 'qa',
  reunion: 're',
  romania: 'ro',
  russian_federation: 'ru',
  rwanda: 'rw',
  samoa: 'ws',
  san_marino: 'sm',
  sao_tome_principe: 'st',
  saudi_arabia: 'sa',
  senegal: 'sn',
  serbia: 'rs',
  seychelles: 'sc',
  sierra_leone: 'sl',
  singapore: 'sg',
  slovakia: 'sk',
  slovenia: 'si',
  solomon_islands: 'sb',
  somalia: 'so',
  south_africa: 'za',
  south_georgia_south_sandwich_islands: 'gs',
  south_korea: 'kr',
  spain: 'es',
  sri_lanka: 'lk',
  st_helena: 'sh',
  st_kitts_nevis: 'kn',
  st_lucia: 'lc',
  st_vincent_grenadines: 'vc',
  sudan: 'sd',
  suriname: 'sr',
  swaziland: 'sz',
  sweden: 'se',
  switzerland: 'ch',
  syria: 'sy',
  taiwan: 'tw',
  tajikstan: 'tj',
  tanzania: 'tz',
  thailand: 'th',
  timor_leste: 'tl',
  togo: 'tg',
  tokelau: 'tk',
  tonga: 'to',
  trinidad_tobago: 'tt',
  tunisia: 'tn',
  turkey: 'tr',
  turkmenistan: 'tm',
  turks_caicos_islands: 'tc',
  uganda: 'ug',
  ukraine: 'ua',
  united_arab_emirates: 'ae',
  united_states: 'us',
  uruguay: 'uy',
  uzbekistan: 'uz',
  vanuatu: 'vu',
  venezuela: 've',
  vietnam: 'vn',
  virgin_islands: 'vi',
  western_sahara: 'eh',
  western_samoa: 'ws',
  yemen: 'ye',
  zaire: 'cd',
  zambia: 'zm',
  zimbabwe: 'zw',
  british_antarctic_territory: 'aq'
}

const nonIsoNames = new Set([
  'alderny',
  'arab_league',
  'asean',
  'northern_cyprus',
  'northern_ireland',
  'scotland',
  'wales',
  'sami',
  'seborga',
  'somaliland',
  'tibet',
  'yugoslavia',
  'tristan_de_cunha',
  'sark'
])

const duplicatePreference = {
  mm: 'myanmar',
  tl: 'timor_leste',
  ws: 'samoa',
  aq: 'antarctica',
  sh: 'st_helena'
}

const ensureDir = async dir => {
  await fs.mkdir(dir, { recursive: true })
}

const run = async () => {
  await ensureDir(nonIsoDir)
  await ensureDir(duplicatesDir)

  const entries = await fs.readdir(flagsDir)
  const svgFiles = entries.filter(name => name.toLowerCase().endsWith('.svg'))

  const isoTargets = new Map()
  const report = { renamed: [], nonIso: [], duplicates: [], unknown: [] }

  for (const file of svgFiles) {
    const base = file.replace(/\.svg$/i, '')
    const key = base.toLowerCase()

    if (nonIsoNames.has(key)) {
      const dest = path.join(nonIsoDir, file)
      await fs.rename(path.join(flagsDir, file), dest)
      report.nonIso.push(file)
      continue
    }

    const iso = nameToIso[key]

    if (!iso) {
      const dest = path.join(nonIsoDir, file)
      await fs.rename(path.join(flagsDir, file), dest)
      report.unknown.push(file)
      continue
    }

    if (!isoTargets.has(iso)) {
      isoTargets.set(iso, [])
    }

    isoTargets.get(iso).push({ file, key })
  }

  for (const [iso, items] of isoTargets.entries()) {
    const preferredKey = duplicatePreference[iso]
    const sorted = [...items].sort((a, b) => {
      if (preferredKey) {
        if (a.key === preferredKey) return -1
        if (b.key === preferredKey) return 1
      }

      return a.key.localeCompare(b.key)
    })

    const [winner, ...rest] = sorted
    const tempPath = path.join(flagsDir, `__tmp__${iso}.svg`)
    const finalPath = path.join(flagsDir, `${iso}.svg`)

    await fs.rename(path.join(flagsDir, winner.file), tempPath)
    report.renamed.push(`${winner.file} → ${iso}.svg`)

    for (const dup of rest) {
      const dupDest = path.join(duplicatesDir, dup.file)
      await fs.rename(path.join(flagsDir, dup.file), dupDest)
      report.duplicates.push(`${dup.file} → _non-iso/duplicates/${dup.file}`)
    }

    await fs.rename(tempPath, finalPath)
  }

  console.log(JSON.stringify(report, null, 2))
  console.log(`\nISO flags: ${report.renamed.length}`)
  console.log(`Non-ISO / regiones: ${report.nonIso.length}`)
  console.log(`Sin mapeo: ${report.unknown.length}`)
  console.log(`Duplicados ISO: ${report.duplicates.length}`)
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})
