import { createSlice } from "@reduxjs/toolkit";


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        nowPlayingData: [],
        movieTrailer: [],
        popularMovies: [],
        topRatedMovies: [],
        getMovieByGpt: [],
    },
    reducers: {
        fetchNowPlayingData: (state, action) => {
            state.nowPlayingData = action.payload;
        },
        fetchMovieTrailer: (state, action) => {
            state.movieTrailer = action.payload;
        },
        fetchPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        fetchTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        fetchMovieBySearch: (state, action) => {
            state.getMovieByGpt = action.payload;
        },
        fetchClearMovieSearch: (state) => {
            state.getMovieByGpt = [];
        }
    }
})

export const {
    fetchNowPlayingData, 
    fetchMovieTrailer,
    fetchPopularMovies,
    fetchTopRatedMovies,
    fetchMovieBySearch,
    fetchClearMovieSearch
} = dashboardSlice.actions;

export default dashboardSlice.reducer;