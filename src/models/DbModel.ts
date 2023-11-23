import mysql from 'mysql2/promise';
import { InternalServerError } from 'types/errors';
export default class DbModel{
    id: number|null;
    table: string;
    connection: mysql.Connection|null
    constructor(table:string){
        this.id= null;
        this.table = table;
        this.connection= null;
    }
    async createConnection():Promise<mysql.Connection>{
        if(this.connection){
            return await this.connection
        }
        return mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASS,
            database: process.env.DB
        })
    }
    getProperties(){
        const keys = Object.keys(this) as (keyof DbModel)[];
        return keys.filter(e=>{return !['id','table','connection'].includes(e)})
    }
    getValues(){
        const keys = Object.keys(this) as (keyof DbModel)[];
        return keys
                .filter(e=>{return !['id','table','connection'].includes(e)})
                .map(e=> !!this[e]?`'${this[e]}'`:'NULL')
    }
    /**
     * retorna un array con estas líneas key="value"
     * @returns {string[]}
     */
    getValuesAndPropertiesWithEqual(){
        const keys = Object.keys(this) as (keyof DbModel)[];
        const keysFiltered = keys.filter(e=>{return !['id','table','connection'].includes(e)})
        return keysFiltered.map(e=>`${e}=${!!this[e]?'\''+this[e]+'\'':'NULL'}`)
    }

    sanitizeSearchSql(q:string){
        q = q.toLowerCase().replace(/[áéíóúü|@|\.]/g,'%')
        return `${q.replace(/[^\w|\s|%]/g,'')}`;
    }
    async executeQuery(q:string){
        this.connection = await this.createConnection();
        const [response] = await this.connection.query(q);
        this.connection.destroy();
        return response;
    }
    async getAll(offset:string,limit:string){
        const query = `SELECT * FROM ${this.table}
        ${'deleted' in this? ' WHERE deleted!= 1': ''}
        LIMIT ${offset}, ${limit};`
        try{
            return this.executeQuery(query)
        }catch(e){
            console.error(e);
            throw(e);
        }
    }

    async getById(id:string){
        const query = `SELECT * FROM ${this.table} WHERE id = ${id};`
        try{
            const [first] = await this.executeQuery(query) as mysql.RowDataPacket[];
            return first;
        }catch(e){
            console.error(e);
            throw new InternalServerError('Error al conectar con la base de datos');
        }
    }
    // async createNew(table){
    //     const query = `INSERT INTO ${this.table}` //para insertar en la tabla datos nuevos
    //     try{
    //         //aqui no sé muy bien como hacer la logica. 
    //     }catch(e){
    //         console.error(e);
    //         throw new InternalServerError('Estos datos ya existen');
    //     }
    // }
}