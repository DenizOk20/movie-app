import IntroFilm from './IntroFilm'
import RatedMovies from './RatedMovies'
import PopularMovies from './PopularMovies'
import { Link } from 'react-router-dom'
import ForMoreButton from '../buttons/ForMoreButton'


const Films = () => {

  return (
    <div>
        <IntroFilm/>
        <RatedMovies/>
        <PopularMovies/>
        <Link to="/search/movie-list"
              style={{display:'flex' ,justifyContent:'center',padding:'8px 0'}}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
            <ForMoreButton/>
        </Link>
    </div>
  )
}

export default Films