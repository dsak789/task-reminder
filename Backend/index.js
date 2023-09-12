const express = require('express')
const app = express()
const cors = require('cors')
const {Client}=require('pg')

const db={
    user:"postgres",
    host:"localhost",
    database:"task_reminder",
    password:"1437890",
    port:"5432"
}

const con=new Client(db)

app.use(cors())
app.use(express.json())

async function createtasktb(){

    try {
        await con.connect()

    //    const tableexists=`(SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='task');` ;

    //    const {rows} =con.query(tableexists);
    //    const tbexist=rows[0].exists;
        const taskstb = `CREATE OR REPLACE FUNCTION create_tasks_table_if_not_exists() RETURNS VOID AS $$
        BEGIN
           IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'tasks') THEN
              CREATE TABLE tasks (
                 id SERIAL PRIMARY KEY,
                 task VARCHAR(255) NOT NULL
              );
           END IF;
        END;
        $$ LANGUAGE plpgsql;
        
        -- Call the function to create the table if it doesn't exist
        SELECT create_tasks_table_if_not_exists();
        `
        con.query(taskstb,(err)=>{

            if(err){
             console.log("Table Created")
                 
            }
            else{
             
             console.log("Table NOT Created")
            }
        });

    } catch (error) {
        console.log(error)
    }
    finally{
        await con.end()
    }
}

// app.get('/',(req,res)=>{
//     res.send("Hello Client This is Main Server Landing Page ")
//     window.location('/node.js')
// })
app.get('/createtbtasks',(req,res)=>{
    createtasktb()
    res.send("Hello Client! \n This is TASK Table Creating Page ")
    // window.location('node.js')
})
app.listen(3000,(req,res)=>{
    console.log("Web Server running at port no:3000")
})