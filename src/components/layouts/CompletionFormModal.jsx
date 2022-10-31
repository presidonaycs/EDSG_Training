import React, { useEffect, useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import { BsUpload } from 'react-icons/bs';
import {BiImage} from 'react-icons/bi';
import Loader from '../../assets/svg/loading.svg';
import TextInput from '../inputs/TextInput';
import { toggleScroll } from '../../utility/general';
import notification from '../../utility/notification';
import { put } from '../../api-services/fetch';
import TextareaInput from '../inputs/TextareaInput';
import { uploadDocument } from '../../api-services/otherApis';

const CompletionFormModal = ({ closeModal, requestId }) => {
  const [documentName, setDocumentName] = useState('');
  const [comment, setComment] = useState('');
  const [certFile, setCertFile] = useState('');
  const [certUrl, setCertUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formType = 'create'

  useEffect(() => {
    toggleScroll();

    return () => setTimeout(() => {
      toggleScroll();
    }, 0);
  }, []);

  const validateForm = () => {
    if (!documentName) return 'Please, enter a name for the completion certificate';
    if (!comment) return 'Please, enter a name for the Completion Remark';
    if (!certUrl) return 'Please, upload a certificate of completion';
    return null;
  };

  const submitForm = async () => {
    const error = validateForm();

    if (error) {
      notification({
        title: 'Invalid Entry',
        message: error,
        type: 'danger'
      });
      return;
    }

    let documentPath = '';
    setIsLoading(true);

    if (certUrl) {
      const form = new FormData();
      form.append('files', certFile);

      notification({
        title: 'Uploading Documents',
        message: 'Currently uploading the attached certificate...',
        type: 'info'
      });

      const response = await uploadDocument(form);

      console.log(response);

      if (response && response.status === 200) {
        if (response.data.code === 1) {
          documentPath = response.data.doclink;
          notification({
            title: 'Successful Certificate Upload',
            message: 'You have successfully uploaded the certificate of completion for this training',
            type: 'success'
          });
        } else {
          notification({
            title: 'Certificate Upload Failed',
            message: response.data.message,
            type: 'danger'
          });
        }
      } else {
        notification({
          title: 'Certificate Upload Failed',
          message: 'Something went wrong while uploading the certificate of completion. Please, try again later.',
          type: 'danger'
        });
      }
    }

    const payload = {
      id: requestId,
      comment,
      certification: documentName,
      certificationPath: documentPath
    };

    notification({
      title: 'Submitting Completion Details',
      message: 'Currently submitting your certificate details. Please wait...',
      type: 'info'
    });

    const res = await put({ endpoint: '/Request/closetraining', body: payload });;

    console.log(res);
    setIsLoading(false);

    if (res && res.status === 200) {
      const { data } = res;
      if (data.code === 1) {
        notification({
          title: `Successful Training ${formType === 'create' ? 'Completion' : 'Update'}`,
          message: data.message,
          type: 'success'
        });
        resetForm();
        window.location.reload();
      } else {
        notification({
          title: `Training ${formType === 'create' ? 'Completion' : 'Update'} Error`,
          message: "Closing action not allowed, because the training is still on-going",
          type: 'danger'
        });
      }
    } else {
      notification({
        title: 'Network Error',
        message: `Something went wrong while ${formType === 'create' ? 'closing' : 'updating'} a Training. Please, try again later.`,
        type: 'danger'
      });
    }
  };

  const resetForm = () => {
    setDocumentName('');
    setComment('')
    setCertUrl('');
    setCertFile(null);
  }

  const uploadProfilePix = () => {
    const uploadField = document.getElementById('image-upload');

    uploadField.click();
    uploadField.onchange = async () => {
      if (!uploadField.files[0]) return;
      const { type, size } = uploadField.files[0];
      const supportedTypes = ['jpeg', 'png', 'gif'];
      const fileType = type.slice(type.indexOf('/') + 1);

      if (size / 1024 > 500) {
        notification({
          title: 'File Too Large',
          message: 'The file size must not be more than 500KB',
          type: 'danger'
        });
        return;
      }
      if (!supportedTypes.includes(fileType)) {
        notification({
          title: 'Invalid File Type',
          message: 'Invalid file format. Supported file types are jpeg, png and gif.',
          type: 'danger'
        });
        return;
      }
      const imageUrl = URL.createObjectURL(uploadField.files[0]);

      setCertFile(uploadField.files[0]);
      setCertUrl(imageUrl);
    };
  };

  return (
    <div className="overlay">
      <IoMdClose className="close-btn pointer" onClick={closeModal} />
      <div className="modal-box max-w-400">
        <div className="content">
          <TextInput
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            className="w-100 m-b-10"
            label="Certificate Name*"
          />
          <TextareaInput
            value={comment}
            rows={5}
            onChange={(e) => setComment(e.target.value)}
            className="w-100 m-b-10"
            label="Completion Remark*"
          />
          <button
            type="button"
            className="btn w-100 btn-large flex flex-v-center space-between m-b-5"
            onClick={uploadProfilePix}
          >
            <BsUpload style={{ color: '#fff' }} />
            Upload Certificate
            <input type="file" hidden id="image-upload" />
          </button>
          <div className='m-10'><i>Max File Size:</i> 500KB</div>
          {certUrl && <img className="m-b-10 w-100" src={certUrl} alt="upload certificate..." />}
          
          <button
            type="button"
            className="btn btn-large w-100"
            onClick={submitForm}
            disabled={isLoading}
          >
            Submit Completion Certificate
            {isLoading && <img src={Loader} className="btn-loading" alt="Loading..." />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionFormModal;
