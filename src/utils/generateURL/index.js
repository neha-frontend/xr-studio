const generateURL = (payload) => {
  let url = '';
  for (let key in payload) {
    if (payload[key]) {
      if (key.includes('none')) {
        url += payload[key] + '&';
      } else {
        url += key + '=' + payload[key] + '&';
      }
    }
  }
  return url.slice(0, -1);
};

export default generateURL;
