import express from 'express'
import ProductController  from '../controllers/productControllers.js';
import authMiddleware from '../middlewares/authMiddlewares.js' ;

const router=express.Router()

router.get('/',ProductController.conseguirProductos);

router.post("/",ProductController.crearProductos);

router.get("/:id",ProductController.seleccionarProducto);

router.delete("/:id",ProductController.borrarProducto);

router.put("/:id",ProductController.modificarProducto);

export default router;