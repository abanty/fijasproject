'use client'

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

import Link from '@components/Link'

import { useSignIn } from '../../hooks/useSignIn'

const SignInForm = () => {
  const { isPasswordShown, handleClickShowPassword, handleSubmit } = useSignIn()

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
      <TextField autoFocus fullWidth size='medium' label='Email' />
      <TextField
        fullWidth
        size='medium'
        label='Password'
        type={isPasswordShown ? 'text' : 'password'}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  size='small'
                  edge='end'
                  onClick={handleClickShowPassword}
                  onMouseDown={e => e.preventDefault()}
                >
                  <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                </IconButton>
              </InputAdornment>
            )
          }
        }}
      />
      <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
        <FormControlLabel control={<Checkbox />} label='Recordarme' />
        <Typography className='text-end' color='primary.main' component={Link}>
          Olvidaste tu contrasena?
        </Typography>
      </div>
      <Button fullWidth variant='contained' type='submit' size='medium'>
        Ingresar
      </Button>
      <div className='flex justify-center items-center flex-wrap gap-2'>
        <Typography>Nuevo en las fijas?</Typography>
        <Typography
          component={Link}
          href='/register'
          color='primary.main'
          className='animate__animated animate__pulse animate__repeat-3 animate__slow'
          sx={{
            fontWeight: 700,
            textDecoration: 'underline',
            textUnderlineOffset: 3,
            textDecorationThickness: 'from-font',
            '&:hover': { opacity: 0.85 }
          }}
        >
          Crear cuenta YA!
        </Typography>
      </div>
      <Divider className='gap-3'>o</Divider>
      <div className='flex justify-center items-center gap-2'>
        <IconButton size='small' className='text-facebook'>
          <i className='ri-facebook-fill' />
        </IconButton>
        <IconButton size='small' className='text-twitter'>
          <i className='ri-twitter-fill' />
        </IconButton>
        <IconButton size='small' className='text-github'>
          <i className='ri-github-fill' />
        </IconButton>
        <IconButton size='small' className='text-googlePlus'>
          <i className='ri-google-fill' />
        </IconButton>
      </div>
    </form>
  )
}

export default SignInForm
