import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Header from '../../components/Header'
import MainHead from '../../components/MainHead'
import Router from 'next/router'
import Link from 'next/link'
import {validarToken} from '../api/request'

export default function List(){

const sessionControl = async () => {
    const valid = await validarToken();
    if (valid === false) {
        swal({
        title: 'Inicia sesion.',
        text: 'Tu sesion expiro, vuelve a iniciar sesion para realizar esta operacion.',
        icon: 'info',
        button: 'Ok',
        timer: '3000'
        });
        Router.push('/session/IniciarSesion');
    }
    }

    
    return(
        <>
        <MainHead tituloPestana="Menú Principal"/>
        <div className={styles.container}>

            <MainHead tituloPestana="Menú Principal"/>
            <Header/>
            
            <center>
            <form className={styles.buscarForm}>
            <input className={styles.barraBusqueda} placeholder="Nombre, empresa, correo, etc."></input>
            <button className={styles.btnBuscar}><font face="Work Sans">BUSCAR</font></button>
            </form>
            </center>
            
                <button className={styles.addCliente} onClick={()=>Router.push('./cliente/agregar')}>Agregar Cliente</button>
                <button className={styles.btnHistorial} onClick={()=>Router.push('./cliente/historial')}>Historial</button>
                <button className={styles.btnCerrar} onClick={()=>Router.push('/')}>Cerrar Sesión</button>
                
            <div className={styles.cont}>
                
                <div className={styles.tablaCont}>

                    <div className={styles.headTabla}>
                        Nombre, Empresa, Email, Tel.
                    </div>
                    
                    <div className={styles.clienteC}>                
                            <Link href='./cliente' className={styles.links}>
                                <div className={styles.datoCliente}>
                                `Nombre(s)`
                                `Paterno`
                                `Materno`<b>, </b> 
                                `Empresa`<b>, </b>
                                
                                `Correo`<b>, </b>
                                `Teléfono`
                                </div>
                            </Link>
                    </div>
                    
                    
                    
                    
                </div>


            </div>
        </div>
        </>
        
    )
}