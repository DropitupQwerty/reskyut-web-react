import React, { useEffect, useState } from 'react';

function App() {
  const time = 20;
  const [count, setCount] = useState(time);
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    if (isStart) {
      const timer = setInterval(() => {
        if (count > 0) {
          setCount(count - 1);
        } else {
          setCount('Times up');
          clearInterval(timer);
        }
      }, 1000);
    }
  }, [isStart]);

  return (
    <div className="App">
      <div>{count}</div>
      <button onClick={() => setIsStart(true)}> start </button>
      <button> pauze </button>
    </div>
  );
}

export default App;
