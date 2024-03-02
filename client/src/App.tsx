import { useState } from 'react'

function App() {

  return (
    <>
      <section>
        <p className='text-gray-400'>Start with a detailed description

          <span className='bg-gray-400 text-black font-bold'>Surprise me</span>
        </p>

        <div>
          <input placeholder='An impressionist oil painting of a sunflower in a purple vase...' type='text'></input>
          <button>Generate</button>
        </div>
      </section>

      <section>

      </section>
    </>
  )
}

export default App
