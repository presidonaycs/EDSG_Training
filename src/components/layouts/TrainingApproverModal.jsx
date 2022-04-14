import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import Cookies from "js-cookie";

import { IoMdClose } from 'react-icons/io';

// import SuccessModal from "./SuccessModal";
import Loader from '../../assets/svg/loading.svg';
import TextInput from '../inputs/TextInput';
import { toggleScroll } from '../../utility/general';
import notification from '../../utility/notification';
import { put, post, get } from '../../api-services/fetch';
import SelectInput from '../inputs/SelectInput';

const TrainingApproverModal = ({ closeModal, updateList, details }) => {
  const [sequence, setSequence] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);

  const [formType, setFormType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    toggleScroll();
    if (details && details.id) {
      setFormType('edit');
      setRole(details.roleId);
      setSequence(details.sequence);
    } else {
      setFormType('create');
    }

    getRoles();
    return () => setTimeout(() => {
      toggleScroll();
    }, 0);
  }, [details]);

  const getRoles = async () => {
    const res = await get({ endpoint: '/ApproverSetup/roles' });
    console.log(res);
    if (res && res.status === 200) {
      const { data } = res;
      if (data.code === 1) {
        const roleList = data.data.map(({ name, id }) => ({ name, value: id }));
        setRoles(roleList);
      } else {
        notification({
          title: 'Error getting List of Roles',
          message: data.message,
          type: 'danger'
        });
      }
    } else {
      notification({
        title: 'Error getting List of Roles',
        message: 'Something has gone wrong. Please, try again.',
        type: 'danger'
      });
    }
  };

  const validateForm = () => {
    if (!role) return 'Please, select a role';
    if (!sequence) return 'Please, enter a Sequence number';
    return null;
  };

  const submitForm = async () => {
    const body = {
      sequence: Number(sequence),
      roleId: Number(role)
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
      ? await post({ endpoint: 'approval-setup', body })
      : await put({ endpoint: 'approval-setup', body });
    console.log(res);
    setIsLoading(false);

    if (res && res.status === 200) {
      const { data } = res;
      if (data.code === 1) {
        notification({
          title: `Successful Sequence ${formType === 'create' ? 'Creation' : 'Update'}`,
          message: data.message,
          type: 'success'
        });
        const selectedRole = roles.filter((item) => item.value === Number(role));
        updateList({
          id: formType === 'edit' ? body.id : data.data,
          roleId: role,
          role: selectedRole[0].name,
          sequence,
          lastUpdated: moment().format('DD-MMM-YYYY hh:mm:ss A'),
          lastUpdatedBy: Cookies.get("fullname")
        }, formType === 'edit');
        if (formType === 'edit') {
          closeModal();
          return;
        }
        setSequence('');
      } else {
        notification({
          title: `Sequence ${formType === 'create' ? 'Creation' : 'Update'} Error`,
          message: data.message,
          type: 'danger'
        });
      }
    } else {
      notification({
        title: 'Network Error',
        message: `Something went wrong while ${formType === 'create' ? 'creating' : 'updating'} an Sequence. Please, try again later.`,
        type: 'danger'
      });
    }
  };

  return (
    <div className="overlay">
      <IoMdClose className="close-btn pointer" onClick={closeModal} />
      <div className="modal-box max-w-400">
        <div className="content">
          <SelectInput
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-100 m-b-10"
            label="Select Role*"
            options={roles || []}
          />
          <TextInput
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            className="w-100 m-b-10"
            label="Sequence*"
          />
          <button
            type="button"
            className="btn btn-large w-100"
            onClick={submitForm}
            disabled={isLoading}
          >
            {!isLoading && `${formType === 'create' ? 'Add' : 'Update'} Sequence`}
            {isLoading && `${formType === 'create' ? 'Adding' : 'Updating'} Sequence...`}
            {isLoading && <img src={Loader} className="btn-loading" alt="Loading..." />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingApproverModal;
