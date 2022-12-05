import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Header from '../../components/Header'
import MainHead from '../../components/MainHead'
import Link from 'next/link'

export default function AddCliente(){
    
    return(
    
    <>
        <MainHead tituloPestana="Agregar"/>
        <div className={styles.container}>

            
            <Header/>
            
            
            <center>

                
                <h1 className={styles.title}>Agregar Cliente</h1></center><br/>
            
            <div className={styles.cont}>
                <center>

                <div>
                <form>
                    <div className={styles.clienteAgregar}>
                        <p>Nombre</p>
                        <input className={styles.input} placeholder="Nombre(s)"></input>
                        <input className={styles.input} placeholder="Paterno"></input>
                        <input className={styles.input} placeholder="Materno"></input>
                        <p>Datos de Contacto</p>
                        <input className={styles.input} placeholder="Empresa"></input>
                        <input className={styles.input} placeholder="Dirección"></input>
                        <input className={styles.input} placeholder="Ciudad"></input>
                        <input className={styles.input} placeholder="C.P."></input>
                        <input className={styles.input} placeholder="RFC"></input>
                        <input className={styles.input} placeholder="Email"></input>
                        <input className={styles.input} placeholder="Teléfono"></input>
                        <input className={styles.input} placeholder="Cel."></input>
                    </div>
                    <button className={styles.guardar}>Guardar</button>
                    <Link href="list"><button className={styles.redBtn}>Cancelar</button></Link>
                </form>

                </div>
                <br/><br/><br/><br/><br/><br/>
                


                </center>
                
            </div>
            
        </div>
    </>
    )
}