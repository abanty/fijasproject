import Authentication from '@views/authentication'

import { getServerMode } from '@core/utils/serverHelpers'

export const metadata = {
  title: 'Crear cuenta',
  description: 'Registrate en Pasame La Fija'
}

const RegisterPage = async () => {
  const mode = await getServerMode()

  return <Authentication mode={mode} view='sign-up' />
}

export default RegisterPage
