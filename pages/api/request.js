import swal from 'sweetalert';

export const validarToken = async () => {

    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:8080/login/token/${token}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    });
    const resJSON = await res.json();
    if (res.status !== 200) {
        await atraparErrores(res, resJSON);
        return false;
    }
    return resJSON;

}

const atraparErrores = async (res, resJSON) => {
    if (res.status !== 200) {
        if (!resJSON.errors) {
            swal({
                title: 'Inicie sesion.',
                text: resJSON.msg,
                icon: 'error',
                button: 'Ok',
                timer: '3000'
            });
        } else {
            let arrayErrors = await resJSON.errors;
            arrayErrors.forEach(e => {
                swal({
                    title: 'Error',
                    text: e.msg,
                    icon: 'error',
                    button: 'Ok',
                })
            });
        }
    } else {
        swal({
            title: 'Finalizado.',
            text: resJSON.msg,
            icon: 'success',
            button: 'Ok',
            timer: '3000'
        });
    }
}

export const buscarCoincidencia = async (termino) => {

    const res = await fetch(`http://localhost:8080/cliente/encontrar/coincidencia/`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            termino
        })
    });
    /* Respuesta procesada en formato json */
    const resJSON = await res.json();

}


/*Cuenta*/

export const traerUsuario=async (id_user)=>{
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:8080/user/${id_user}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    })
    const usuario = await res.json();
    return usuario;
}
