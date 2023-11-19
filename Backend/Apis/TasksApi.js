// const Alltask = require("../Schemas/alltasks");


// exports.addtask=(req,res)=>{
//     const addtask = {
//         task:req.body.title,
//         description:req.body.description
//     };

//     Alltask.create(addtask,(err,result)=>{
//         if(err){
//             console.log(err)
//             res.sendStatus(400).json({Success:"Failed to insert"})
//         }
//         else{
//             console.log(result)
//             res.sendStatus(200).json({Success:"Added",Task:`${addtask.task}`})
//         }
//     })
// }

const { where } = require("sequelize");
const Alltask = require("../Schemas/alltasks");


exports.addtask=(req,res)=>{
    try{
        const addtask = {
        task:req.body.title,    
        description:req.body.description
    };
        Alltask.create(addtask)
            .then(result =>{
                console.log(result)
                res.json({Success:true,Task:`${addtask.task}`})
                // res.end()
            }).catch(error =>{
                console.log(error)
                res.sendStatus(400).json({Success:"Failed to insert"})
            })
    }
    catch(error){
        console.log(error)
    }
}


exports.deletetask = (req,res)=>{
    const taskid  = req.params.taskid
    try {
        Alltask.findByPk(taskid)
        .then((task)=>{
            Alltask.destroy({where:{taskid:task.taskid}})
            res.json({Message:`${taskid} deleted`})
        }).catch((error)=>{
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }
}







exports.gettasks=(req,res)=>{
    Alltask.findAll({}).then((tasks=>{
        res.json({tasks})
    }))
    .catch((error)=>{
        res.sendStatus(400).json({
            err:error,Success:" Data Not Retrived"
        })
    })
}