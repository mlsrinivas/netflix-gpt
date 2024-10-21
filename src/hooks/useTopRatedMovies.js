import { useEffect } from "react"
import { APP_URL } from "../redux/url"
import { fetchTopRatedMovies } from "../redux/reducers/dashboardReducer"
import { useDispatch } from "react-redux";


export const useTopRatedMovies = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        handleTopRatedMovies()
    }, [])

    const handleTopRatedMovies = async() => {
          const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', APP_URL)
          const json = await data.json();
          dispatch(fetchTopRatedMovies(json.results))
    }
}