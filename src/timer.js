import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';
import { resetPassword } from './firebase/auth';

export const Timer = ({ email }) => {
  const Ref = useRef(null);
  const [timer, setTimer] = useState('00:00');
  const [disable, setDisble] = useState(false);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);

    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    setTimer('00:60');
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 60);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const onClickReset = () => {
    clearTimer(getDeadTime());
    resetPassword(email);
  };

  return (
    <div>
      <Button disabled={timer !== '00:00'} onClick={onClickReset}>
        Resend ({timer})
      </Button>
    </div>
  );
};

export default Timer;
