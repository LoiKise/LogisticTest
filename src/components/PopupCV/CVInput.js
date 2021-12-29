import React from 'react'
import { Box } from '@mui/system';
import { TextField } from '@material-ui/core';

const CVInput = ({ setProfile, profile, label, objectKey, type }) => {
    return (
        <Box sx={{
            width: 700,
            maxWidth: '100%',
        }}
        >
            <TextField fullWidth
                label={label}
                className="CV-input" type={type}
                value={profile[objectKey] || ""}
                variant="outlined"
                onChange={(event) => setProfile({ ...profile, [objectKey]: event.target.value })}
            />
        </Box>
    )
}
export default CVInput;