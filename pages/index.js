import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import Link from 'next/link'
import { useRouter } from 'next/router'
import schemaIniciarSesion from '../schemas/schemaIniciarSesion'
import {getUsuario} from './api/user-https'

export default function Home() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaIniciarSesion)
  })

  const onSubmit = async data => {
    
    const res = await fetch(`https://localhost:8080/login/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correo: data.correo,
        password: data.password
      })
    })
    const resJSON = await res.json()
    if (res.status !== 200) {
      swal({
        title: 'Error al iniciar sesion.',
        text: resJSON.msg,
        icon: 'error',
        button: 'Ok'
      })
    } else {
      swal({
        title: 'Finalizado.',
        text: resJSON.msg,
        icon: 'success',
        button: 'Ok',
        timer: '3000'
      })
      localStorage.setItem('id', resJSON.id);
      localStorage.setItem('token', resJSON.token)
      router.push('/cliente/')
    }
  }

  return (
    <>
    <Head>
    <title>OCCEND | Log In</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
    </Head>
  
      <div className={styles.container}>
          

            <Header/>
          <center>

          <form className={styles.loginForm} onSubmit={onSubmit}>
                
                <font face="Work Sans">
                
                <center><h1>Iniciar Sesión</h1></center>
                <input {...register('correo')} className={styles.inputLogin} placeholder="Correo"/>
                <p className={styles.errors}>{errors.correo?.message}</p>
                <input {...register('password')} className={styles.inputLogin} placeholder="Contraseña"/>
                <p className={styles.errors}>{errors.password?.message}</p>
                <center>
                  <button className={styles.btnLog} type="submit">Acceder</button>          
                </center>
                </font>
            </form>
          


          </center>
          
        </div>
    
    
    </>

    
  )
}
