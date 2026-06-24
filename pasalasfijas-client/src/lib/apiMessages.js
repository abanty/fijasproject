const KNOWN_MESSAGES = {
  'Invalid credentials': 'Correo o contraseña incorrectos',
  'Email already registered': 'Este correo ya está registrado',
  'User could not be loaded after registration': 'No pudimos crear tu cuenta. Intenta de nuevo.',
  'User not found': 'No encontramos tu cuenta',
  'Unauthorized': 'Tu sesión expiró. Vuelve a iniciar sesión.'
}

export const toUserFacingMessage = (message, status) => {
  const raw = typeof message === 'string' ? message.trim() : ''

  if (raw && KNOWN_MESSAGES[raw]) return KNOWN_MESSAGES[raw]

  if (raw) return raw

  if (status === 401) return 'Correo o contraseña incorrectos'
  if (status === 409) return 'Este correo ya está registrado'
  if (status === 404) return 'No encontramos lo que buscas'
  if (status >= 500) return 'Algo salió mal. Intenta de nuevo en unos segundos.'

  return 'Ocurrió un error. Intenta de nuevo.'
}
