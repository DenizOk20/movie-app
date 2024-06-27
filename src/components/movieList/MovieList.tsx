import { Box, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FilmButton from "../buttons/FilmButton";
import usePagination from "../pagination/Pagination";

interface Movies {
  id: number;
  title: string;
  poster_path:string;
  overview: string
}

const MovieList = () => {
  const [movies, setMovies] = useState<Movies[] | null>([]);
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const count = Math.ceil(movies?.length || 0 / PER_PAGE);
  const AllMovies = usePagination({ data: movies || [], itemsPerPage: PER_PAGE });

  const handleChange = (e:React.ChangeEvent<unknown>, p:number) => {
    setPage(p);
    AllMovies.jump(p);
    window.scrollTo(0,0)
  };

  const getMovies = async () => {
    try {
      const response1 = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=7e06de6291f7ffe73c1196bf4bf2f7dc`
      );
      const data1 = await response1.json();
      setMovies(data1.results);

      const response2 = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=7e06de6291f7ffe73c1196bf4bf2f7dc`
      );
      const data2 = await response2.json();

      setMovies((prevMovies) => {
        if (!prevMovies) {
          prevMovies = [];
        }
        const newMovies = data2.results.filter(
          (movie: Movies) =>
            !prevMovies.some(
              (prevMovie: Movies) => prevMovie.title === movie.title
            )
        );
        return [...prevMovies, ...newMovies];
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div style={{padding:'20px'}}>
        <Typography variant="h2" component="h2" sx={{
            fontSize:'3rem',
            padding:'20px 0',
        }}>All Movies</Typography>

        <Box sx={{display:'flex',flexDirection:'column',gap:'20px'}}>
            {AllMovies.currentData().map(movie => (
                <Box sx={{
                    display:'flex',
                    gap:'20px',
                }}>
                    <Box 
                        component="img"
                        src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                        alt="movie"
                        sx={{
                            width:'350px'
                        }}
                    />
                    <Box sx={{
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'space-evenly'
                    }}>
                        <Typography variant="h4" component="h4">{movie.title}</Typography>
                        <Typography variant="body1" component="p" sx={{maxWidth:'400px'}}>{movie.overview}</Typography>
                        <Typography>
                            <FilmButton movie={movie}/>
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
        
        <Pagination
        sx={{
            display:'flex',
            justifyContent:'center',
            padding:'20px 0'
        }}
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
  </div>
  );
};

export default MovieList;
