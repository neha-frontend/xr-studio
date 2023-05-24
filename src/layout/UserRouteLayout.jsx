import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getFavouriteTeamAction, getProfileAction, logoutAction } from '../store/sagaActions';
import SetTokenHeader from '../hoc/SetTokenHeader/SetTokenHeader';
import axiosMain from '../http/axios/axios_main';
import Sidebar from './Sidebar';

import './index.scss';

function UserRouteLayout({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getProfileAction({}));
    dispatch(getFavouriteTeamAction());
  }, []);

  useEffect(() => {
    const username = sessionStorage.getItem('hasUsername');

    //logout if user does not set up username
    if (username === 'false' && location.pathname !== '/create-username') {
      dispatch(logoutAction({ forceLogout: true }));
    }
  }, [location]);

  return (
    <>
      {location.pathname === '/create-username' ? (
        <div className="main_body">{children} </div>
      ) : location.pathname === '/unity-editor' ? (
        <div className="editor">
          <div className="editor_container">{children} </div>
        </div>
      ) : (
        <div className="user_layout_body d-flex">
          <Sidebar data={children} />
        </div>
      )}
    </>
  );
}

export default SetTokenHeader(UserRouteLayout, axiosMain);
