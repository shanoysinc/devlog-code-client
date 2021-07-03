import { notification } from "antd";

interface Props {
  type: "warning" | "success" | "error" | "info";
  description: string;
  title: string;
}
export const openNotificationWithIcon = ({
  type,
  description,
  title,
}: Props) => {
  notification[type]({
    message: title,
    description,
    className: "notification",
  });
};
