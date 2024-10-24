import { Button, Grid2, Input, TextField, Typography } from '@mui/material'
import React, {useEffect, useRef, useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { validateInput } from '../utils/validation';
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    updateProfile, 
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider
} from "firebase/auth";
import { auth, facebookPovider, googleProvider } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../redux/reducers/loginReducer';
import Header from '../components/header';
import { LOGIN_BG_IMAGE, USER_AVATAR } from '../utils/constants';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const Login = () => {

    const userName = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const [isLoginView, setIsLoginView] = useState(true);
    const navigate = useNavigate();
    const [errors, setErrors] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        const validate = validateInput(email.current.value, password.current.value)
        setErrors(validate)
        if(validate == null){
            if(isLoginView){
                signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user, 'userLLL')
                })
                .catch((error) => {
                    setErrors(error.message)
                });
            }else{
                createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user, 'useruser')
                    updateProfile(auth.currentUser, {
                        displayName: userName.current.value, photoURL: USER_AVATAR
                        }).then(() => {
                            dispatch(addUser({
                                email: user.email,
                                displayName: user.displayName,
                                userIcon: user.photoURL
                            }))
                        }).catch((error) => {
                        setErrors(error.message)
                        });
                })
                .catch((error) => {
                    setErrors(error.message)
                });
            }
        }        
    }

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        }).catch((error) => {
            console.log(error, 'error_google_login')
        });
    }

    const handleFacebookLogin = async() => {
        try {
            const result = await signInWithPopup(auth, facebookPovider);
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
    
            console.log('User Info:', user);
            console.log('Access Token:', token);
        } catch (error) {
            console.error('Error during Facebook sign-in:', error);
        }
    }

    const handleFocusPassword = (event) => {
        if (event.key === "Enter") {
            password.current.focus()
        }
    }

    const handleFocusSubmit = (event) => {
        if (event.key === "Enter") {
            handleSubmit(); // Submit the form when Enter is pressed
        }
    };
    
    return (
        <Grid2 sx={{alignItems:'center', display: 'flex', flexDirection:'column'}}>
            <img 
                style={{position: 'absolute', height: '100vh', width: '100vw', objectFit: 'cover', opacity: 0.8}}
                src={LOGIN_BG_IMAGE} 
                alt="backgound-image"
            />
            <Grid2 sx={{position: 'absolute', width: '100%'}}>
                <Header />
            </Grid2>
            <Grid2 sx={{position: 'absolute', top: '20%', height: isLoginView ? 390 : 420, width: 400, backgroundColor: '#000', borderRadius: 5, padding: 3}}>
                <Typography sx={{fontSize: 30, color: '#FFF', fontWeight: 'bold'}}>{isLoginView ? 'Sign In' : 'Sign Up'}</Typography>
                {!isLoginView &&
                    <input 
                        type="text" 
                        ref={userName}
                        placeholder="Please enter your name"
                        style={{height: 30, width: '90%', marginTop: 30, paddingLeft: 10, borderRadius: 7}}
                    />
                }
                <input 
                    type="text" 
                    ref={email}
                    placeholder="Please enter your email"
                    style={{height: 30, width: '90%', marginTop: 30, paddingLeft: 10, borderRadius: 7}}
                    onKeyDown={handleFocusPassword}
                />
                <input 
                    type="password" 
                    ref={password}
                    placeholder="Please enter your password"
                    style={{height: 30, width: '90%', marginTop: 30, paddingLeft: 10, borderRadius: 7}}
                    onKeyDown={handleFocusSubmit} // Detect "Enter" key press
                />
                <Typography sx={{color:'red', marginTop: 3, fontSize: 14}}>{errors}</Typography>
                <Button onClick={handleSubmit} sx={{height: 40, width: '90%', borderRadius: 3, border:'1px solid red', alignSelf:'center', marginTop: 1, cursor: 'pointer'}}>
                    <Typography sx={{color:'#FFF'}}>{isLoginView ? 'Login' : 'Register'}</Typography>
                </Button>

                {isLoginView && 
                    <Grid2 sx={{width: '90%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <Button onClick={handleGoogleLogin} sx={{height: 40, width: '48%', borderRadius: 3, border:'1px solid red', alignSelf:'center', marginTop: 1, cursor: 'pointer'}}>
                            <GoogleIcon sx={{color:'red', paddingRight: 1}}/>
                            <Typography sx={{color:'#FFF'}}>{'Google'}</Typography>
                        </Button>
                        <Button onClick={handleFacebookLogin} sx={{height: 40, width: '48%', borderRadius: 3, border:'1px solid red', alignSelf:'center', marginTop: 1, cursor: 'pointer'}}>
                            <FacebookIcon sx={{color:'red', paddingRight: 1}}/>
                            <Typography sx={{color:'#FFF'}}>{'Facebook'}</Typography>
                        </Button>
                    </Grid2>
                }
                
                <Grid2 sx={{marginTop: 2}}>
                    {!isLoginView ?
                        <Typography sx={{color:'#FFF'}}>Already have account?<Button onClick = {() => setIsLoginView(true)} sx={{cursor: 'pointer', color: 'red', fontSize: 18, textDecoration:'underline'}}>Login</Button></Typography>
                    :
                        <Typography sx={{color:'#FFF'}}>New to Netflix?<Button onClick = {() => setIsLoginView(false)} sx={{cursor: 'pointer', color: 'red', fontSize: 18, textDecoration:'underline'}}>Sign Up</Button></Typography>
                    }
                    </Grid2>
                
            </Grid2>
        </Grid2>
    )
}

export default Login
