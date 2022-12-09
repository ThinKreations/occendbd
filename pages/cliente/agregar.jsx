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
import {validarToken} from '../api/request'
import Router, { useRouter } from 'next/router'
import { schemaAgregarCliente } from '../../schemas/agregarCliente'
import { agregarClienteReq } from '../api/clientes-https'

export default function AddCliente(){
    
    /*
    
    const agregarCliente = async () => {
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
    const { resJSON, res } = await agregarClienteReq(object)
        if (res.status !== 200) {
            swal({
                title: 'Error',
                icon: 'error',
            })
        }
        if (resJSON.status !== 200) {
          swal({
              title: 'Error',
              icon: 'error',
          })
      }
      console.log("objeto: ", object.nombre)
      }


    */

      const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(schemaAgregarCliente)
      })
    
      const onSubmit = async data => {    
        let cliente = {
        
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
          usuario_creo: data.id
        }
        const {res} = await agregarClienteReq(cliente) 
        if (res.status !== 200) {
          try {
            let arrayErrors = resJSON.errors
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
          }
        } else {
          if (res.status === 200) {
            
            swal({
              title:'Cliente agregado exitosamente',
              text: resJSON.msj,
              icon: 'success',
              button: 'Ok'
            })
            
            
          }
          Router.push('/cliente/agregar')
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
                <form onSubmit={handleSubmit(onSubmit)} className={styles.clienteAgregar}>
                   
                        <p>Nombre</p>
                        <input className={styles.input} placeholder="Nombre(s)" {...register('nombres')}></input>
                        
                        <input className={styles.input} placeholder="Paterno" {...register('paterno')}></input>
                        
                        <input className={styles.input} placeholder="Materno" {...register('materno')}></input>
                        <p>Datos de Contacto</p>
                        <input className={styles.input} placeholder="Empresa" {...register('razonSocial')}></input>
                        <input className={styles.input} placeholder="Dirección" {...register('direccion')}></input>
                        <input className={styles.input} placeholder="Ciudad" {...register('ciudad')}></input>
                        <input className={styles.input} placeholder="C.P." {...register('cp')}></input>
                        <input className={styles.input} placeholder="RFC" {...register('rfc')}></input>
                        <input className={styles.input} placeholder="Email" {...register('email')}></input>
                        <input className={styles.input} placeholder="Teléfono" {...register('telefono')}></input>
                        <input className={styles.input} placeholder="Cel." {...register('cel')}></input>
                        <p className={styles.errors}>{errors.nombres?.message} {errors.email?.message}</p><br></br>
                    <button className={styles.guardar} type='submit'>Guardar</button>
                    
                </form>
                <Link href="/cliente/"><button className={styles.redBtn}>Cancelar</button></Link>

                </div>
                <br/><br/><br/><br/><br/><br/>
                


                </center>
                
            </div>
            
        </div>
    </>
    )
}