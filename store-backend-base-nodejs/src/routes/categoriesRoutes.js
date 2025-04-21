import express from 'express'
import CategoryController from '../controllers/categoryControllers.js'
import authMiddleware from '../middlewares/authMiddlewares.js' 
import ProductController from '../controllers/productControllers.js'

const categoryRouter=express.Router()

categoryRouter.get('/',authMiddleware,CategoryController.conseguirCategorias)

categoryRouter.post("/",authMiddleware,CategoryController.crearCategoria)

categoryRouter.get("/:id",CategoryController.seleccionarCategoria)

categoryRouter.delete("/:id",CategoryController.borrarCategoria)

categoryRouter.put("/:id",CategoryController.modificarCategoria)

categoryRouter.get('/:categoryID/products',authMiddleware,ProductController.conseguirProductosPorCategoria)

export default categoryRouter
