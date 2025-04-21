import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { validarPassword, validarUsername } from "../validators/authValidator.js";

//Creando la función register
export const register=async (req,res) => {
const {username,password}=req.body;

// Verificar que el cuerpo de la solicitud contenga los campos requeridos y que no estén vacios
if (!username || !password) {
    return res.status(400).json({ error: "Username y password son requeridos" });
}

if(!validarUsername(username)){
    return res.status(400).json({error:"El nombre de usuario no es válido"});
}
if (!validarPassword(password)) {
    return res.status(400).json({ error: "La contraseña debe tener entre 6 y 60 caracteres, y solo puede contener letras,numeros y caracteres especiales" });
}

try{
    const UserExists=await pool.query("SELECT * FROM users WHERE username=$1",[username]);
    if(UserExists.rows.length>0){
        return res.status(400).json({ error: "El nombre de usuario ya existe" });
    }
    const hashedPassword=await bcrypt.hash(password,10);

    const newUser=await pool.query("INSERT INTO users (username,password) VALUES ($1,$2) RETURNING *",[username,hashedPassword]);
    res.json({message: "Usuario creado correctamente", user:newUser.rows[0]});
    }catch(error){
        if(error.code==="23505"){
            return res.status(400).json({ error: "El nombre de usuario ya está en uso" });
    }
        res.status(500).json({ error: "Error del servidor" });
    }
}

//Creando la función login
export const login=async (req,res) => {
    const{username,password}=req.body
    if (!username || !password) {
        return res.status(400).json({ error: "Username y password son requeridos" });
    }
try {
    const user=await pool.query("SELECT * FROM users WHERE username=$1",[username])
    if(user.rows.length===0){
        return res.status(401).json({error:"Credenciales incorrectas"})
    }

    const usuario=user.rows[0];

    const validPassword=await bcrypt.compare(password,usuario.password); // comparar contraseña
    if(!validPassword){
        return res.status(400).json({error:"Credenciales incorrectas"});
    }
    
    const token= generateToken(usuario.id,usuario.username); //generar token
    
    res.json({message:"Inicio de sesión exitoso", token,user:{id:usuario.id,username:usuario.username}});
    
    
} catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ error: "Error del servidor, mano" });
}    
}
