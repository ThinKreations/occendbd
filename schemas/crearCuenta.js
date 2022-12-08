import * as yup from 'yup';

export const schemaCrearCuenta = yup.object().shape({
    correo: yup.string().email('Formato de correo no valido').required('Campo obligatorio'),
    password: yup.string().required('Campo obligatorio').min(10, 'Debe ser minimo de 10 caracteres'),
});