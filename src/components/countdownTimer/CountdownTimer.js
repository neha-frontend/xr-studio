import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sendOtpAction } from '../../store/sagaActions';

import styles from './countdownTimer.module.scss';

const CountdownTimer = ({ data }) => {
  const { resendDuration } = useSelector((state) => state.auth.otp);

  const dispatch = useDispatch();
  const [count, setCount] = useState(resendDuration);

  const updateTimer = (timer) => {
    setCount(timer);
  };

  const handleResendOtp = (userData) => {
    dispatch(sendOtpAction({ data: userData ,updateTimer }));
  };

  useEffect(() => {
    let intervalId = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [count]);

  return (
    <>
      {count > 0 ? (
        <div className={styles.resend_otp}>
          Resend in <span className={styles.count}>{count} sec</span>
        </div>
      ) : (
        <div className={styles.resend_otp}>
          Didn’t receive a code?
          <span onClick={() => handleResendOtp(data)} className={styles.resend_text}>
            Resend it
          </span>
        </div>
      )}
    </>
  );
};

export default CountdownTimer;
