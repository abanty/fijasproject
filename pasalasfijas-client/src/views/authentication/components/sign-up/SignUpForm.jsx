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

import { useSignUp } from '../../hooks/useSignUp'

const SignUpForm = () => {
  const { isPasswordShown, handleClickShowPassword, handleSubmit } = useSignUp()

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
      <TextField autoFocus fullWidth size='medium' label='Nombre' />
      <TextField fullWidth size='medium' label='Email' />
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
      <FormControlLabel
        control={<Checkbox />}
        label={
          <>
            <span>Acepto la </span>
            <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
              politica de privacidad y terminos
            </Link>
          </>
        }
      />
      <Button fullWidth variant='contained' type='submit' size='medium'>
        Crear cuenta
      </Button>
      <div className='flex justify-center items-center flex-wrap gap-2'>
        <Typography>Ya tienes cuenta?</Typography>
        <Typography component={Link} href='/login' color='primary.main'>
          Inicia sesion
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

export default SignUpForm
