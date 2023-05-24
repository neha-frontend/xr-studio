import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import {
  getProfileAction,  
  logoutAction
} from '../../store/sagaActions';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogout = () => {
    dispatch(logoutAction({ forceLogout: true }));
    navigate('/');
  };

  useEffect(() => {  
    dispatch(getProfileAction());
  }, []);

  return (
    <Button className="d-flex justify-content-center mt-5" onClick={handelLogout}>
      Logout
    </Button>
  );
};

export default HomePage;
