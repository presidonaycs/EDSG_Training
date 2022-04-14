/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { BiEditAlt } from 'react-icons/bi';
import { GiTrashCan } from 'react-icons/gi';
import ReactTooltip from 'react-tooltip';

import IsLoading from '../common/IsLoading';
// import SearchInput from '../inputs/SearchInput';
import LocationDetails from '../layouts/LocationDetails';
import TrainingMethodModal from "../layouts/TrainingMethodModal";

import notification from '../../utility/notification';
import { get, del } from '../../api-services/fetch';

const TrainingMethodSetup = ({ history }) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [details, setDetails] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  // const [searchText, setSearchText] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'EDSG - Training Method Setup';

    getRoleList({});
  }, []);

  const getRoleList = async ({ query = null }) => {
    console.log(query);
    setIsLoading(true);
    setErrorMsg('');
    const res = await get({ endpoint: 'method-setup', pQuery: { query }});

    console.log(res);

    if (res && res.status === 200) {
      const { data } = res;
      if (data.code === 1) {
        setDetails(data.data);
        if (data.data.length < 1) {
          if (query) {
            setErrorMsg('Method not found');
          } else {
            setErrorMsg('No Method yet');
          }
        }
      } else {
        setErrorMsg(data.message);
      }
    } else {
      setErrorMsg('Something has gone wrong. Please, try again.');
    }
    setIsLoading(false);
  };

  const showEditForm = (id) => {
    const selected = details.filter((item) => id === item.id);

    if (selected.length > 0) {
      setSelectedRecord(selected[0]);
      setShowFormModal(true);
    }
  };

  const closeModal = () => {
    setSelectedRecord([]);
    setShowFormModal(false);
  };

  const deleteItem = async (id, name) => {
    const confirmAction = confirm(`Click OK to confirm the deletion of "${name}"`);
    if (!confirmAction) return;
    setIsDeleting(true);
    const res = await del({ endpoint: 'method-setup', param: id });

    console.log(res);

    if (res && res.status === 200) {
      const { data } = res;
      if (data.code === 1) {
        notification({
          title: 'Successful Method Deletion',
          message: data.message,
          type: 'success'
        });
        const others = details.filter((item) => id !== item.id);
        setDetails(others);
      } else {
        notification({
          title: 'Method Deletion Error',
          message: data.message,
          type: 'danger'
        });
      }
    } else {
      notification({
        title: 'Network Error',
        message: 'Something went wrong while deleting a Method. Please, try again later.',
        type: 'danger'
      });
    }
    setIsDeleting(false);
  };

  // const handleSearch = async (e) => {
  //   const { name, value } = e.target;

  //   if (name === 'searchText') {
  //     setSearchText(value);
  //     console.log(value);
  //     await getRoleList({ query: value });
  //   }
  // };

  const updateList = (newItem, isUpdate) => {
    if (isUpdate) {
      const newList = details.map((item) => (item.id === newItem.id ? newItem : item));
      setDetails(newList);
    } else {
      if (details.length < 1) {
        getRoleList({});
      }
      const newList = [...details];
      newList.unshift(newItem);
      setDetails(newList);
    }
  };

  return (
    <div className="w-100">
      <div className="w-100 flex space-between flex-v-center m-b-20">
        <h3>Training Method Setup</h3>
        {/* <LocationDetails /> */}
      </div>
      <div className="table-view m-t-10">
        <div className="table-header">
          <div className="table-row">
            <div className="th"><p>Training Method</p></div>
            <div className="th"><p>Last Updated</p></div>
            <div className="th"><p>Last Updated By</p></div>
            <div className="th">
              <button className="add-button pointer" type="button" onClick={() => setShowFormModal(true)}>
                <RiAddLine />
                Add Method
              </button>
            </div>
          </div>
        </div>
        <div className="table-body">
          {!(isLoading || errorMsg) && details && details.map((item) => (
            <div className="table-row" key={item.id}>
              <div className="td" style={{ maxWidth: '350px' }}>{item.method}</div>
              <div className="td">{item.lastUpdated}</div>
              <div className="td">{item.lastUpdatedBy}</div>
              <div className="td actions">
                <button
                  data-tip
                  data-for="view-btn"
                  type="button"
                  className="pointer"
                  onClick={() => showEditForm(item.id)}
                >
                  <BiEditAlt />
                </button>
                <ReactTooltip id="view-btn" type="warning" effect="solid">
                  <span>Edit Method Details</span>
                </ReactTooltip>
                <button
                  data-tip
                  data-for="del-btn"
                  type="button"
                  className="m-l-10 del pointer"
                  onClick={() => deleteItem(item.id, item.method)}
                >
                  <GiTrashCan />
                </button>
                <ReactTooltip id="del-btn" type="error" effect="solid">
                  <span>Delete Method Details</span>
                </ReactTooltip>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isLoading && <div className="w-100 center-text p-20">Loading...</div>}
      {errorMsg && <div className="w-100 center-text p-20">{errorMsg}</div>}
      {(isLoading || isDeleting) && <IsLoading message={isDeleting ? 'Deleting...' : null} />}
      {showFormModal && (
        <TrainingMethodModal details={selectedRecord} updateList={updateList} closeModal={closeModal} />
      )}
    </div>
  );
};

export default TrainingMethodSetup;


