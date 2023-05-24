import axios from 'axios';

const axiosMain = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

export const setBaseUrl = (baseUrl) => {
  axiosMain.defaults.baseURL = baseUrl;
};

export default axiosMain;

// import axios from 'axios';

// const axiosMain = axios.create({
//   baseURL: process.env.REACT_APP_END_POINT_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// export default axiosMain;
