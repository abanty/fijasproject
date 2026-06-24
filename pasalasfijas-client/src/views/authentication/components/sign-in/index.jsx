'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'

import themeConfig from '@configs/themeConfig'

import { useImageVariant } from '@core/hooks/useImageVariant'

import SignInForm from './SignInForm'

const AUTH_V1_MASK = {
  dark: '/images/pages/auth-v1-mask-dark.png',
  light: '/images/pages/auth-v1-mask-light.png'
}

const SignIn = ({ mode }) => {
  const authBackground = useImageVariant(mode, AUTH_V1_MASK.light, AUTH_V1_MASK.dark)

  return (
    <div className='flex flex-col justify-center items-center min-block-[100dvh] relative p-6'>
      <Card className='auth-card flex flex-col sm:inline-[450px]'>
        <CardContent className='p-6 sm:p-12!'>
          <Link href={themeConfig.homePageUrl} className='flex justify-center items-center mbe-8'>
            <Logo size='lg' />
          </Link>
          <div className='flex flex-col gap-5'>
            <div className='text-center'>
              <Typography variant='h4'>Bienvenido de nuevo</Typography>
              <Typography className='mbs-1' color='text.secondary'>
                Inicia sesión para continuar
              </Typography>
            </div>
            <SignInForm />
          </div>
        </CardContent>
      </Card>
      <Illustrations maskImg={{ src: authBackground }} />
    </div>
  )
}

export default SignIn
