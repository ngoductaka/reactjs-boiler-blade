import {
    notification,
} from "antd";

export const openNotificationWithIcon = (type, description, message = "Thông báo") => {
    notification[type]({
        message,
        description,
        duration: 3,
        style: { marinTop: "56px" },
    });
};