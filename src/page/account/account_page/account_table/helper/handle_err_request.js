import { get } from 'lodash';
import { openNotificationWithIcon } from './notification_antd';

export const handleErr = (error, showNotification) => {

    if (error.response) {
        // Request made and server responded
        console.log(error.response.data, '.data');
        const msg = get(error, 'response.data.msg', '') || get(error, 'response.data.message', '');
        if (showNotification) openNotificationWithIcon("error", msg);
        return {
            msg,
            status: error.response.status
        }
        // console.log(error.response.status, '.status');
        // console.log(error.response.headers, '.headers');
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        openNotificationWithIcon("error", error.message);
    }
}