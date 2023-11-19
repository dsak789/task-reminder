import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const Tasks = () => {
    const [tasks, setTasks] = useState([])
    

    const getTasks = async () => {
        try {
            const response = await axios.get('http://localhost:12312/api/tasks/alltasks')
            if (response.data && response.data.tasks) {
                setTasks(response.data.tasks);
                
            } else {
                setTasks([]);
                console.log("No tasks found in the response.");
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }


    const remove_task= async (removetask)=>{
        
            try {
                console.log("Entered into Remove task"+removetask.taskid)
                await axios.get(`http://localhost:12312/api/tasks/removetask/${removetask.taskid}`)
                .then(
                    console.log("Task Removed"+removetask.taskid)
                    ).catch((error)=>{ 
                        console.log(error)
                    })
                    window.location.href = `/`
        
            } catch (error) {
                console.log(error)
            }
        }
        

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <Fragment>
            <div className='main-tasks'>
                <h1 align='center'>All Tasks</h1>
                <div align="center">
                    <TableContainer component={Paper} align='center'>
                        <Table sx={{ minWidth: 100 }} aria-label="simple table" align='center'>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Sl No</b></TableCell>
                                    <TableCell align="center"><b>Title</b></TableCell>
                                    <TableCell align="center"><b>Task descrription</b></TableCell>
                                    <TableCell align="center">
                                        <b>Actions</b>
                                    </TableCell>
                                    {/* <TableCell align="center">
                                       <b> Created on - Updated On - Completed on </b>
                                    </TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasks.map((task) => (
                                    
                                    <TableRow
                                        key={task.taskid}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>
                                            {task.taskid}
                                        </TableCell>
                                        <TableCell align="center">{task.task}</TableCell>
                                        <TableCell component="th" align="center">{task.description}</TableCell>
                                        <TableCell>
                                            <TableRow>
                                                <TableCell>
                                                    <Button variant="contained" color="success">
                                                        Complete
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="outlined" color="warning">
                                                        Edit
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="outlined" color="error" onClick={()=>{remove_task(task)}} >
                                                        Remove
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableCell>
                                        {/* <TableCell>
                                            <TableRow>
                                                <TableCell>
                                                    <Button variant="contained" color="success">
                                                        {task.completed}
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="outlined" color="warning">
                                                        {task.createdAt}
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="outlined" color="error">
                                                        {task.updatedAt}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Fragment>
    )
}

export default Tasks;
