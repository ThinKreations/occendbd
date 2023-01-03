export const agregarClienteReq = async (cliente) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/cliente/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "x-token": token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
        
    })
    console.log(cliente)
    const resJSON = await res.json();
    if (res.status !== 200) {
        let arrayErrors = resJSON.errors;
        arrayErrors.forEach(e => {
            swal({
                title: 'Error',
                text: e.msg,
                icon: 'error',
                button: 'Ok',
            })
        });
    } else {
        swal({
            title: 'Finalizado',
            text: resJSON.msg,
            icon: 'success',
            button: 'Ok',
            timer: '3000'
        });
    }
    return { resJSON, res }
}

export const traerEtiquetas = async () => {
    const res = await fetch(`http://localhost:8080/cliente/buscar/etiquetas`)
    const etiquetas = await res.json();
    return etiquetas;
}

export const deleteCliente = async () => {
    const res = await fetch(`http://localhost:8080/cliente/delete/:id`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            "x-token": token,
            'Content-Type': 'application/json'
        } 
    })
    console.log(res)
}

export const traerCliente=async (id_cliente)=>{
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:8080/cliente/${id_cliente}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    })
    const cliente = await res.json();
    return cliente;
}
