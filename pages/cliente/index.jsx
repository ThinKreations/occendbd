import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Header from '../../components/Header'
import MainHead from '../../components/MainHead'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import {validarToken} from '../api/request'
import { getUsuario } from '../api/user-https';


export default function Index({user, clientes, etiquetas, coincidencia=''}){
    const router = useRouter()


    const [userR, setUserR] = useState(user);
    const [clientesR, setClientesR] = useState(clientes);
    const [termino, setTermino] = useState(router.query.coincidencia);

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
   
      const delAll = async ()=>{
        
          const res = await fetch(`http://localhost:8080/cliente/delete/cliente`,{
              method: 'DELETE',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json'
              },
              
            }
          )
          
          const resJSON = await res.json()
          Router.reload()
      }
     
    
      const cerrarSesion = async () => {

        swal({
            title: 'Sesión Cerrada.',
            text:
              'Sesión: '+localStorage.getItem('correo'),
            icon: 'info',
            button: 'Ok',
            timer: '3000'
          })

        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('correo')
        Router.push('/')
      }
    
      const buscarCoincidencias = async () => {
        if (termino === undefined || termino === '' || termino === ' ') {
          const res = await fetch(
            `http://localhost:8080/cliente`
          )
          const clientes = await res.json()
          setClientesR(clientes)
          
        } else {
          const res = await fetch(
            `http://localhost:8080/cliente/encontrar/coincidencia/`,
            {
              method: 'PUT',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                termino: termino
              })
            }
          )
          const resJSON = await res.json()
          setClientesR(resJSON)
          console.log(resJSON)
        }
      }

  
      
    
      useEffect(() => {
        
        sessionControl()
        buscarCoincidencias()
       
        
      }, [])

    return(
        <>
        <MainHead tituloPestana='Inicio'/>
        <div className={styles.container}>

            
            <Header/>
            
            <center>
            <form onSubmit={buscarCoincidencias} className={styles.buscarForm}>
            <input className={styles.barraBusqueda} placeholder="Nombre, empresa, correo, etc."
             onChange={(event, termino) => setTermino(termino)}
             onKeyPress={c => setTermino(c.target.value)}
            ></input>
            <button className={styles.btnBuscar} type="submit"><font face="Work Sans">BUSCAR</font></button>
            
            </form>
            </center>
            
                <button className={styles.addCliente} onClick={()=>Router.push('./cliente/agregar')}>Agregar Cliente</button>
                <button className={styles.btnHistorial} onClick={()=>Router.push('./historial')}>Historial</button>
                <button className={styles.btnCerrar} onClick={cerrarSesion}>Cerrar Sesión</button>
                <button className={styles.btnCerrar} onClick={delAll}>Borrar Todo</button>
                
                <p></p>
                
            <div className={styles.cont}>
                
                <div className={styles.tablaCont}>

                    <div className={styles.headTabla}>
                        Nombre, Empresa, Email, Tel.
                    </div>
                    
                    <div className={styles.clienteC}>                
                            
                        {clientesR.clientes.map(c=>{
                              
                              const borrar = async () =>{
                                const res = await fetch(`http://localhost:8080/cliente/delete/cliente/${c._id}`,{
                                    method: 'DELETE',
                                    mode: 'cors',
                                    headers: {
                                      'Content-Type': 'application/json'
                                    },
                                    
                                  }
                                )
                                Router.reload()
                                
                              }
                              /*
                              const traer = async () =>{
                                localStorage.setItem('clienteSelec', c._id)
                                Router.push(`/cliente/${c._id}`)
                              }*/

                              return(
                                <div key={c._id}>
                                <div  className={styles.datoCliente}>
                                
                                <b>{c.nombres} {c.paterno} {c.materno}, {c.razonSocial}, {c.email}, {c.telefono} | {c._id}</b>
                                
                                </div>
                                <button className={styles.btnEditarC}>Editar</button><button className={styles.btnBorrarC} onClick={borrar}>Borrar</button>
                                </div>
                              )
                            
                                
                          })
                            }
                            
                            
                            
                    </div>
                    
                    
                    
                    
                </div>


            </div>
        </div>

        </>
        
    )
}

export async function getServerSideProps ({}) {
    const res = await fetch(`http://localhost:8080/cliente/`)
        
    const clientes = await res.json()
           
    return {
      props: { clientes, notFound: false }
    }
  }
  