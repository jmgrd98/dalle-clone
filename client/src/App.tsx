import { useState } from 'react';

function App() {

  const [images, setImages] = useState([]);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const getImages = async () => {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          message: value,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch('http://localhost:5000/images', options);
      const data = await response.json();
      setImages(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-screen flex flex-col items-center p-10'>
      <section className='w-full flex flex-col gap-3 items-center'>
        <div className='flex gap-5 items-center'>
          <p className='text-gray-400'>Start with a detailed description

            <span className='ml-5 bg-gray-400 text-black font-bold p-[5px] rounded'>Surprise me</span>
          </p>
        </div>

        <div className='flex gap-5 items-center justify-center text-center w-full'>
          <input onChange={(e: any) => setValue(e.target.value)} className='bg-gray-200 border-2 w-full border-black rounded p-2' placeholder='An impressionist oil painting of a sunflower in a purple vase...' type='text'></input>
          <button className='border-black border-2' onClick={getImages}>Generate</button>
        </div>
        <p className=''>Or, <span>
          <label for='files'>Upload an image </label>
          <input id='files' accept='image/*' type='file' hidden></input>
        </span>
        to edit.
        </p>
        {error && <p>{error}</p>}
      </section>

      <section className='w-full flex flex-wrap gap-3 items-stretch m-20'>
        {images?.map((image: any, _index) => (
          <img key={_index} src={image.url} alt="Image" width={200} height={200} />
        ))}
      </section>
    </div>
  )
}

export default App
