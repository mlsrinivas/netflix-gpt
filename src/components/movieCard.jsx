import { Button, Grid2, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { POSTER_PATH } from '../utils/constants'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const MovieCard = ({moviesList, fromScreen, marginTop=5}) => {

    const scrollContainerRef = useRef(null);

    const handleScrollbar = () => {
        scrollContainerRef.current.scrollBy({
            top: 0,
            left: 500,
            behavior: 'smooth'
        });
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
                    <Grid2 key={index} sx={{minWidth: '16%', display:'flex', flexDirection:'row', alignItems:'flex-end'}}>
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
        </Grid2>
    </Grid2>
  )
}

export default MovieCard
