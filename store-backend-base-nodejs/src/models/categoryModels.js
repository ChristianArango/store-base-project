import pool from '../config/db.js'

class CategoryModel{
    static async getAllCategories() {
        const resultado=await pool.query('SELECT * FROM categories')
        return resultado.rows;
    }

    static async getCategoryById(id,client) {
                const resultado=await client.query('SELECT * FROM categories WHERE id=$1',[id])
        return resultado.rows[0]
    }

    static async createCategory(name,description)  {
        const resultado=await pool.query("INSERT INTO categories (name,description) VALUES ($1, $2) RETURNING*",[name,description]);
        return resultado.rows[0]
    }

    static async deleteCategory (id) {
        const resultado=await pool.query('DELETE FROM categories WHERE id=$1 RETURNING*',[id])
        return resultado.rows[0]
    }

    static async modifyCategory (id,name,description)  {
        const resultado=await pool.query("UPDATE categories SET name=$1, description=$2 WHERE id=$3 RETURNING*",[name,description,id])
        return resultado.rows[0]
    }

};

export default CategoryModel