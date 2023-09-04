import React from 'react'
import { TextField } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';


function PostForm() {
    return (
        <Paper elevation={3} style={{maxWidth:'400px'}}>
            <TextField
                id="outlined-secondary"
                label="Outlined secondary"
                variant="outlined"
                color="primary"
                style={{width: '100%'}}
            />
        </Paper>
    )
}

export default PostForm
