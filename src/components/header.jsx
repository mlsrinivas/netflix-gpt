import { Button, Grid2, Typography } from '@mui/material'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, {useEffect, useState} from 'react'
import { addUser, removeUser } from '../redux/reducers/loginReducer';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { LOGO_URL, USER_AVATAR } from '../utils/constants';
import { fetchToggleSearch } from '../redux/reducers/searchReducer';
import { fetchClearMovieSearch } from '../redux/reducers/dashboardReducer';

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userData = useSelector(state => state.user);
    const {toggleSearch} = useSelector(state => state.searchReducer);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                let obj = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    userIcon: user.photoURL
                }
                dispatch(addUser(obj))
                navigate('/dashboard')
            } else {
                dispatch(removeUser())
                navigate('/')
            }
        });

        return () => unSubscribe();
    }, []);

    const handleLogout = () => {
        signOut(auth).then(() => {
            dispatch(removeUser()) 
            if(toggleSearch){
                dispatch(fetchToggleSearch())
            }
        }).catch((error) => {
            console.log(error, 'logout error')
        })
    }

    const handleNavigateSearch = () => {
        dispatch(fetchToggleSearch())
        dispatch(fetchClearMovieSearch())
    }
// background: 'linear-gradient(to top, #221616 30%, #403838 70%)'
    return (
        <Grid2 sx={{ display: 'flex', justifyContent:'space-between',alignItems:'center'}}>
            <img 
                style={{height: 100, width: 300}}
                src={LOGO_URL}
                alt="logo"
            />
            {userData != null &&
            <Grid2 sx={{display: 'flex', flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
                <Button onClick={handleNavigateSearch} sx={{height: 40, width: 'auto', border:'1px solid red', marginRight: 5, cursor: toggleSearch ? 'pointer' : 'text'}}>
                    <Typography sx={{color:'#FFF'}}>{toggleSearch ? 'Back to dashboard' : 'Search for movie suggestions'}</Typography>
                </Button>
                <Grid2 sx={{padding: 2, display:'flex', alignItems:'center', flexDirection:'column'}}>
                    <img
                        style={{ height: 40, width: 40, borderRadius: '50%' }}
                        src={USER_AVATAR}
                        alt="userIcon"
                    />
                    <Typography sx={{color:'#FFF'}}>{userData?.displayName || 'MLS'}</Typography>
                </Grid2>
                <Grid2 onClick={handleLogout} sx={{padding: 2, cursor: 'pointer'}}>
                    <LogoutIcon sx={{color:'red', height: 40, width: 40}}/>
                </Grid2>
            </Grid2>
            }
        </Grid2>
    )
}

export default Header
