import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import Cookies from "js-cookie";

import { IoMdClose } from 'react-icons/io';

// import SuccessModal from "./SuccessModal";
import Loader from '../../assets/svg/loading.svg';
import TextInput from '../inputs/TextInput';
import { toggleScroll } from '../../utility/general';
import notification from '../../utility/notification';
import { put, post } from '../../api-services/fetch';

const TrainingCategoryModal = ({ closeModal, updateList, details }) => {
  const [category, setCategory] = useState('');

  const [formType, setFormType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    toggleScroll();
    if (details && details.id) {
      setFormType('edit');
      setCategory(details.category);
    } else {
      setFormType('create');
    }

    return () => setTimeout(() => {
      toggleScroll();
    }, 0);
  }, [details]);

  const validateForm = () => {
    if (!category) return 'Please, enter a name for the Category';
    return null;
  };

  const submitForm = async () => {
    const body = {
      category
    };
    const error = validateForm(body);

    if (error) {
      notification({
        title: 'Invalid Entry',
        message: error,
        type: 'danger'
      });
      return;
    }

    if (details && details.id) {
      body.id = details.id;
    } 
    setIsLoading(true);
    const res = formType === 'create'
      ? await post({ endpoint: 'category-setup', body })
      : await put({ endpoint: 'category-setup', body });
    console.log(res);
    setIsLoading(false);

    if (res && res.status === 200) {
      const { data } = res;
      if (data.code === 1) {
        notification({
          title: `Successful Category ${formType === 'create' ? 'Creation' : 'Update'}`,
          message: data.message,
          type: 'success'
        });
        updateList({
          id: formType === 'edit' ? body.id : data.data,
          category,
          lastUpdated: moment().format('DD-MMM-YYYY hh:mm:ss A'),
          lastUpdatedBy: Cookies.get("fullname")
        }, formType === 'edit');
        if (formType === 'edit') {
          closeModal();
          return;
        }
        setCategory('');
      } else {
        notification({
          title: `Category ${formType === 'create' ? 'Creation' : 'Update'} Error`,
          message: data.message,
          type: 'danger'
        });
      }
    } else {
      notification({
        title: 'Network Error',
        message: `Something went wrong while ${formType === 'create' ? 'creating' : 'updating'} an Category. Please, try again later.`,
        type: 'danger'
      });
    }
  };

  return (
    <div className="overlay">
      <IoMdClose className="close-btn pointer" onClick={closeModal} />
      <div className="modal-box max-w-400">
        <div className="content">
          <TextInput
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-100 m-b-10"
            label="Training Category*"
          />
          <button
            type="button"
            className="btn btn-large w-100"
            onClick={submitForm}
            disabled={isLoading}
          >
            {!isLoading && `${formType === 'create' ? 'Create' : 'Update'} Category`}
            {isLoading && `${formType === 'create' ? 'Creating' : 'Updating'} Category...`}
            {isLoading && <img src={Loader} className="btn-loading" alt="Loading..." />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingCategoryModal;
