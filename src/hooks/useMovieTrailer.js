import React, { useEffect } from 'react'
import { APP_URL } from '../redux/url'
import { fetchMovieTrailer } from '../redux/reducers/dashboardReducer'
import { useDispatch } from 'react-redux'

const useMovieTrailer = (id) => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        handleMovieTrailer()
    }, [id])

    const handleMovieTrailer = async() => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/+${id}+/videos?language=en-US`, APP_URL)
        const json = await data.json()
        dispatch(fetchMovieTrailer(json.results))
    }
}

export default useMovieTrailer;
