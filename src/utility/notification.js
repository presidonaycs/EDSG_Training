import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

const notification = ({
  title, message, type, onRemoval = () => {}, duration = 5000
}) => {
  store.addNotification({
    title: title || '',
    message: message || '',
    type: type || 'warning', // 'default', 'success', 'info', 'warning'
    container: 'bottom-left', // where to position the notifications
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration,
      showIcon: true,
      onScreen: true
    },
    onRemoval
  });
};

export default notification;
