import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class RegisterDto {
  @IsEmail({}, { message: 'Ingresa un correo válido' })
  email!: string

  @IsString({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password!: string

  @IsOptional()
  @IsString({ message: 'El nombre no es válido' })
  name?: string
}
