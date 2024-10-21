import { Button, Grid2, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/header';
import { useNowPlayingMovies } from '../hooks/useNowPlayingMovies';
import useMovieTrailer from '../hooks/useMovieTrailer';
import { POSTER_PATH } from '../utils/constants';
import { usePopularMovies } from '../hooks/usePopularMovies';
import { useTopRatedMovies } from '../hooks/useTopRatedMovies';
import MovieCard from '../components/movieCard';
import Body from '../components/body';
import SearchMovies from './searchMovies';
const Dashboard = () => {

  const {nowPlayingData, movieTrailer, popularMovies, topRatedMovies} = useSelector(state => state.dashboard);
  const {toggleSearch} = useSelector(state => state.searchReducer);

  const id = nowPlayingData[0]?.id;
  
  const key = useMemo(() => {
    if(movieTrailer != undefined) return movieTrailer[7]?.key;
    else return 'W2HXtyIYdfI'
  }, [movieTrailer])

  console.log(key, 'keykey__keykey')

  useTopRatedMovies();
  usePopularMovies();
  useNowPlayingMovies();
  useMovieTrailer(id);
// background: 'linear-gradient(to top, #221616 30%, #403838 70%)'

  return (
    <Grid2 sx={{overflow: 'hidden', backgroundColor:"#000"}}>
      <Header />
      {toggleSearch 
      ? 
        <SearchMovies />
      :
      <>
        <Body 
          key={key}
          nowPlayingData={nowPlayingData}
        />
        <MovieCard 
          moviesList={nowPlayingData} 
          fromScreen = 'Now playing'
          marginTop={-30}
        />
        <MovieCard 
          moviesList={topRatedMovies} 
          fromScreen = 'Top rated'
        />
        <MovieCard 
          moviesList={popularMovies} 
          fromScreen = 'popular'
        />
      </>
      }
      
    </Grid2>
  )
}

export default Dashboard
