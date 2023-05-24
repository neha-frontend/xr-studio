import { Link } from 'react-router-dom';

import SetTokenHeader from '../hoc/SetTokenHeader/SetTokenHeader';
import axiosMain from '../http/axios/axios_main';
import { LOGO } from '../assets/images';

import './index.scss';

function GuestRouteLayout({ children }) {
  return (
    <div className="main_body">
      <div className="header">
        <Link to="/">
          <img src={LOGO} alt="logo" className="logo_img" />
        </Link>
      </div>
      {children}
    </div>
  );
}

export default SetTokenHeader(GuestRouteLayout, axiosMain);
