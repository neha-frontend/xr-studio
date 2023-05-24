import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  TwitterAuthProvider,
  OAuthProvider
} from 'firebase/auth';

import { checkAvailability, loginAction } from '../../store/sagaActions';
import { APPLE, GOOGLE, INSTA, TIKTOK, TWITTER } from '../../assets/images';
import BackDrop from '../../components/spinner/BackDrop';

import './createAccount.scss';

const SignUpOptions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginData = {
    provider: '',
    accessToken: '',
    grantType: 'social'
  };

  const [loading, setLoading] = useState(false);

  const redirect = (link) => navigate(link);  
  
  const signUpRedirect = () => navigate('/create-username');

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const data = { ...loginData, accessToken: result?.user?.accessToken, provider: 'google' };
      dispatch(
        checkAvailability({
          email: result?.user?.email,
          isEmail: true,
          isUsername: false,
          socialSignup: true,
          loginData: data,
          redirect,
          signUpRedirect
        })
      );
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  const handleTwitterLogin = async () => {
    try {
      const auth = getAuth();
      const provider = new TwitterAuthProvider();
      const result = await signInWithPopup(auth, provider);
      dispatch(
        loginAction({
          data: { ...loginData, accessToken: result?.user?.accessToken, provider: 'twitter' }
        })
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const auth = getAuth();
      const provider = new OAuthProvider('apple.com');
      const result = await signInWithPopup(auth, provider);
      const data = { ...loginData, accessToken: result?.user?.accessToken, provider: 'apple' };
      dispatch(
        checkAvailability({
          email: result?.user?.email,
          isEmail: true,
          isUsername: false,
          socialSignup: true,
          loginData: data,
          redirect,
          signUpRedirect
        })
      );
    } catch (error) {
      toast.error(error);
    }
  };
 
  return (
    <>
      <BackDrop open={loading} />
      <div className="signup_option heading3">
        <span> Or continue with </span>
      </div>
      <div className="d-flex justify-content-center pb-3 social_login">
        <img src={INSTA} alt="instagram" className="signin_icons insta_icon" />
        <img
          src={GOOGLE}
          alt="google"
          className="signin_icons google_icon"
          onClick={handleGoogleSignIn}
        />
        <img
          src={TWITTER}
          alt="twitter"
          className="signin_icons twitter_icon"
          onClick={handleTwitterLogin}
        />
        <img
          src={APPLE}
          alt="apple"
          className="signin_icons apple_icon"
          onClick={handleAppleLogin}
        />
        <img src={TIKTOK} alt="tiktok" className="signin_icons tiktok_icon" />
      </div>
    </>
  );
};

export default SignUpOptions;
