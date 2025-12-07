import pool from '../config/db.js'

class ProductModel {
    static async getAllProducts() {
        const resultado=await pool.query('SELECT * FROM products ORDER BY id ASC')
        return resultado.rows;
    }

    static async getProductById(id) {
                const resultado=await pool.query('SELECT * FROM products WHERE id=$1',[id])
        return resultado.rows[0]
    }

    static async createProduct({name,description,price,stock,sku,is_active=true})  {
        const query="INSERT INTO products (name,description,price,stock,sku,is_active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING*";
        const values=[name,description,price,stock,sku,is_active]
        const resultado=await pool.query(query,values);
        return resultado.rows[0]
    }

    static async deleteProduct(id) {
        const resultado=await pool.query('DELETE FROM products WHERE id=$1 RETURNING*',[id])
        return resultado.rows[0]
    }

    static async modifyProduct(id,name,description,price,stock,sku,is_active)  {
        const result=await pool.query('UPDATE products SET name=$1, description=$2, price=$3, stock=$4, sku=$5, is_active=$6, updated_at=NOW() WHERE id=$7 RETURNING*',
        [name,description,price,stock,sku,is_active,id]);
        return result.rows[0];
    }
    static async assignCategoryToProduct(productId, categoryId,client) {
        const query='INSERT INTO products_categories (product_id, category_id) VALUES ($1, $2) ON CONFLICT DO NOTHING;';
        await client.query(query,[productId,categoryId]);
        
    }

    static async getByCategoryId(categoryId) {
        const query='SELECT p.* FROM products p JOIN products_categories pc ON p.id=pc.product_id WHERE pc.category_id=$1';
        const resultado=await pool.query(query,[categoryId]);
        return resultado.rows;
    }
}

export default ProductModel;