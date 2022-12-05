import React from "react";
import Image from "next/image";
import Link from 'next/link'
import logo from "../src/logo.png"
import styles from "../styles/Home.module.css"



export default function header(){

    return(
      
        <>
        <div className={styles.header}>
        <div className={styles.imgCont}><Link href="/"><Image src={logo} width={200} height={72} alt="logo"/></Link></div>

        
        </div>
        </>
   
    )

}