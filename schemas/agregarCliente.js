import * as yup from 'yup';

export const schemaAgregarCliente = yup.object().shape({
    nombres: yup.string().required('Nombre requerido.'),
    email: yup.string().email('Formato de correo no valido.').required('Correo requerido.'),
});