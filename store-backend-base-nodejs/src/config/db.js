//const {Pool} = require('pg')
import kpg from 'pg';
const{Pool}=kpg;
import dotenv from 'dotenv'
dotenv.config()

//const {Pool} = require('pg')

//Configurar el pool de conexiones a PostgreSQL
/*const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'postgresTest',
    password:'admin1',
    port:'5432'
})
*/

//Creando la constante app, el cual hace referencia a la función express

const pool=new Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT
})




//export default pool;

export default pool;

/*
export default new Pool({
    user:'postgres',
    host:'localhost',
    database:'postgresTest',
    password:'admin1',
    port:'5432'
})

export function suma(a,b){
    let c=a+b;
    return c
}

*/

//export default pool;