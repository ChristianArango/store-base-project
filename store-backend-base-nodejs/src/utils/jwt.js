import jwt from 'jsonwebtoken';

//funcion para generar un token
export const generateToken = (userId,username) => {
return jwt.sign({ userId, username },process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES_IN || '1h' } );

};

//funcion para verificar el token
export const verifyToken=(token => {
    if(!token) {
        const error =new Error("Token no proporcionado");
        error.status=401;
        throw error;
    }
try {
    return jwt.verify(token,process.env.JWT_SECRET);
} catch (err){
    
    console.error("Error al verificar el token",err.message);
    throw new Error("Token inválido");
}
    
})