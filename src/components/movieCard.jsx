import { Button, Grid2, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { POSTER_PATH } from '../utils/constants'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import useMovieTrailer from '../hooks/useMovieTrailer';
import { useDispatch, useSelector } from 'react-redux';
import { APP_URL } from '../redux/url';
import { fetchMovieTrailer } from '../redux/reducers/dashboardReducer';
import BasicModal from './modal';

const MovieCard = ({moviesList, fromScreen, marginTop=5}) => {

    const dispatch = useDispatch();
    const {movieTrailer} = useSelector(state => state.dashboard);
    const scrollContainerRef = useRef(null);
    const [showMovieModal, setShowMovieModal] = useState(false);
    const [key, setKey] = useState('');

    const handleScrollbar = () => {
        scrollContainerRef.current.scrollBy({
            top: 0,
            left: 500,
            behavior: 'smooth'
        });
    }

    const handleMovie = async(item) => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/+${item.id}+/videos?language=en-US`, APP_URL)
        const json = await data.json()
        setShowMovieModal(true)
        setKey(json.results[0].key)
    }

    return (
        <Grid2>
            <Typography sx={{color:'#FFF', fontSize: 24, position: 'relative', fontWeight:'bold', marginTop: marginTop, paddingBottom: 2}}>{fromScreen}</Typography>
            <Grid2  sx={{display: 'flex', flexDirection:'row'}}>
                {/* <Grid2 onClick={handleScrollbar} sx={{width: '5%', zIndex: 1000, position:'sticky', backgroundColor:'transparent', alignContent:'flex-end', alignItems:'center', display:'flex'}}>
                    <KeyboardArrowLeftIcon  sx={{fontSize: 100, color:'#EEE', cursor: 'pointer'}}/>
                </Grid2> */}
                <Grid2 ref={scrollContainerRef} sx={{width: '90%', display:'flex', flexDirection:'row', scrollbarWidth: 'none', msOverflowStyle: 'none', overflow: 'auto', overflowX: 'scroll', width: '100%', position: 'relative'}}>
                    {moviesList?.map((item, index) => {
                    return(
                        <Grid2 onClick={() => handleMovie(item)} key={index} sx={{minWidth: '16%', display:'flex', flexDirection:'row', alignItems:'flex-end'}}>
                        <span
                            style={{
                            fontSize: '70px',
                            color: 'rgb(246, 243, 243)',
                            position:'absolute',
                            padding: 10, 
                            fontStyle: 'oblique',
                            textShadow: '5px 5px 10px rgb(251, 3, 3)', // Shadow effect
                            }}
                        >
                            {index+1}
                        </span>
                        <img 
                            style={{height: 200, width: 200, borderRadius: 10, border: '1px solid #FFF', cursor:'pointer'}}
                            src={POSTER_PATH+item?.poster_path }
                        />
                        </Grid2>
                    )
                    })}
                </Grid2>
                {moviesList.length > 7 &&<Grid2 onClick={handleScrollbar} sx={{width: '5%', zIndex: 1000, position:'sticky', backgroundColor:'transparent', alignContent:'flex-end', alignItems:'center', display:'flex'}}>
                    <KeyboardArrowRightIcon  sx={{fontSize: 100, color:'#EEE', cursor: 'pointer'}}/>
                </Grid2>}

                {showMovieModal && 
                <BasicModal 
                    onOpen={showMovieModal}
                    onClose={() => setShowMovieModal(false)}
                    movieKey={key}
                />}
            </Grid2>
        </Grid2>
    )
}

export default MovieCard
