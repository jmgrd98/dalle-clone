import { useState } from "react"

const Modal = ({ setModalOpen, selectedImage, setSelectedImage }: any) => {
    const [error, setError] = useState(null);

    const closeModal = () => {
      setModalOpen(false);
      setSelectedImage(null);
    };

  return (
    <div className="relative z-100 bg-white p-[10px] rounded-[10px] flex flex-col m-auto">
      <div onClick={closeModal}>X</div>

      <div className="img-container">
        {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Uploaded image" />}
      </div>

      <button className="w-full p-[20px] border-none bg-white active:bg-[#fafafc]">Generate</button>
    </div>
  )
}

export default Modal
