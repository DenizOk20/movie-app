import React from 'react'
import IntroFilm from './IntroFilm'
import RatedMovies from './RatedMovies'
import PopularMovies from './PopularMovies'


const Films = () => {

  return (
    <div>
        <IntroFilm/>
        <RatedMovies/>
        <PopularMovies/>
    </div>
  )
}

export default Films