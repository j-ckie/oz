import React from "react";
import askForPermToRecieveNotifications from "../../push-notification";

// mUI
import Button from "@material-ui/core/Button";


const NotifiationButton = () => (
    <Button variant="contained" color="primary" onClick={askForPermToRecieveNotifications}>
        Click here to enable reminders
    </Button>
);

export default NotifiationButton;