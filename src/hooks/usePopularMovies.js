import { useEffect } from "react"
import { APP_URL } from "../redux/url"
import { fetchPopularMovies } from "../redux/reducers/dashboardReducer"
import { useDispatch } from "react-redux";


export const usePopularMovies = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        handlePopularMovies()
    }, [])

    const handlePopularMovies = async() => {
          const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', APP_URL)
          const json = await data.json();
          dispatch(fetchPopularMovies(json.results))
    }
}