import * as yup from 'yup';

export default function () {
  const baseSchema = yup.string().required('Campo requerido');

  const emailSchema = baseSchema.email('Correo electrónico inválido');

  const passwordSchema = baseSchema.min(
    8,
    'La contraseña debe tener al menos 8 caracteres',
  );
  /*.matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
  );*/

  const nameSchema = baseSchema.min(
    2,
    'El nombre debe tener al menos 2 caracteres',
  );

  const ageSchema = yup
    .number()
    .required('Campo requerido')
    .positive('La edad debe ser un número positivo');

  const phoneSchema = baseSchema.matches(
    /^\d{10}$/,
    'El número de teléfono debe tener 10 dígitos',
  );
  return {
    baseSchema,
    emailSchema,
    passwordSchema,
    nameSchema,
    ageSchema,
    phoneSchema,
  };
}
