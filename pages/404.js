import React from 'react'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import MainHead from '../components/MainHead'

export default function FourOhFour(){


return(
    <>
    <MainHead/>
    <div className={styles.container}>
    <Header/>

    <h1>404</h1>
    
    </div>
    
    </>
    
)
}