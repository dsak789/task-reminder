// const express = require('express')
// const app = express()
// const cors = require('cors')
// const Pool=require('pg').Pool

// const db={
//     user:"postgres",
//     host:"localhost",
//     database:"task_reminder",
//     password:"1437890",
//     port:"5432"
// }

// const con= new Pool(db)

// app.use(cors())
// app.use(express.json())

// async function createtasktb(){

//     try {
//         await con.connect()

//     //    const tableexists=`(SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='task');` ;

//     //    const {rows} =con.query(tableexists);
//     //    const tbexist=rows[0].exists;
//         const taskstb = `CREATE OR REPLACE FUNCTION create_tasks_table_if_not_exists() RETURNS VOID AS $$
//         BEGIN
//            IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'tasks') THEN
//               CREATE TABLE tasks (
//                  id SERIAL PRIMARY KEY,
//                  task VARCHAR(255) NOT NULL
//               );
//            END IF;
//         END;
//         $$ LANGUAGE plpgsql;
        
//         -- Call the function to create the table if it doesn't exist
//         SELECT create_tasks_table_if_not_exists();
//         `
//         con.query(taskstb,(err)=>{

//             if(err){
//              console.log("Table Created")
                 
//             }
//             else{
             
//              console.log("Table NOT Created")
//             }
//         });

//     } catch (error) {
//         console.log(error)
//     }
//     finally{
//         await con.end()
//     }
// }

// // app.get('/',(req,res)=>{
// //     res.send("Hello Client This is Main Server Landing Page ")
// //     window.location('/')
// // })
// app.get('/',(req,res)=>{
//     createtasktb()
//     res.send("Hello Client! \n This is TASK Table Creating Page ")
//     // window.location('/')
// })

// //Task CRUD Operations
// app.post('/addtask', async (req,res)=>{
//     try {
//         const {task} = req.body;
//         const newTask = await con.query("INSERT INTO tasks (task) VALUES ? RETURNING *",[task]);
//         res.json(newTask)
//     } catch (err) {
//         console.log(err.message)
//     }
// })

// app.get('/tasks',async (req,res)=>{
//     try {
//         console.log("All Tasks")
//         const alltasks= await con.query("SELECT * FROM tasks");
//         res.json(alltasks.rows);
//     } catch (err) {
//         console.log(err.message)
//     }
// })

// app.delete('/deltask/:id', async (req,res)=>{
//     try {
//         const task=await con.query(`DELETE FROM tasks WHERE id=${req.params.id}`);
//     } catch (err) {
//         console.log(err.message)
//     }
// })

// app.put('/edittask/:id', async (req,res)=>{
//     try {
//         const {task} = req.body;
//         // console.log(req.params.id+":"+task)
//         const update = await con.query(`UPDATE tasks SET task=$1 WHERE id=$2`,[task,req.params.id]);
//         res.end()
//     } catch (err) {
//         console.log(err.message)
//     }
// })

// app.listen(4789,(req,res)=>{
//     console.log("Web Server running at port no:1437")
// })

const Alltask = require('./Schemas/alltasks')
const sequelize = require('./Schemas/config')
const user = require('./Schemas/user')
user.sync({alert:true})
Alltask.sync({alter:true})
sequelize.sync()






//-----------API SECTION----------------//

const express = require('express')
const cors = require('cors')
const multer = require('multer')
const tasks = require('./ApiRoutes/TaskRoutes')



const app = express()
app.use(express.json())
app.use(cors())

const storage = multer.diskStorage({
    destination: function(req, file,cb) {
        return cb( null,"./public/images")
    },
    filename: function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage})

app.use('/api/tasks',tasks)
app.post('/upload',upload.single('file'),(req,res)=>{
    console.log(req.body)   
    console.log(req.file)
})


app.listen(12312,()=>{
    console.log("Tasking Server Started on POrt 12312")
})