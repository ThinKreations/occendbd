import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Header from '../../components/Header'
import MainHead from '../../components/MainHead'
import Link from 'next/link'


export default function Cliente(){
    
    return(
    
    <>
        <MainHead tituloPestana="Agregar"/>
        <div className={styles.container}>

            
            <Header/>
            
            
            <center>

                
                <h1 className={styles.title}>`Nombre completo`</h1></center><br/>
            
            <div className={styles.cont}>
                <center>

                <div>
                <form>
                    <div className={styles.clienteAgregar}>
                        {/*
                        
                        HOOKS para cambiar a campos de texto, y cambiar la pantalla
                        
                        */}
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

                    <Link href="/cliente"><button className={styles.redBtn}>Cancelar</button></Link>

                    <button className={styles.guardar}>Editar</button>

                    <button className={styles.redBtn}>Eliminar</button>
                    
                </form>

                </div>
                <br/><br/><br/><br/><br/><br/>
                


                </center>
                
            </div>
            
        </div>
    </>
    )
}