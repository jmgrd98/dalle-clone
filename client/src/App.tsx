import React, { useState } from 'react';
import Loader from './components/Loader';

function App() {

  const [images, setImages] = useState([]);
  const [value, setValue] = useState(null);
  const [error, setError] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const getImages = async () => {
    setLoading(true);
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
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (e: any) => {
    setLoading(true);
    const formData: any = new FormData();
    const file = e.target.files[0]
    formData.append('file', file);
    console.log(formData)
    setSelectedImage(e.target.files[0]);

    try {
      const options = {
        method: 'POST',
        body: formData,
    };
      const response = await fetch('http://localhost:5000/upload', options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-screen flex flex-col items-center p-10'>
      <section className='w-full flex flex-col gap-5 items-left'>
        <div className='flex gap-5'>
          <p className='text-gray-400'>Start with a detailed description
            <span
            //  onClick={surpriseMe()}
             className='ml-5 bg-gray-500/10 text-black font-bold py-1 px-5 rounded cursor-pointer hover:bg-gray-500/20'>Surprise me</span>
          </p>
        </div>

        <div className='flex items-center w-full'>
          <input 
            onChange={(e: any) => setValue(e.target.value)}
            className=' w-full shadow-lg rounded p-2'
            placeholder='An impressionist oil painting of a sunflower in a purple vase...'
            type='text'/>
          <button className={value ? 'bg-black text-white' : 'border-2 border-l-gray-500/20 shadow-lg'} onClick={getImages}>Generate</button>
        </div>
        <p className='m-auto cursor-pointer'>Or, <span>
          <label className='m-auto cursor-pointer' htmlFor='files'>Upload an image </label>
          <input onChange={(e) => uploadImage(e)} id='files' accept='image/*' type='file' hidden/>
        </span>
        to edit.
        </p>
        {error && <p>{error}</p>}
      </section>

      <section className='w-full flex flex-wrap gap-3 items-stretchgi m-20'>
        {loading && <Loader />}
        {images?.map((image: any, _index) => (
          <img key={_index} src={image.url} alt="Image" width={200} height={200} />
        ))}
      </section>
    </div>
  )
}

export default App;
