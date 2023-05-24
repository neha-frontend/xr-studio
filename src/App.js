import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { guestRoutes, userRoutes } from './routes/mainRoutes/mainRoutes';
import { authenticationValidatorAction } from './store/sagaActions';
import { LayoutWrapper } from './components';
import BackDrop from './components/spinner/BackDrop';
import ScrollToTop from './components/scrollToTop/ScrollToTop';

import 'react-phone-input-2/lib/style.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { authToken } = useSelector((state) => state.auth.login);

  const dispatch = useDispatch();
  const currentUrl = location.pathname + location.search;

  let routes = [];

  if (authToken) routes = userRoutes;
  else routes = guestRoutes;

  const mainContent = routes.map((route) =>
    route.component ? (
      <Route
        key={route.name}
        path={route.path}
        exact={route.exact}
        name={route.name}
        element={<route.component />}
      />
    ) : (
      route.redirectRoute && <Route path="*" key={route.name} element={<Navigate to="/" />} />
    )
  );
  useEffect(() => {
    // create device ID
    if (!localStorage.getItem('deviceId')) {
      const tempId = navigator.userAgent + Math.floor(Math.random() * 10000000000000000);
      localStorage.setItem('deviceId', tempId.slice(tempId.lastIndexOf(')') + 1).trim(' '));
    }
    dispatch(authenticationValidatorAction());

    //if user is not loggedIn store invite link
    if (!authToken && currentUrl.includes('_branch_match_id')) {
      sessionStorage.setItem('joinTeam', currentUrl);
      location.href = '/login';
    }
  }, []);

  return (
    <Suspense fallback={<BackDrop open={true} />}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LayoutWrapper isAuthenticated={!!authToken} />}>
            {mainContent}
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
