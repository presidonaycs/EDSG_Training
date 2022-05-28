import React, { useState, useEffect } from 'react';
import { BsUpload } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
import Cookies from 'js-cookie';
import axios from "axios";
// import Cookies from 'js-cookie'

import { get, put, post } from '../../api-services/fetch';
import { convertImgToBase64, formatFileUrl } from '../../utility/general';
import Loader from '../../assets/svg/loading.svg';
import { formatDateforPicker, getDaysFromDate } from '../../utility/dateTime';
import Select from "react-select";
import TextareaInput from '../inputs/TextareaInput';
import TextInput from '../inputs/TextInput';
import notification from '../../utility/notification';
import { uploadDocument } from '../../api-services/otherApis';
import SelectInput from '../inputs/SelectInput';

const TrainingRequestForm = ({ details, closeForm }) => {
  const [category, setCategory] = useState('');
  const [method, setMethod] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [impactOnOrganisation, setImpactOnOrganisation] = useState('');
  const [impactOnindividual, setImpactOnindividual] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [organisingBody, setOrganisingBody] = useState('');
  const [location, setLocation] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [approversOptions, setApproversOptions] = useState([]);
  const [approvers, setApprovers] = useState([])
  const [firstApproverOptions, setFirstApproverOptions] = useState([])
  const [secondApproverOptions, setSecondApproverOptions] = useState([])
  const [firstApprover, Options] = useState('')
  const [secondApprover, setSecondApprover] = useState('')
  const [approverId, setApproverId] = useState({})
  const [secondApproverId, setSecondApproverId] = useState(0)
  const [employees, setemployees] = useState([])
  const [employeeList, setEmployeeList] = useState([])
  const [employeeName, setemployeeName] = useState('')
  const [mdaList, setMdaList] = useState([])
  const [recipientMda, setrecipientMda] = useState()
  
  
  




  

  const [dtaExpense, setDtaExpense] = useState(null);
  const [transportationExpense, setTransportationExpense] = useState(null);
  const [localTransportationExpense, setLocalTransportationExpense] = useState(null);
  const [journalPublicationExpense, setJournalPublicationExpense] = useState(null);
  const [subscriptionExpense, setSubscriptionExpense] = useState(null);
  const [contingenciesExpense, setContingenciesExpense] = useState(null);
  const [userId, setUserId] = useState(Number(Cookies.get('userId')))

  const [personalExpense, setPersonalExpense] = useState(null);

  const [fileArray, setFileArray] = useState([]);
  const [b64FileArray, setB64FileArray] = useState([]);
  const [uploadedDocuments, setUploadedDocuments] = useState('');

  const [formType, setFormType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categories, setCategories] = useState([]);
  const [methods, setMethods] = useState([]);

const BASE_API_URL= `https://edogoverp.com/services/api`


  useEffect(() => {
    window.scrollTo(0, 0);
    getMdas()

    if (details && details.id) {
      setFormType('edit');
      setCategory(details.learningCategoryId || '');
      setMethod(details.learningMethodId || '');
      setTitle(details.title || '');
      setDescription(details.details || '');
      setImpactOnindividual(details.impactOnindividual || '');
      setImpactOnOrganisation(details.impactOnOrganisation || '');
      setStartDate((details.startDate && formatDateforPicker(details.startDate)) || '');
      setEndDate((details.endDate && formatDateforPicker(details.endDate)) || '');
      setOrganisingBody(details.organisingBody || '');
      setLocation(details.location || '');
      setTotalCost(details.totalCost || '');
      setPersonalExpense(details.personalExpense || '');
      setTransportationExpense(details.personalExpense || '');
      setContingenciesExpense(details.contingenciesExpense || '');
      setSubscriptionExpense(details.subscriptionExpense || '');
      setTransportationExpense(details.personalExpense || '');
      setJournalPublicationExpense(details.journalPublicationExpense || '');
      setLocalTransportationExpense(details.localTransportationExpense || '');
      setDtaExpense(details.dtaExpense || '');
      setUploadedDocuments(details.documentPath || '');
      setApproverId(details.setFirstSupervisorId || 0);

      
      
    } else {
      setFormType('create');
    }

    getCategories();
    getMethods();
  }, [details]);


  const handleApproverId =(e)=>{
    setApprovers(e)
    console.log(e)
  }
  const getMdas = ()=>{
    axios
    .get(`${BASE_API_URL}/Employees/mdas`)
    .then((response) => {
        
        console.log("--mdas--")
        console.log(response?.data)
        // this.setState({
          const roleList = response?.data.map((item) => ({
            name: `${item.name}`,
            value: item.id,
          }));
          setMdaList(roleList)
           
        // });
    })
  }

  const getEmployeesFromMda = (id)=>{
    axios
    .get(`${BASE_API_URL}/Employees/employees_by_mda?mdaid=${id}`)
    .then((response) => {
        
        console.log("--employeesByNads--")
        console.log(response?.data)
        // this.setState({
          const roleList = response?.data.map((item) => ({
            name: `${item.name}`,
            value: item.id,
          }));
        setemployees(roleList.filter((item)=>{return !item.name.includes(Cookies.get('fullname'))}));

          // setMdaList(roleList)
           
        // });
    })
  }


  useEffect(()=>{
    console.log(approverId)
      setApproverId(approvers.map((item)=>(
        {
          
            id: 0,
            roleId: 0,
            userId : item.value,
            sequence: 0
          
        }
      )
    ))
  }, [approvers])


  const handleApprovers = async (param) =>{
    const res = await get({ endpoint: `/Request/searchemployee/${param}` })
    console.log(res);
    res?.data && setApproversOptions(res?.data?.map((item)=>({label:item.name, value:item.id})).filter((item)=>{ return !item.label.includes(Cookies.get('fullname'))}))
  }

  

  // const setSApprover = async (param) =>{
  //   const res = await get({ endpoint: `/Request/searchemployee/${param}` })
  //   console.log(res);
  //   setSecondApproverOptions(res?.data?.map((item)=>({label:item.name, value:item.id})))
  // }

  
  const getCategories = async () => {
    const res = await get({ endpoint: '/Request/categories' });
    console.log(res);

    if (res && res.status === 200) {
      const { data } = res;
      if (data.code === 1) {
        const roleList = data.data
          .map((item) => ({ name: item.name, value: item.id }));
        console.log(roleList);
        setCategories(roleList);
      } else {
        notification({
          title: 'Error Getting Categories',
          message: data.message,
          type: 'danger'
        });
      }
    } else {
      notification({
        title: 'Network',
        message: 'Something has gone wrong while trying to get list of categories. Please, try again.',
        type: 'danger'
      });
    }
  };

  const getMethods = async () => {
    const res = await get({ endpoint: '/Request/methods' });
    console.log(res);

    if (res && res.status === 200) {
      const { data } = res;
      if (data.code === 1) {
        const roleList = data.data
          .map((item) => ({ name: item.name, value: item.id }));
        console.log(roleList);
        setMethods(roleList);
      } else {
        notification({
          title: 'Error Getting Methods',
          message: data.message,
          type: 'danger'
        });
      }
    } else {
      notification({
        title: 'Network',
        message: 'Something has gone wrong while trying to get list of methods. Please, try again.',
        type: 'danger'
      });
    }
  };

  const validateForm = () => {
    if (!category) return 'Please, select a category for the request';
    if (!method) return 'Please, select a method for the request';
    if (!title) return 'Please, enter a title for the request';
    if (!description) return 'Please, enter a description for the request';
    if (!impactOnindividual) return 'Please, enter expected impact on individual for the request';
    if (!impactOnOrganisation) return 'Please, enter expected impact on organisation name for the request';
    if (!startDate) return 'Please, enter a start date for the request';
    if (getDaysFromDate(startDate) < 0) return 'Start date must not be behind today';
    if (!endDate) return 'Please, enter a end date for the request';
    if(approverId.length < 1) return 'Please select at least one approver fo the request.'
    // if (getDaysFromDate(endDate) < 0) return 'end date must not be beyond today';
    if (!organisingBody) return 'Please, enter an organising body for the request';
    if (!location) return 'Please, enter a location for the training';
    // if (!totalCost) return 'Please, enter the training cost';
    // if (!personalExpense) return 'Please, enter personal expense for the request';
    return null;
  };

  const formHasValue = () => {
    if (category) return true;
    if (method) return true;
    if (title) return true;
    if (description) return true;
    if (impactOnindividual) return true;
    if (impactOnOrganisation) return true;
    if (startDate) return true;
    if (endDate) return true;
    if (organisingBody) return true;
    if (location) return true;
    if (totalCost) return true;
    if (personalExpense) return true;
    if (fileArray.length) return true;
    return false;
  };

  const submitForm = async (type) => {

    console.log(approverId);
 

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
    if (fileArray.length > 0) {
      // upload documents then update the request details
      setIsSubmitting(true);
      notification({
        title: 'Uploading Documents',
        message: 'Currently uploading the attached document...',
        type: 'info'
      });
      console.log(fileArray[0]);

      const body = new FormData();
      body.append('files', fileArray[0]);

      const response = await uploadDocument(body);

      console.log(response);
      if (response && response.status === 200) {
        if (response.data.code === 1) {
          documentPath = response.data.doclink;
          notification({
            title: 'Successful Document Upload',
            message: 'You have successfully uploaded the documents for this request',
            type: 'success'
          });
        } else {
          notification({
            title: 'Document Upload Failed',
            message: response.data.message,
            type: 'danger'
          });
        }
      } else {
        notification({
          title: 'Network Error',
          message: 'Something went wrong while uploading the documents for this request. Please, try again later.',
          type: 'danger'
        });
      }
    }

    const payload = {
      learningCategoryId: Number(category),
      learningMethodId: Number(method),
      startDate,
      endDate,
      title,
      transportationExpense: +transportationExpense || 0,
      localTransportationExpense: +localTransportationExpense || 0,
      journalPublicationExpense: +journalPublicationExpense || 0,
      subscriptionExpense: +subscriptionExpense || 0,
      contingenciesExpense: +contingenciesExpense || 0,
      dtaExpense: +dtaExpense || 0,
      organisingBody,
      details: description,
      location,
      approvers:approverId,
      impactOnindividual,
      impactOnOrganisation,
      documentPath: documentPath || uploadedDocuments || '',
      personalExpense: +personalExpense || 0,
      totalCost: Number(totalCost)
    };

    if (details && details.id) {
      payload.id = details.id;
    }

    notification({
      title: `${type === 'save' ? 'Saving' : 'Submitting'} Training Request`,
      message: 'Currently submitting your training request. Please wait...',
      type: 'info'
    });

    setIsSubmitting(true);
    let res = null;

    if (type === 'save') {
      res = formType === 'create'
        ? await post({ endpoint: '/Request/saverequest', body: payload })
        : await put({ endpoint: '/Request/updaterequest', body: payload });
    } else if (type === 'submit') {
      res = formType === 'create'
        ? await post({ endpoint: '/Request/saveandsubmitrequest', body: payload })
        : await put({ endpoint: '/Request/submitrequest', body: payload });
    } else {
      return;
    }

    console.log(res);
    setIsSubmitting(false);

    if (res && res.status === 200) {
      const { data } = res;
      if (data.code === 1) {
        notification({
          title: `Successful Request ${formType === 'create' ? 'Creation' : 'Update'}`,
          message: data.message,
          type: 'success'
        });
        resetForm();
         window.location.reload();
      } else {
        notification({
          title: `Request ${formType === 'create' ? 'Creation' : 'Update'} Error`,
          message: data.message,
          type: 'danger'
        });
      }
    } else {
      notification({
        title: 'Network Error',
        message: `Something went wrong while ${formType === 'create' ? 'creating' : 'updating'} an Request. Please, try again later.`,
        type: 'danger'
      });
    }
  };

  const handleFilesUpload = async () => {
    const uploadField = document.getElementById('image-upload');

    uploadField.click();
    uploadField.onchange = async () => {
      if (!uploadField.files[0]) return;
      const { type, size } = uploadField.files[0];
      console.log(type, size, uploadField.files[0]);

      const supportedTypes = [
        'jpeg', 'png', 'gif', 'pdf',
        'vnd.openxmlformats-officedocument.wordprocessingml.document', 'doc',
        'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      const fileType = type.slice(type.indexOf('/') + 1);

      console.log(uploadedDocuments, b64FileArray.length);
      if (uploadedDocuments || b64FileArray.length > 0) {
        notification({
          title: 'File Limit Exceeded',
          message: 'You can only upload one document for your training request.',
          type: 'danger'
        });
        return;
      }
      if (!supportedTypes.includes(fileType)) {
        notification({
          title: 'Invalid File Type',
          message: 'Invalid file format. Supported file types are pdf, docx, doc, xlsx, jpeg, png and gif',
          type: 'danger'
        });
        return;
      }
      if (size / 1024 >  500000 ) {
        notification({
          title: 'File Too Large',
          message: 'The file size must not be more than 500MB',
          type: 'danger'
        });
        return;
      }
      const fileBase64 = await convertImgToBase64(uploadField.files[0]);
      const b64FileSet = new Set(b64FileArray);
      const setSize = b64FileSet.size;
      const newFileList = [...fileArray];

      b64FileSet.add(fileBase64);

      if (setSize < b64FileSet.size) {
        newFileList.push(uploadField.files[0]);
      }

      setB64FileArray([...b64FileSet]);
      setFileArray(newFileList);
    };
  };

  const handleFileDelete = async (index) => {
    console.log(b64FileArray, fileArray);
    const newB64list = b64FileArray.filter((val, i) => i !== index);
    const newFileArray = fileArray.filter((val, i) => i !== index);

    setB64FileArray(newB64list);
    setFileArray(newFileArray);
  };

  const resetForm = () => {
    setCategory('');
    setMethod('');
    setTitle('');
    setDescription('');
    setImpactOnindividual('');
    setImpactOnOrganisation('');
    setStartDate('');
    setEndDate('');
    setOrganisingBody('');
    setLocation('');
    setTotalCost(null);
    setPersonalExpense(null);
    setUploadedDocuments('');
    setFileArray([]);
    setB64FileArray([]);
    setDtaExpense(null);
    setTransportationExpense(null);
    setLocalTransportationExpense(null);
    setJournalPublicationExpense(null);
    setSubscriptionExpense(null);
    setContingenciesExpense(null);
    setApprovers([])
  };

  const clearForm = () => {
    resetForm();
    if (details && details.id) {
      closeForm();
    }
  }

  return (
    <div className="request-form w-100 p-r content bg-white">
      {formHasValue() && (
        <IoMdClose onClick={clearForm} className="clear-request-form-btn" />
      )}
      <div className="row">
        <div className="col-8 no-margin">
          <div className="row">
            <div className="col-6 no-margin">
              <SelectInput
                className="w-100 m-b-10"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Training Category*"
                options={categories || []}
              />
            </div>
            <div className="col-6 no-margin">
              <SelectInput
                className="w-100 m-b-10"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                label="Training Method*"
                options={methods || []}
              />
            </div>
          </div>

          <Select
            placeholder="Select Approvers MDA"
            // isMulti
                    className="basic-multi-select"
                    onChange={(value) => {
                      console.log(value)
                    // this.setState({ employeeName: e.target.value });
                    setrecipientMda(value);
                      getEmployeesFromMda(value.value)
                      // this.setState({recipientMda:value});
                    }}
                    value={recipientMda}
                    options={mdaList.map((m) => ({
                      label: m.name,
                      value: m.value,
                    }))}
                  />

<Select
            placeholder="Select Approver"
            // isMulti
                    className="basic-multi-select m-t-10 m-b-10"
                    onChange={(value) => {
                      console.log(value.value)
                    setemployeeName(value);
                    handleApproverId(value)
                    // handleApproverId(value)
                    // setEmployeeList(value.value);
                    // this.setState({ employeeList: value });

                      // this.getEmployeesFromMda(value.value)
                      // this.setState({recipientMda:value});
                    }}
                    // onChange={(e)=>{handleApproverId(e)}}
                    onInputChange={(e)=>{handleApprovers(e)}}
            isMulti
            value={employeeName}
                    options={employees?.map((m) => ({
                      label: m.name,
                      value: m.value,
                    }))}
                  />
          {/* <Select
            className="w-100 m-b-10"
            options={approversOptions}
            value={approvers}
            isMulti
            onChange={(e)=>{handleApproverId(e)}}
            onInputChange={(e)=>{handleApprovers(e)}}
            placeholder="Select Approvers"
          /> */}

          <TextInput
            className="w-100 m-b-10"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Training Title*"
          />
          
          <TextareaInput
            className="w-100 m-b-10"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Training Details*"
          />
          
          
         
         <div className="row">
            <div className="col-6 no-margin">
            <TextInput
            className="w-100 m-b-10"
            value={subscriptionExpense}
            onChange={(e) => setSubscriptionExpense(e.target.value)}
            label="Subscription"
          />
          
            </div>
            <div className="col-6 no-margin">
            <TextInput
            className="w-100 m-b-10"
            value={contingenciesExpense}
            onChange={(e) => setContingenciesExpense(e.target.value)}
            label="Contingencies"
          />
            </div>
          </div>
<div className="row">
            <div className="col-6 no-margin">
            <TextInput
            className="w-100 m-b-10"
            value={transportationExpense}
            onChange={(e) => setTransportationExpense(e.target.value)}
            label="Transportation"
          />
          
            </div>
            <div className="col-6 no-margin">
            <TextInput
            className="w-100 m-b-10"
            value={localTransportationExpense}
            onChange={(e) => setLocalTransportationExpense(e.target.value)}
            label="Local Transportation"
          />
            </div>
          </div>

          <div className="row">
            <div className="col-6 no-margin">
            <TextInput
            className="w-100 m-b-10"
            value={dtaExpense}
            onChange={(e) => setDtaExpense(e.target.value)}
            label="Duty Tour Allowance"
          />
           
           
            </div>
            <div className="col-6 no-margin">
            <TextInput
            className="w-100 m-b-10"
            value={journalPublicationExpense}
            onChange={(e) => setJournalPublicationExpense(e.target.value)}
            label="Journals/Publication"
          />
            </div>
          </div>

          <div className="row">
            <div className="col-6 no-margin">
              <TextareaInput
                className="w-100 m-b-10"
                rows={4}
                value={impactOnindividual}
                onChange={(e) => setImpactOnindividual(e.target.value)}
                label="Expected impact on the Individual*"
              />
            </div>
            <div className="col-6 no-margin">
              <TextareaInput
                className="w-100 m-b-10"
                rows={4}
                value={impactOnOrganisation}
                onChange={(e) => setImpactOnOrganisation(e.target.value)}
                label="Expected impact on the Organization*"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6 no-margin">
              <button
                type="button"
                className="btn btn-large w-100 btn-light"
                onClick={() => submitForm("save")}
                disabled={isSubmitting}
              >
                Save
                {isSubmitting && (
                  <img src={Loader} className="btn-loading" alt="Loading..." />
                )}
              </button>
            </div>
            <div className="col-6 no-margin">
              <button
                type="button"
                className="btn btn-large w-100"
                onClick={() => submitForm("submit")}
                disabled={isSubmitting}
              >
                Submit
                {isSubmitting && (
                  <img src={Loader} className="btn-loading" alt="Loading..." />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="col-4 no-margin">
          <div className="row">
            <div className="col-6 no-margin">
              <TextInput
                className="w-100 m-b-10"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                label="Training Start Date*"
                type="date"
              />
            </div>
            <div className="col-6 no-margin">
              <TextInput
                className="w-100 m-b-10"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                label="Training End Date*"
                type="date"
              />
            </div>
          </div>
          <TextInput
            className="w-100 m-b-10"
            value={organisingBody}
            onChange={(e) => setOrganisingBody(e.target.value)}
            label="Organizing Body*"
          />
          <TextInput
            className="w-100 m-b-10"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label="Location*"
          />
          <TextInput
            className="w-100 m-b-10"
            value={totalCost}
            type="number"
            onChange={(e) => setTotalCost(e.target.value)}
            label="Training Cost*"
          />
          <TextInput
            type="number"
            className="w-100 m-b-10"
            value={personalExpense}
            onChange={(e) => setPersonalExpense(e.target.value)}
            label="Personal Training Expense*"
          />
          <button
            style={{
              justifyContent: "space-evenly",
              color: "rgb(67, 66, 93)",
              backgroundColor: "rgba(239, 214, 107, 0.95)",
              borderRadius: "50px",
            }}
            type="button"
            className="btn w-100 btn-large flex flex-v-center"
            onClick={handleFilesUpload}
          >
            <BsUpload />
            Upload Supporting Document
            <input type="file" hidden id="image-upload" />
          </button>
          <div className="m-t-20">
            <h4>Uploaded Document</h4>
          </div>
          <div className="w-100 m-t-10 m-b-20">
            {fileArray &&
              fileArray.map((file, i) => (
                <div className="flex idea-attachment m-t-10" key={file.name}>
                  <a
                    className="gray underline flex"
                    href={b64FileArray[i]}
                    alt="Idea attached file"
                    download
                  >
                    {file.name}
                  </a>
                  <RiDeleteBin5Line
                    className="pointer m-l-5"
                    style={{ fontSize: "1.2rem", minWidth: "20px" }}
                    onClick={() => handleFileDelete(i)}
                  />
                </div>
              ))}
            {uploadedDocuments && (
              <div className="flex idea-attachment m-t-10">
                <a
                  className="gray underline flex"
                  href={formatFileUrl(uploadedDocuments)}
                  alt="Idea attached file"
                  download
                >
                  {uploadedDocuments}
                </a>
                <RiDeleteBin5Line
                  className="pointer m-l-5"
                  style={{ fontSize: "1.2rem", minWidth: "20px" }}
                  onClick={() => setUploadedDocuments("")}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingRequestForm;
