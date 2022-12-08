import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Header from '../../components/Header'
import MainHead from '../../components/MainHead'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { agregarCliente } from '../api/clientes-https'
import {validarToken} from '../api/request'

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

    /**/
    const agregarCli = async () => {
        const id = localStorage.getItem('id')
    let object = new Object({
        etiquetas,
        nombres: nombre,
        paterno: pat,
        materno: mat,
        razonSocial: rS,
        direccion: direc,
        ciudad: city,
        cp: pc,
        rfc: rfc,
        email: correo,
        telefono: tel,
        movil: cel,
        usuario_creo: id
    })
    const { resJSON, res } = await agregarCliente(object)
        if (res.status === 200) {
          Router.back()
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
                    <Link href="/cliente/"><button className={styles.redBtn}>Cancelar</button></Link>
                </form>

                </div>
                <br/><br/><br/><br/><br/><br/>
                


                </center>
                
            </div>
            
        </div>
    </>
    )
}