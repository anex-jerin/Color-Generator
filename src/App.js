import React, { useState } from 'react';
import './App.css';

import Values from 'values.js';

const App = () => {
  const [color, setColor] = useState('');
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log('hello');
      let colors = new Values(color).all(10);
      setList(colors);
    } catch (error) {
      setError(true);
      console.log(error.message);
    }
  };
  return (
    <section className='main'>
      <h1 className='header'>
        Color <span className='color'>Generator</span>{' '}
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          className={`${error ? 'error' : 'input'}`}
          type='text'
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder='#181D31'
        />
        <button className='btn' type='submit'>
          submit
        </button>
      </form>
      <section className='list'>
        {list.map((color, index) => {
          console.log(color);
          const { type, rgb, weight, hex } = color;
          return (
            <div className='card' key={index}>
              <div
                style={{ backgroundColor: `#${hex}` }}
                className={`color-pallate ${index > 10 && 'light'}`}
              >
                <h1 title='click to copy' className='copy' onClick={() => {
                  navigator.clipboard.writeText(`#${hex}`)
                }}>
                  #{hex}{' '}
                </h1>
                <h3>
                  {type} {weight}%
                </h3>
              </div>
            </div>
          );
        })}
      </section>
    </section>
  );
};

export default App;
