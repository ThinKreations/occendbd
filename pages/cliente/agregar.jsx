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

function valuetext (value) {
  return `${value}°C`
}

export default function AddCliente(){
  
  
  const [nombres, setNombre] = useState()
  const [paterno, setPat] = useState()
  const [materno, setMat] = useState()
  const [razonSocial, setEmpresa] = useState()
  const [puesto, setPuesto] = useState()
  const [direccion, setDir] = useState()
  const [ciudad, setCity] = useState()
  const [cp, setPc] = useState()
  const [rfc, setRFC] = useState()
  const [email, setEmail] = useState()
  const [telefono, setTel] = useState()
  const [movil, setCel] = useState()
  const [comentario, setComentario] = useState()


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaAgregarCliente)
  })

  const agregarCliente = async () => {    
      event.preventDefault()
      const id = localStorage.getItem('id')
      let object = new Object({
        
        nombres: nombres,
        paterno: paterno, 
        materno: materno,
        razonSocial: razonSocial,
        puesto: puesto,
        direccion: direccion,
        ciudad: ciudad,
        cp: cp,
        rfc: rfc,
        email: email,
        telefono: telefono,
        movil: movil,
        usuario_creo: id,
        comentario: comentario
      })
    const {resJSON, res} = await agregarClienteReq(object)
    
    console.log(resJSON)
    console.log(object)
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
        
      }
    } else {
      if (res.status === 200) {
        
        swal({
          title:'Cliente agregado exitosamente',
          text: resJSON.msj,
          icon: 'success',
          button: 'Ok'
        })
        console.log(object.email)
      }
      
    }
    Router.back()
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

            <h1 className={styles.title}>Agregar Cliente</h1>
            
            </center><br/>
            
            <div className={styles.cont}>

                <center>

                <form onSubmit={handleSubmit(agregarCliente)} className={styles.clienteAgregar}>
                   
                        <input required className={styles.input} placeholder="Nombre(s)" {...register('nombres')} onChange={c => setNombre(c.target.value) } options={'ola'}></input>
                        
                        <input required className={styles.input} placeholder="Paterno" {...register('paterno')} onChange={c => setPat(c.target.value)}></input>
                        
                        <input required className={styles.input} placeholder="Materno" {...register('materno')} onChange={c => setMat(c.target.value)}></input>
                        <p></p>
                        <input required className={styles.input} placeholder="Razón Social" {...register('razonSocial')} onChange={c => setEmpresa(c.target.value)}></input>
                        <input required className={styles.input} placeholder="Puesto" {...register('puesto')} onChange={c => setPuesto(c.target.value)}></input>
                        <input required className={styles.input} placeholder="Dirección" {...register('direccion')} onChange={c => setDir(c.target.value)}></input>
                        <input required className={styles.input} placeholder="Ciudad" {...register('ciudad')} onChange={c => setCity(c.target.value)}></input>
                        <input required className={styles.input} placeholder="C.P." {...register('cp')} onChange={c => setPc(c.target.value)}></input>
                        <input required className={styles.input} placeholder="RFC" {...register('rfc')} onChange={c => setRFC(c.target.value)}></input>
                        <input required className={styles.input} placeholder="Email" {...register('email')} onChange={c => setEmail(c.target.value)}></input>
                        <input required className={styles.input} placeholder="Teléfono" {...register('telefono')} onChange={c => setTel(c.target.value)}></input>
                        <input required className={styles.input} placeholder="Cel." {...register('movil')} onChange={c => setCel(c.target.value)}></input><br/>
                        <input className={styles.inputComentario} placeholder="Comentarios" {...register('comentarios')} onChange={c => setComentario(c.target.value)}/>
                        <p className={styles.errors}>{errors.nombres?.message} {errors.email?.message} En caso de no contar con un dato, escibir "N/A"</p><br></br>
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