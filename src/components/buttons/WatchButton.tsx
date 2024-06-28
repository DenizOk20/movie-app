import { Button } from '@mui/material'

const WatchButton = () => {
  return (
    <Button sx={{maxWidth:'180px', alignContent:'end'}} variant='contained' onClick={() => alert('watch section coming soon!')}>Watch Now</Button>
  )
}

export default WatchButton