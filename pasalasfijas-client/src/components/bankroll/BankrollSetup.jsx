'use client'

import { useState } from 'react'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { createBankroll } from '@/services/bankrollService'

const BankrollSetup = ({ onCreated }) => {
  const [amount, setAmount] = useState('1000')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    setError('')

    const initialAmount = Number(amount)
    if (!initialAmount || initialAmount < 1) {
      setError('Ingresa un monto valido mayor a 0.')
      return
    }

    setLoading(true)
    try {
      const bankroll = await createBankroll({ initialAmount, currency: 'USD' })
      onCreated(bankroll)
    } catch {
      setError('No pudimos crear tu banca. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className='flex flex-col gap-4 max-is-[420px]'>
        <Typography variant='h6'>Configura tu banca</Typography>
        <Typography variant='body2' color='text.secondary'>
          Monto de referencia para seguimiento interno. La app no procesa apuestas reales.
        </Typography>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <TextField
            label='Banca inicial (USD)'
            type='number'
            value={amount}
            onChange={event => setAmount(event.target.value)}
            slotProps={{
              input: { min: 1, step: '0.01' }
            }}
            fullWidth
          />
          {error ? (
            <Typography variant='body2' color='error'>
              {error}
            </Typography>
          ) : null}
          <Button type='submit' variant='contained' disabled={loading}>
            {loading ? 'Guardando...' : 'Crear banca'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default BankrollSetup
