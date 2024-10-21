import { useEffect } from "react";
import { APP_URL } from "../redux/url";
import { useDispatch } from "react-redux";
import { fetchNowPlayingData } from "../redux/reducers/dashboardReducer";

export const useNowPlayingMovies = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        handleNowPlayingData()
    }, [])

    const handleNowPlayingData = async() => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', APP_URL)
        const json = await data.json();
        dispatch(fetchNowPlayingData(json.results))

    }  
}