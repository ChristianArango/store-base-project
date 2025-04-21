

//Iniciando la constante express, tiene como objetivo obtener las funciones de la carpeta express
//const express= require('express')
import app from './app.js'

//La constante app a través de la función listen abre la comunicación en el puerto 3000 en localhost
app.listen(3000,() => {
    console.log("El servidor está funcionando en HTTP://localhost:3000")
})

