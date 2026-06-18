import { Inter, Public_Sans, Roboto, Open_Sans, Montserrat, Nunito_Sans } from 'next/font/google'

export const interFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter'
})

export const publicSansFont = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-public-sans'
})

export const robotoFont = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
  variable: '--font-roboto'
})

export const openSansFont = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-open-sans'
})

export const montserratFont = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat'
})

export const nunitoSansFont = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
  variable: '--font-nunito-sans'
})

export const fontFamilyVariableClassNames = [
  interFont.variable,
  publicSansFont.variable,
  robotoFont.variable,
  openSansFont.variable,
  montserratFont.variable,
  nunitoSansFont.variable
].join(' ')
