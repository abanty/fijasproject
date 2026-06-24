'use client'

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import { Controller } from 'react-hook-form'

import Link from '@components/Link'

import { useSignUp } from '../../hooks/useSignUp'

const SignUpForm = () => {
  const { control, errors, isPasswordShown, formError, loading, handleClickShowPassword, handleSubmit } = useSignUp()

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            autoFocus
            fullWidth
            size='medium'
            label='Nombre'
            disabled={loading}
            {...(errors.name && { error: true, helperText: errors.name.message })}
          />
        )}
      />
      <Controller
        name='email'
        control={control}
        rules={{
          required: 'El email es requerido',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Ingresa un email válido'
          }
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            size='medium'
            label='Email'
            type='email'
            disabled={loading}
            {...(errors.email && { error: true, helperText: errors.email.message })}
          />
        )}
      />
      <Controller
        name='password'
        control={control}
        rules={{
          required: 'La contraseña es requerida',
          minLength: {
            value: 8,
            message: 'La contraseña debe tener al menos 8 caracteres'
          }
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            size='medium'
            label='Contraseña'
            type={isPasswordShown ? 'text' : 'password'}
            disabled={loading}
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
            {...(errors.password && { error: true, helperText: errors.password.message })}
          />
        )}
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
      {formError ? (
        <Typography color='error' variant='body2'>
          {formError}
        </Typography>
      ) : null}
      <Button
        fullWidth
        variant='contained'
        type='submit'
        size='medium'
        disabled={loading}
        startIcon={loading ? <CircularProgress color='inherit' size={18} thickness={5} /> : null}
      >
        {loading ? 'Creando cuenta…' : 'Crear cuenta'}
      </Button>
      <div className='flex justify-center items-center flex-wrap gap-2'>
        <Typography>Ya tienes cuenta?</Typography>
        <Typography component={Link} href='/login' color='primary.main'>
          Inicia sesión
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
