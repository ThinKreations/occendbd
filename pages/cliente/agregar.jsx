import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Header from '../../components/Header'
import MainHead from '../../components/MainHead'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js'
import {buscarCoincidencia, validarToken} from '../api/request'
import Router, { useRouter } from 'next/router'
import { schemaAgregarCliente } from '../../schemas/agregarCliente'
import { agregarClienteReq } from '../api/clientes-https'

export default function AddCliente(){
    
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
        <MainHead tituloPestana="Agregar"/>
        <div className={styles.container}>
            
            <Header/>
            
            <center>

            <h1 className={styles.title}>Agregar Cliente</h1>
            
            </center><br/>
            
            <div className={styles.cont}>

                <center>

                
                <form>
                <input className={styles.input} placeholder="Nombre(s)" />
                <button type='submit' className={styles.guardar}> Subir </button>
                <Link href="/cliente/"><button className={styles.redBtn}>Cancelar</button></Link>
                </form>
                

                

                <br/><br/><br/><br/><br/><br/>

                </center>
                
            </div>
            
        </div>
    </>
    )
}
/*

                <form onSubmit={(console.log('Empecemos de nuevo'))} className={styles.clienteAgregar}>
                   
                        <p>Nombre</p>
                        <input className={styles.input} placeholder="Nombre(s)" ></input>
                        
                        <input className={styles.input} placeholder="Paterno" ></input>
                        
                        <input className={styles.input} placeholder="Materno"></input>
                        <p>Datos de Contacto</p>
                        <input className={styles.input} placeholder="Empresa"></input>
                        <input className={styles.input} placeholder="Dirección"></input>
                        <input className={styles.input} placeholder="Ciudad" ></input>
                        <input className={styles.input} placeholder="C.P." ></input>
                        <input className={styles.input} placeholder="RFC" ></input>
                        <input className={styles.input} placeholder="Email" ></input>
                        <input className={styles.input} placeholder="Teléfono"></input>
                        <input className={styles.input} placeholder="Cel."></input>
                        <p className={styles.errors}></p><br></br>
                    <button className={styles.guardar} type='submit'>Guardar</button>
                    
                </form>

*/