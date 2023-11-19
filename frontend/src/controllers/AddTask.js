import React, { Fragment, useState } from "react";
import axios from 'axios'
import "../components/css/AddTask.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/AddBox';

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const adding_task = async () => {
        const data = {
            title: title,
            description: description,
        };
        try {
            const response = await axios.post('http://localhost:12312/api/tasks/addtask', data);
            console.log(response);
            window.location.href='/';
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Fragment>
            <div className="main-addtask">
                <form>
                    <div>
                        <Box className="form-box"
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="on"
                        >
                            <TextField id="outlined-basic" name="title" label="Task Title" variant="outlined" onChange={(e) => { setTitle(e.target.value) }} />
                            <TextField id="outlined-basic" name="description" label="Description" variant="outlined" onChange={(e) => { setDescription(e.target.value) }} />
                            <Button variant="contained" onClick={() => { adding_task() }} endIcon={<SendIcon />}>
                                ADD
                            </Button>
                        </Box>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default AddTask;
