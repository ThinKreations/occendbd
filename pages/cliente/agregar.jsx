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
import { agregarClienteReq, traerEtiquetas } from '../api/clientes-https'

export default function AddCliente(){
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaAgregarCliente)
  })


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

  const onSubmit = async data => {    
    
    const res = await fetch(`http://localhost:8080/cliente`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombres: data.nombres,
        paterno: data.paterno, 
        materno: data.materno,
        razonSocial: data.razonSocial,
        direccion: data.direccion,
        ciudad: data.ciudad,
        cp: data.cp,
        rfc: data.rfc,
        email: data.email,
        telefono: data.telefono,
        movil: data.movil,
        
        
      })
    })
    const resJSON = await res.json()
    console.log(resJSON)
    if (res.status !== 200) {
      try {
        let arrayErrors = resJSON.errors;
        arrayErrors.forEach(e => {
          swal({
            title: 'Error al agregar cliente',
            text: e.msg,
            icon: 'error',
            button: 'Ok'
          })
        })
      } catch (error) {
        swal({
          title: 'Algo salio mal...',
          text: resJSON.msg,
          icon: 'error',
          button: 'Ok'
        })
        console.log(error)
        console.log(data.email)
      }
    } else {
      if (res.status === 200) {
        
        swal({
          title:'Cliente agregado exitosamente',
          text: resJSON.msj,
          icon: 'success',
          button: 'Ok'
        })
        console.log(data.email)
        console.log(cliente._id)
      }
      
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

                <form onSubmit={handleSubmit(onSubmit)} className={styles.clienteAgregar}>
                   
                        <input required className={styles.input} placeholder="Nombre(s)" {...register('nombres')}></input>
                        
                        <input className={styles.input} placeholder="Paterno" {...register('paterno')}></input>
                        
                        <input className={styles.input} placeholder="Materno" {...register('materno')}></input>
                        <p></p>
                        <input className={styles.input} placeholder="Empresa" {...register('empresa')}></input>
                        <input className={styles.input} placeholder="Dirección" {...register('direccion')}></input>
                        <input className={styles.input} placeholder="Ciudad" {...register('ciudad')}></input>
                        <input className={styles.input} placeholder="C.P." {...register('cp')}></input>
                        <input className={styles.input} placeholder="RFC" {...register('rfc')}></input>
                        <input required className={styles.input} placeholder="Email" {...register('email')}></input>
                        <input className={styles.input} placeholder="Teléfono" {...register('telefono')}></input>
                        <input className={styles.input} placeholder="Cel." {...register('movil')}></input>
                        <p className={styles.errors}>{errors.nombres?.message} {errors.email?.message}</p><br></br>
                    <button className={styles.guardar} type='submit'>Guardar</button>
                    <Link href='../cliente'><button className={styles.cancelar}>Cancelar</button></Link>
                </form>
                

                

                <br/><br/><br/><br/><br/><br/>

                </center>
                
            </div>
            
        </div>
    </>
    )
}

export async function getServerSideProps () {
  const { arrayEtiquetas } = await traerEtiquetas()
  return {
    props: { arrayEtiquetas, notFound: false }
  }
}