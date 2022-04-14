import React, { useEffect, useState } from "react";

import LocationDetails from "../layouts/LocationDetails";
import LoadingSpinner from "../../resources/loadingSpinner";
import TrainingRequestDetails from '../layouts/TrainingRequestDetails';

// Api
import { get } from '../../api-services/fetch';
import Greeting from "../layouts/Greeting";

const DeclinedRequest = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [details, setDetails] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "EDSG - Declined Training Request";

    const getList = async () => {
      setIsLoading(true);
      setErrorMsg('');
      const res = await get({ endpoint: '/Request/declinedrequest' });

      console.log(res);

      if (res && res.status === 200) {
        const { data } = res;
        if (data.code === 1) {
          setDetails(data.data);
          if (data.data.length < 1) {
            setErrorMsg('No Request yet');
          }
        } else {
          setErrorMsg(data.message);
        }
      } else {
        setErrorMsg('Something has gone wrong. Please, try again.');
      }
      setIsLoading(false);
    };

    getList();
  }, []);

  return (
    <div className="w-100">
      {isLoading && <LoadingSpinner />}
      <div className="w-100 flex flex-v-center space-between">
        <Greeting />
        {/* <LocationDetails /> */}
      </div>
      <div className="w-100 m-t-20">
        <div className="w-100">
          <h3>Declined Training Requests</h3>
        </div>
        <table className="table-view m-t-10">
          <thead className="table-header">
            <tr className="table-row">
              <th className="th"><p>Training</p></th>
              <th className="th"><p>Organizing Body</p></th>
              <th className="th"><p>Date</p></th>
              <th className="th"><p>Status</p></th>
              <th className="th actions"><p>Last Treated</p></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {!(isLoading || errorMsg) && details && details.map((item) => (
              <ListItem key={item.id} details={item} />
            ))}
          </tbody>
        </table>
        {isLoading && <div className="w-100 center-text p-20">Loading...</div>}
        {errorMsg && <div className="w-100 center-text p-20">{errorMsg}</div>}
      </div>
    </div>
  );
};

const ListItem = ({ details = {} }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <tr
        className={`${showDetails && 'active'} table-row pointer`}
        onClick={() => setShowDetails(!showDetails)}
        role="presentation"
      >
        <td className="td p-r" style={{ padding: '20px 10px' }}>
          {details.title}
        </td>
        <td className="td" style={{ padding: '20px 10px' }}>{details.organisingBody}</td>
        <td className="td" style={{ padding: '20px 10px' }}>{details.startDate}</td>
        <td className="td" style={{ padding: '20px 10px' }}>
          <div className={`status status-${details.status}`}>
            {`${details.status !== 3 ? '' : 'Currently with '}`}
            {details.status !== 3 ? '' : <b>{details.currentlyWith} - </b>}
            <b>{details.approvalStatus}</b>
          </div>
        </td>
        <td className="td actions" style={{ padding: '20px 10px' }}>{details.lastTreated}</td>
      </tr>
      {showDetails && (
        <tr className="">
          <td colSpan={5}>
            <TrainingRequestDetails
              owner
              cardDetails={details}
              style={{ transition: "all 0.6s ease-in" }}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default DeclinedRequest;
