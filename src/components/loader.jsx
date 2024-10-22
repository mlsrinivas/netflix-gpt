import { Grid2, CircularProgress, LinearProgress, Box } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    <Grid2 sx={{height: '100vh', width: '100vw', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <CircularProgress sx={{backgroundColor: '#FFF', color:'red'}}/>
    </Grid2>
  )
}

export default Loader
