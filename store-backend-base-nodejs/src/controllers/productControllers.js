//import {pool} from '../config/db.js'
import ProductModel from '../models/productModels.js'
import ProductService from '../services/productServices.js';


class ProductController {

   static async conseguirProductos (req,res,next)  { 
    try {
        const resultado = await ProductModel.getAllProducts();
        res.json(resultado); 
    } catch (error) {
        next(error);
    }
}

static async crearProductos (req,res,next)  {
try {
    const productData=req.body;
    
    const {name,description,price,stock}=productData
if (!name || !description || price===undefined || stock===undefined) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });

}
console.log("datos del controller",productData)
const newProduct=await ProductService.createProductWithCategories(productData);
res.status(201).json(newProduct)
} catch (error) {
    next(error);
}
}


static async seleccionarProducto (req,res,next) {
try {
    const {id}=req.params
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID es requerido"});
    }
    const resultado=await ProductModel.getProductById(id)
    if(!resultado){
        return res.status(400).json({ error: "ID no existe"});
    }
    res.status(200).json(resultado)
    
} catch (error) {
    next(error);
    
}
}

static async conseguirProductosPorCategoria (req,res,next) {
    try {
        const {categoryID}=req.params
        console.log("categoryID",categoryID)
        if (isNaN(categoryID)) {
            return res.status(400).json({ error: "ID de categoria es requerido"});
        }
        const resultado = await ProductModel.getByCategoryId(categoryID);
        res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
}


static async  borrarProducto (req,res,next) {
try {
    const{id}=req.params
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID es requerido"});
    }
    const resultado=await ProductModel.deleteProduct(id)
    if(!resultado){
        return res.status(400).json({ error: "ID no existe"});

    }
    res.status(200).json(resultado)    
} catch (error) {
    next(error);
}

}

static async modificarProducto (req,res,next) {
    try {
        const {name,description,price,stock,sku,is_active}=req.body        
        const {id}=req.params

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID no existe o es requerido"});
        }

        const modificarProducto=await ProductModel.modifyProduct(id,name,description,price,stock,sku,is_active);

        if(!modificarProducto){
            return res.status(400).json({ error: "Producto no encontrado"});
        }

        res.status(201).json({message:"Producto modificado correctamente",modificarProducto})
    } catch (error) {
        next(error);
    }
}
}

export default ProductController