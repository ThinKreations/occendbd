import React from 'react'
import Router from 'next/router'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Header from '../components/Header'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js'
import { schemaCrearCuenta } from '../schemas/crearCuenta'
import { schemaIniciarSesion } from '../schemas/iniciarSesion'
import swal from 'sweetalert'
import { getUsuario } from './api/user-https'

export default function IniciarSesion () {
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaIniciarSesion)
  })

  const onSubmit = async data => {
    const res = await fetch(`http://localhost:8080/login`, {
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
      localStorage.setItem('correo', data.correo)
      
      Router.push('/cliente/')
    }
  }

  return (
    <div>
      
        <Head>
        <title>Log In</title>
        <meta name="Administración." content="Occend" />
        
        </Head>

        <div className={styles.container}>
            
            <Header/>
            
            <center>

              <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>

                <h1>Iniciar Sesión</h1>
                <input {...register('correo')} className={styles.inputLogin} placeholder="Correo"/>
                <p className={styles.errors}>{errors.correo?.message}</p>

                <input {...register('password')} type='password' className={styles.inputLogin} placeholder="Contraseña"/>
                <p className={styles.errors}>{errors.password?.message}</p>

                <button className={styles.btnLog} type='submit'>
                Acceder
                </button>

              </form>

            </center>

        </div>
      
    </div>
  )
}

/* Form

<h1>Crear Cuenta</h1>
              <input {...register('correo')} className={styles.inputLogin} placeholder="Correo"/>
              <p className={styles.errors}>{errors.correo?.message}</p>

              <input {...register('password')} type='password' className={styles.inputLogin} placeholder="Contraseña"/>
              <p className={styles.errors}>{errors.password?.message}</p>

              <button className={styles.btnLog} type='submit'>
              Acceder
              </button>

*/

/* Top

const {register,handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaCrearCuenta)
  })

  const onSubmit = async data => {    

    const res = await fetch(`http://localhost:8080/user`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correo: data.correo,
        password: data.password, 

      })
    })
    const resJSON = await res.json()
    if (res.status !== 200) {
      try {
        let arrayErrors = resJSON.errors
        arrayErrors.forEach(e => {
          swal({
            title: 'Error al crear cuenta',
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
          title:'Cuenta creada exitosamente',
          text: resJSON.msj,
          icon: 'success',
          button: 'Ok'
        })
        console.log(data.correo)
        
      }
      Router.push('/')
    }
  }

*/

