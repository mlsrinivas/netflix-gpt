import { Button, Grid2, Typography } from '@mui/material'
import React, { useMemo, useRef, useState } from 'react'
import { genAiModel, gptClient, LOGIN_BG_IMAGE } from '../utils/constants'
import { APP_URL } from '../redux/url';
import { fetchClearMovieSearch, fetchMovieBySearch } from '../redux/reducers/dashboardReducer';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../components/movieCard';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const SearchMovies = () => {

    const [searchText, setSearchText] = useState('');
    const {getMovieByGpt} = useSelector(state => state.dashboard);
    const dispatch = useDispatch();

    const movieSuggetions = [
        {id: 1, title: 'Best comedy movies in telugu'},
        {id: 2, title: 'Horror romantic hollywood movies'},
        {id: 3, title: 'Action tollywood movies'},
        {id: 4, title: 'Si-fic indian movies'},
        {id: 5, title: 'Thriller malayalam movies'},
    ]

    console.log(getMovieByGpt, 'getMovieByGptgetMovieByGptgetMovieByGpt')

    const {parseMovieList} = useMemo(() => {
        const filterList = getMovieByGpt.filter(e => e.poster_path != null)
        return {
            parseMovieList: filterList
        }
    }, [getMovieByGpt]);
    
    console.log(parseMovieList, 'parseMovieListparseMovieList')

    const fetchMovieList = async(movie) => {
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, APP_URL)
        const json = await data.json();
        return json.results;
    }

    const handleSearchBtn = async(searchText) => {
        const exampleMovieList = ['Chupke Chupke', 'Hera Pheri', 'Andaz Apna Apna', '3 Idiots', 'Golmaal'];
        try{
            let gptSuggetedList = [];
            const prompt = `Act like a movie suggestion, i want ${searchText} and give me the top five results of movie names in an array format, i need only movie names same as the example format, dont give other text. Example: ${exampleMovieList}`
            // const gptResult = await gptClient.chat.completions.create({
            //     messages: [{ 
            //         role: 'user', 
            //         content: text ,
            //         prompt: prompt
            //     }],
            //     model: 'gpt-3.5-turbo',
            // });
            // console.log(gptResult, 'gptResult_gptResult')
            const result = await genAiModel.generateContent(prompt);
            gptSuggetedList = JSON.parse(result?.response?.text())
            const _gptResult = gptSuggetedList?.map((movie) => fetchMovieList(movie))
            const data = await Promise.all(_gptResult)
            dispatch(fetchMovieBySearch(data))

        }
        catch(e){
            console.log(e, 'err_err')
            throw(e)
        }
    }

    const handleFocusSearch = (event) => {
        if(event.key =='Enter'){
            handleSearchBtn()
        }
    }

    const handleClearSearch = () => {
        setSearchText('')
        dispatch(fetchClearMovieSearch())
    }

    const handleClickSuggestion = (text) => {
        setSearchText(text)
        handleSearchBtn(text)
    }

    return (
        <Grid2 sx={{height: '100vh', overflowX: 'scroll'}}>
            <img 
                style={{position: 'absolute', height: '100vh', width: '100vw', objectFit: 'cover', opacity: 0.4}}
                src={LOGIN_BG_IMAGE} 
                alt="backgound-image"
            />
            <Grid2 sx={{position: 'sticky', paddingTop: 7}}>
                <Grid2 sx={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                    <input 
                        type="text" 
                        value={searchText}
                        placeholder="Please enter the movie genre which you are intrested"
                        style={{height: 40, width: '40%', paddingLeft: 10, borderRadius: 7, backgroundColor:'#FFF', color:'#000', fontSize: 18}}
                        onKeyDown={handleFocusSearch}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button onClick={handleSearchBtn} sx={{height: 40, width: '6%', backgroundColor:'#a02222', borderRadius: 2, marginLeft: 1}}>
                        <Typography sx={{color:'#FFF', fontSize: 20}}>Search</Typography>
                    </Button>
                    <HighlightOffIcon onClick={handleClearSearch} sx={{color: '#a02222', fontSize: 40, marginLeft: 2, cursor: 'pointer'}}/>
                </Grid2>

                <Grid2 sx={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'row', paddingTop: 3}}>
                    <AutoAwesomeIcon sx={{fontSize: 30, color:'#FFF'}}/>
                    {movieSuggetions.map((item, index) => {
                        return(
                            <Grid2 key={index} onClick={() => handleClickSuggestion(item.title)} sx={{height: 32, borderRadius: 4, backgroundColor:'#FFF', padding: '5px', margin: 1, cursor: 'pointer', border: '1px solid red'}}>
                                <Typography sx={{fontSize: 14}}>{item.title}</Typography>
                            </Grid2>
                        )
                    })}
                </Grid2>

                {getMovieByGpt.map((item, index) => {
                    const filterList = item.filter(e => e.poster_path != null)
                    return(
                        <Grid2 key={index}>
                            <Typography sx={{color:'#FFF', fontSize: 16, position: 'relative', marginTop: 3, paddingBottom: 0}}>Movie title: <span style={{fontSize: 24}}>{filterList[0]?.original_title}</span></Typography>
                            <MovieCard
                                moviesList={filterList} 
                                marginTop={0}
                            />
                        </Grid2>
                    )
                })}

            </Grid2>
        </Grid2>
    )
}

export default SearchMovies
