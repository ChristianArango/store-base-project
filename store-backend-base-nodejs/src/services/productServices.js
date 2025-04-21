import pool from "../config/db.js";
import ProductModel from "../models/productModels.js";
import CategoryModel from "../models/categoryModels.js";

class ProductService{
    static async createProductWithCategories({
        name, 
        description,
        price,
        stock,
        sku,
        is_active=true,
        categories=[]
    }) {
        const client = await pool.connect();
        
        try{
            await client.query("BEGIN");

            const product =await ProductModel.createProduct(
                {name,description,price,stock,sku,is_active},client
            );
 
            for(const categoryId of categories){
                console.log("datos del for",categoryId)
                const category = await CategoryModel.getCategoryById(categoryId,client);
                console.log("datos del category",category)
                if(!category){
                    throw new Error(`La categoría con ID ${categoryId} no existe`);
                }
                await ProductModel.assignCategoryToProduct(product.id,categoryId,client);
            }
            await client.query("COMMIT");
            return product;

        }catch (error) {
            await client.query("ROLLBACK");
            throw error; 

    }finally {
            client.release();
        }

}
}

export default ProductService;