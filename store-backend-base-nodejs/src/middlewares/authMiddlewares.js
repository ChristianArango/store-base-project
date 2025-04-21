import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ",""); //Limpia el token
    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }
    try{
        req.user=verifyToken(token); //verifica el token
        next(); // Si el token es válido, continúa con la siguiente función de middleware o ruta
     //   res.json({message:"Token verificado correctamente"}); // Respuesta de éxito
    }catch (error) {
        return res.status(error.status || 401).json({ error: error.message||"Token inválido" });
    }}

    export default authMiddleware; // Exporta el middleware para usarlo en las rutas