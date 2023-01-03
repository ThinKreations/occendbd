import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Header from '../../components/Header'
import MainHead from '../../components/MainHead'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {validarToken} from '../api/request'

import { Router } from 'next/router'

export default function Cliente({ cliente }){
    const [idn, setIdn] = useState('')
    
    const sessionControl = async () => {
        const valid = await validarToken()
        if (valid === false) {
          swal({
            title: 'Inicia sesion.',
            text:
              'Debes iniciar sesión para acceder.',
            icon: 'info',
            button: 'Ok',
            timer: '3000'
          })
          Router.push('/')
        }
      }
    
      
    
      useEffect(() => {
          sessionControl()
          
        }, [])
     

    return(
    
    <>
        <MainHead tituloPestana='Aquí vamos de nuevo'/>
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

                  
                    
                </form>

                </div>
                <br/><br/><br/><br/><br/><br/>
                


                </center>
                
            </div>
            
        </div>
    </>
    )
}

export async function getServerSideProps ({ params }) {

    const res = await fetch(`http://localhost:8080/cliente/${params.cliente}`)
    
    

    const clientes = await res.json()
    console.log(res)
    console.log(params)

    return {
      props: { cliente: clientes, notFound: false }
    }
  }
  