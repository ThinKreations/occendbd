import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Header from '../../components/Header'
import MainHead from '../../components/MainHead'
import { useRouter } from 'next/router'
import Link from 'next/link'
export default function List(){

        const router = useRouter()

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
            
                <button className={styles.addCliente} onClick={()=>router.push('agregar')}>Agregar Cliente</button>
                <button className={styles.btnHistorial} onClick={()=>router.push('/')}>Historial</button>
                <button className={styles.btnCerrar} onClick={()=>router.push('/')}>Cerrar Sesión</button>
                
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