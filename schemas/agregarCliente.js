import * as yup from 'yup';

export const schemaAgregarCliente = yup.object().shape({
    nombres: yup.string().required('Campo obligatorio'),
    correo: yup.string().email('Formato de correo no valido').required('Campo obligatorio'),
});