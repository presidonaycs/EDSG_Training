import React from 'react';
import { IoMdClose } from 'react-icons/io';

import TextInput from '../inputs/TextInput';

const AssessmentForm = ({ closeModal }) => {
  const submitForm = () => {
    console.log('Work in Progress...');
  };

  return (
    <div className="overlay">
      <IoMdClose className="close-btn pointer" onClick={closeModal} />
      <div className="modal-box max-w-400">
        <div className="content">
          <TextInput className="w-100 m-b-10" label="Assessment Question" />
          <button
            type="button"
            className="btn btn-large w-100"
            onClick={submitForm}
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentForm;
