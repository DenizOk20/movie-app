import { Button } from '@mui/material'
import React from 'react'

const ForMoreButton = () => {
  return (
    <Button sx={{maxWidth:'200px', alignContent:'end'}} variant='contained'>
        For More Result
        <span style={{margin:'4px 0 0 2px'}}>
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><rect fill="none" height="24" width="24"/><path d="M9,5v2h6.59L4,18.59L5.41,20L17,8.41V15h2V5H9z"/></svg>
        </span>
    </Button>
  )
}

export default ForMoreButton