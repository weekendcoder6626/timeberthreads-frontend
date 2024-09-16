import { notifications } from "@mantine/notifications";

export function triggerNotification(message: string, autoCloseTime = 2000) {

    notifications.show({
        message: message,
        autoClose: autoCloseTime,
      });
      
}