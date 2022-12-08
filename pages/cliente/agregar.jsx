import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Header from '../../components/Header'
import MainHead from '../../components/MainHead'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { agregarCliente } from '../api/clientes-https'
import {validarToken} from '../api/request'
import Router, { useRouter } from 'next/router'

export default function AddCliente(){
    
    const [nombre, setNombre] = useState()
    const [pat, setPat] = useState()
    const [mat, setMat] = useState()
    const [rS, setRS] = useState()
    const [direc, setDirec] = useState()
    const [city, setCity] = useState()
    const [pc, setPc] = useState()
    const [rfc, setRfc] = useState()
    const [correo, setCorreo] = useState()
    const [tel, setTel] = useState()
    const [cel, setCel] = useState()

    const agregarCli = async () => {
    const id = localStorage.getItem('id')
    let object = new Object({
        
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
    const { res } = await agregarCliente(object)
        if (res.status !== 200) {
            swal({
                title: 'Error',
                icon: 'error',
            })
        }
      }

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

                
                <h1 className={styles.title}>Agregar Cliente</h1></center><br/>
            
            <div className={styles.cont}>
                <center>

                <div>
                <form onSubmit={agregarCli} className={styles.clienteAgregar}>
                   
                        <p>Nombre</p>
                        <input required className={styles.input} placeholder="Nombre(s)" onChange={c => setNombre(c.target.value)}></input>
                        <input required className={styles.input} placeholder="Paterno" onChange={c => setPat(c.target.value)}></input>
                        <input className={styles.input} placeholder="Materno" onChange={c => setMat(c.target.value)}></input>
                        <p>Datos de Contacto</p>
                        <input className={styles.input} placeholder="Empresa" onChange={c => setRS(c.target.value)}></input>
                        <input className={styles.input} placeholder="Dirección" onChange={c => setDirec(c.target.value)}></input>
                        <input className={styles.input} placeholder="Ciudad" onChange={c => setCity(c.target.value)}></input>
                        <input className={styles.input} placeholder="C.P." onChange={c => setPc(c.target.value)}></input>
                        <input className={styles.input} placeholder="RFC" onChange={c => setRfc(c.target.value)}></input>
                        <input className={styles.input} placeholder="Email" onChange={c => setCorreo(c.target.value)}></input>
                        <input className={styles.input} placeholder="Teléfono" onChange={c => setTel(c.target.value)}></input>
                        <input className={styles.input} placeholder="Cel." onChange={c => setCel(c.target.value)}></input>
                    
                    <button className={styles.guardar} type='submit'>Guardar</button>
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