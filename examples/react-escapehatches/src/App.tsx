// @ts-nocheck
import React, { useState } from 'react';
import DOMPurify from 'dompurify';

function App() {
  const [data, setData] = useState('');
  const [currentValue, setCurrentValue] = useState(`Hello`);

  let divRender2 = React.createRef();

  function handleChange(event: {
    target: { value: React.SetStateAction<string> };
  }) {
    setCurrentValue(event.target.value);
  }

  function renderData() {
    console.log(`Rendering data in the div: ${currentValue}`);
    setData(currentValue);

    // divRender2.current.innerHTML = currentValue;
    divRender2.current.innerHTML = DOMPurify.sanitize(currentValue);
  }

  return (
    <>
      <h1>Escape Hatches Demo</h1>
      <label htmlFor="taData" className="label">
        The (malicious) data to render
      </label>
      <textarea
        id="taData"
        className="element"
        value={currentValue}
        onChange={handleChange}
      />
      <button id="btnRender" className="element" onClick={renderData}>
        Render data
      </button>

      <label htmlFor="divRender1" className="label mt-4">
        The <code>div</code> with the rendered data using built-in React
        escaping
      </label>
      <div id="divRender1" className="element divRender">
        {data}
      </div>

      <label htmlFor="divRender2" className="label mt-4">
        The <code>div</code> with the rendered data being put into the DOM using
        the native <code>InnerHTML</code> through a ref-based escape hatch
      </label>
      <div id="divRender2" className="element divRender" ref={divRender2} />
    </>
  );
}

export default App;
