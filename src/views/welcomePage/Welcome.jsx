import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './welcome.scss';

const Welcome = () => {
  const [userLocation, setUserLocation] = useState({});
  const [address, setAddress] = useState('');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => console.error(error)
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  }, []);

  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation.latitude},${userLocation.longitude}&key=YOUR_API_KEY`
      )
        .then((res) => res.json())
        .then((data) => {
          const country = data?.results[0]?.address_components?.find((component) =>
            component?.types?.includes('country')
          );

          setAddress(country?.long_name);
        })
        .catch((error) => console.error(error));
    }
  }, [userLocation]);

  console.log(address);
  return (
    <>
      <div className="body welcome_body">
        <div className="welcome_title heading1">Hey, Welcome</div>
        <div className="welcome_desc">
          Lorem ipsum dolor sit amet consectetur. Urna malesuada lectus nibh aliquam rhoncus id ut
          id{' '}
        </div>
        <Link to="/create-account" className="start_btn heading2">
          Get Started
        </Link>
        <Link to="/login" className="create_btn heading2">
          I already have an account
        </Link>
      </div>
      <div className="footer heading3">
        <span>By creating an account, you agree to our </span>
        <Link to="/" className="footer_link">
          Terms & Conditions
        </Link>
        <span> and </span>
        <Link to="/" className="footer_link">
          Privacy Policy
        </Link>
        .
      </div>
    </>
  );
};

export default Welcome;
