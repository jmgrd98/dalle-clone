import { useRef, useState } from "react"

const Modal = ({ setModalOpen, selectedImage, setSelectedImage, generateVariations }: any) => {
    const [error, setError] = useState('');
    const ref: any = useRef(null);

    const closeModal = () => {
      setModalOpen(false);
      setSelectedImage(null);
    };

    const checkSize = () => {
      if (ref.current.width == 256 && ref.current.height == 256) {
        generateVariations();
      } else {
        setError('Error: choose 256x256');
      }
    };

  return (
    <div className="relative z-100 bg-white p-[10px] rounded-[10px] flex flex-col m-auto">
      <div onClick={closeModal} className="cursor-pointer">X</div>

      <div className="h-[256px] w-[256px] overflow-hidden">
        {selectedImage && <img ref={ref} src={URL.createObjectURL(selectedImage)} alt="Uploaded image" />}
      </div>
      <p>{error || '*Image must be 256x256'}</p>
      {!error && <button onClick={checkSize} className="w-full p-[20px] border-none bg-black active:bg-[#fafafc]">Generate</button>}
      {error && <button className='bg-black text-white' onClick={closeModal}>Close this and try again</button>}
    </div>
  )
}

export default Modal
