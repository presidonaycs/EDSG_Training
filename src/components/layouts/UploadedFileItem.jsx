/* eslint-disable no-alert */
import React, { useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';

import Loader from '../../assets/svg/loading.svg';

import { formatFileUrl } from '../../utility/general';
import { del } from '../../api-services/fetch';
import notification from '../../utility/notification';

const UploadedFileItem = ({
  details, type, status
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteFile = async (id, name) => {
    const confirmAction = window.confirm(`Click 'OK' to confirm the deletion of "${name}" permanently from the server.`);
    if (!confirmAction) return;

    setIsDeleting(true);
    const res = type === 'request'
      ? await del({
        endpoint: '/api/request/document', param: id, auth: true
      })
      : await del({
        endpoint: '/api/meeting/document', param: id, auth: true
      });

    console.log(res);
    setIsDeleting(false);
    if (res && res.status === 200) {
      const { data } = res;
      if (data.code === 1) {
        setIsDeleted(true);
        notification({
          title: 'Successful Document Deletion',
          message: `You have successfully deleted a documents for this request name "${name}"`,
          type: 'success'
        });
      } else {
        notification({
          title: 'Document Upload Failed',
          message: data.message,
          type: 'danger'
        });
      }
    } else {
      notification({
        title: 'Network Error',
        message: 'Something went wrong while deleting a document for this request. Please, try again later.',
        type: 'danger'
      });
    }
  };

  return (
    <>
      {!isDeleted && (
        <div className="flex idea-attachment m-t-10">
          <a
            className="gray underline flex"
            href={formatFileUrl(details.filePath)}
            alt="Idea attached file"
            target="_blank"
            rel="noreferrer noopener"
            download
          >
            {details.fileName || 'your uploaded file'}
          </a>
          {status === 'pending' && (
            <>
              {isDeleting ? <img src={Loader} alt="..." className="loading" /> : (
                <RiDeleteBin5Line
                  className="pointer m-l-5"
                  style={{ fontSize: '1.2rem' }}
                  onClick={() => deleteFile(details.id, details.fileName)}
                />
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default UploadedFileItem;
