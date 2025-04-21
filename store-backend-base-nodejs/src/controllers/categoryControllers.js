import categoryModel from '../models/categoryModels.js';


class CategoryController{
static async conseguirCategorias  (req,res,next)  { 
    try {
        const resultado = await categoryModel.getAllCategories();
        res.json(resultado); 
    } catch (error) {
        
        next(error);
    }
}

static async crearCategoria (req,res,next)  { 
try {
    const{name,description}=req.body;
if (!name || !description) {
    return res.status(400).json({ error: "Nombre y descripcion son requeridos" });
}

const resultado=await categoryModel.createCategory(name,description)
res.status(201).json(resultado)
    
} catch (error) {
    next(error);
    
}
}


static async seleccionarCategoria (req,res,next)  {
try {
    const {id}=req.params
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID es requerido"});
    }
    const resultado=await categoryModel.getCategoryById(id)
    if(!resultado){
        return res.status(400).json({ error: "ID no existe"});
    }
    res.status(200).json(resultado)
    
} catch (error) {
    next(error);
    
}
}


static async borrarCategoria (req,res,next)  {
try {
    const{id}=req.params
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID es requerido"});
    }
    const resultado=await categoryModel.deleteCategory(id)
    if(!resultado){
        return res.status(400).json({ error: "ID no existe"});

    }
    res.status(200).json(resultado)    
} catch (error) {
    next(error);
}

}

static async modificarCategoria (req,res,next) {
    try {
        const {id}=req.params
        const {name,description}=req.body
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID no existe o es requerido"});
        }
        if (!name || !description) {
            return res.status(400).json({ error: "Nombre y descripcion son requeridos" });
        }
        const resultado=await categoryModel.modifyCategory(id,name,description)
        res.status(200).json(resultado)
    } catch (error) {
        next(error);
    }
}
}

export default CategoryController