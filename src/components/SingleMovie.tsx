import { Box, Container, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import WatchButton from "./buttons/WatchButton";

const SingleMovie = () => {
  const params = useParams();
  const location = useLocation().state;
  console.log(params);
  console.log(location);

  return (
    <Container sx={{}}>
      <Box padding="20px 0">
        <Typography variant="h1" component="h1" fontSize="2.8rem">
          {location.title}
        </Typography>
        <Typography>
          original title: <b>{location.original_title}</b>
        </Typography>
      </Box>
      <Box sx={{ display: "flex" , flexDirection:{xs:'column',sm:'row'}}}>
          <Box
            component="img"
            src={`https://image.tmdb.org/t/p/w500/${location.poster_path}`}
            maxWidth="325px"
          />
        <Box sx={{display:'flex',flexDirection:'column',gap:'20px',padding:{xs:'16px 0', sm:'20px'}}}>
          <Typography><b>{location.release_date.substring(0, 4)}</b></Typography>
          <Typography fontSize="1.2rem">{location.overview}</Typography>
          <WatchButton/>
        </Box>
      </Box>
      <Typography padding="4px 0">original language: {location.original_language}</Typography>
      <Typography padding="4px 0">
        <b>{location.vote_count}</b> user votes - vote average:{" "}
        <b>{location.vote_average}</b>
      </Typography>
    </Container>
  );
};

export default SingleMovie;
