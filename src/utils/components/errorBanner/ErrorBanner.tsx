import React from "react";
import { Alert } from "antd";

interface Props {
  message: string;
  type: "warning" | "success" | "info" | "error" | undefined;
}
export const ErrorBanner = ({ message, type }: Props) => {
  return <Alert message={message} type={type} showIcon closable banner />;
};
