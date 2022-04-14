import Cookies from "js-cookie";

export const toggleScroll = () => {
  const overlays = document.querySelectorAll('.overlay');

  if (overlays.length > 0) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
};

export const convertImgToBase64 = (inputFile) => {
  if (inputFile === undefined) return '';
  const file = new FileReader();

  return new Promise((resolve, reject) => {
    file.onerror = () => {
      file.abort();
      reject(new DOMException('Problem parsing input file.'));
    };

    file.onload = () => {
      resolve(file.result);
    };
    file.readAsDataURL(inputFile);
  });
};

export const formatFileUrl = (path) => {
  if (!path) return null;
  return `${localStorage.getItem("api")}/${path}`;
};

export const formatReviewStatus = (status) => {
  if (status === 1) return 'Approved'
  else if (status === 0) return 'Declined'
  else if (status === 3) return 'Pending'
  else return status;
}
