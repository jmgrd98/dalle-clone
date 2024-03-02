import { useState } from 'react'

function App() {

  const getImages = async () => {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          message: "BLugh",
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch('http://localhost:5000/images', options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section>
        <p className='text-gray-400'>Start with a detailed description

          <span className='bg-gray-400 text-black font-bold'>Surprise me</span>
        </p>

        <div>
          <input placeholder='An impressionist oil painting of a sunflower in a purple vase...' type='text'></input>
          <button onClick={getImages}>Generate</button>
        </div>
      </section>

      <section>

      </section>
    </>
  )
}

export default App
