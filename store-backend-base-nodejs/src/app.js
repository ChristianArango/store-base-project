
import express from 'express'
import cors from 'cors'
import router from './routes/productRoutes.js';
import authRouter from './routes/authRoutes.js';
import path from 'path'
import {fileURLToPath} from 'url'
import morgan from 'morgan';
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

//Esto se está exportando directo de controllers sin pasar por rutas
import categoryRouter from './routes/categoriesRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app=express()

app.use(cors())

app.use(morgan('dev')) //Middleware para registrar las peticiones HTTP en la consola

app.use(express.json());

app.get("/inicio", (req,res) => {
//const {nombre}=req.params
//    res.status(400).send(`Hola ${nombre}, esto es el fin del inicio`);
//    console.log("Esto es el inicio del fin")

res.sendFile(path.join(__dirname,"./views/inicio.html"));

})



app.use('/products',router)

app.use('/auth',authRouter);

app.use('/categories',categoryRouter);

app.post("/Nosotros", (req,res) => {
    const {nombre,edad} =req.body;
    if (!nombre || !edad) {
        return res.status(400).json({ error: "Nombre y edad son requeridos" });
    }

    console.log(`Nombre: ${nombre}, Edad: ${edad}`);

    res.json({ mensaje: `Hola, ${nombre}!` });
})

app.get("/Nosotros", async (req, res) => {
    try {
        const productos = await ProductModel.getAllProducts();

        if (!Array.isArray(productos)) {
            throw new Error("La respuesta no es un array válido");
        }

        res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nosotros</title>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Poppins', sans-serif;
                }

                body {
                    background: linear-gradient(135deg, #1E293B, #64748B);
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    padding: 20px;
                    text-align: center;
                }

                h1 {
                    font-size: 2.5rem;
                    font-weight: 600;
                    margin-bottom: 20px;
                    text-transform: uppercase;
                }

                .container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px;
                    width: 90%;
                    max-width: 1000px;
                }

                .card {
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(10px);
                    padding: 20px;
                    border-radius: 15px;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    text-align: left;
                }

                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
                }

                .card h2 {
                    font-size: 1.5rem;
                    font-weight: 400;
                }

                .card p {
                    font-size: 1rem;
                    opacity: 0.9;
                }
            </style>
        </head>
        <body>
            <h1>Nuestros Productos</h1>
            <div class="container">
                ${productos.map(producto => `
                    <div class="card">
                        <h2>ID: ${producto.id} - ${producto.name}</h2>
                        <p>${producto.description}</p>
                    </div>
                `).join('')}
            </div>
        </body>
        </html>`);
    } catch (error) {
        console.error("Error obteniendo productos:", error);
        if (!res.headersSent) {
            res.status(500).send("Error interno del servidor");
        }
    }
});
app.use(errorHandler)

export default app;

