import { useState } from 'react';
import Loader from './components/Loader';
import Modal from './components/Modal';
import axios from 'axios';

function App() {

  const [images, setImages] = useState([]);
  const [value, setValue] = useState('');
  const [error, setError] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
    setModalOpen(true);
    setSelectedImage(e.target.files[0]);
    e.target.value = null;

    try {
      const options = {
        method: 'POST',
        body: formData,
    };
      const response = await fetch('http://localhost:5000/upload', options);
      const data = await response.json();
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const surpriseMe = async () => {
      setImages([]);

     try {
      const response = await axios.post('http://localhost:5000/surprise-me');
      setValue(response.data.choices[0].message.content);
     } catch (error) {
      console.error(error);
     }
  };

  const generateVariations  = async () => {
    setImages([]);
    if (selectedImage === null) {
      setError('Error! Must have an existing image');
      setModalOpen(false);
      return;
    }

    try {
      const options = {
        method: 'POST',
      }
      const response = await fetch('http://localhost:5000/variations', options);
      console.log(response)
      const data = await response.json();
      console.log(data)
      setImages(data);
      setError('');
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-screen flex flex-col items-center p-10'>
      <section className='w-full flex flex-col gap-5 items-left'>
        <div className='flex gap-5'>
          <p className='text-gray-400'>Start with a detailed description
            <span
             onClick={surpriseMe}
             className='ml-5 bg-gray-500/10 text-black font-bold py-1 px-5 rounded cursor-pointer hover:bg-gray-500/20'>Surprise me</span>
          </p>
        </div>

        <div className='flex items-center w-full'>
          <input
            value={value!}
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
        {modalOpen && (
          <div className='absolute top-0 left-0 w-screen h-screen bg-black/20 overflow-hidden flex items-center justif-center z-10'>
            <Modal 
              setModalOpen={setModalOpen}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage} 
              generateVariations={generateVariations}  
            />
          </div>
        )}
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
