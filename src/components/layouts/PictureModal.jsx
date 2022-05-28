import React from 'react';
import { IoMdClose } from 'react-icons/io';


const PictureModal = (props) =>{

    const closeModal = () =>{
        props.closeModal();
    }

    return(

        <div className="overlay">
      <IoMdClose className="close-btn pointer" onClick={closeModal} />
      <div className="modal-box w-50">
        <div className="content flex flex-h-center">
            <div className='  flex-v-center'>
                <img className='w-100' src={props.picture} alt="image" />
            </div>
        </div>
</div>
</div>


    )
}

export default PictureModal;