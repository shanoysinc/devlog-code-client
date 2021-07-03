import React from "react";
import { Layout, Space } from "antd";
import { MenuItems } from "./components";
import { useHistory } from "react-router-dom";

const { Header } = Layout;

export const AppHeader = () => {
  const history = useHistory();
  const logoLinkHandler = () => {
    history.push("/");
  };
  return (
    <Header className="navbar">
      <div className="navbar__items-left">
        <Space size="middle">
          <h1 className="logo__title" onClick={logoLinkHandler}>
            <span className="logo__sub-title">Dev</span>Log
          </h1>
          {/* <div className="navbar-search">
            <Input
              size="large"
              placeholder="Search"
              prefix={<SearchOutlined />}
              bordered={false}
              className="input"
            />
          </div> */}
        </Space>
      </div>
      <div className="navbar__items-right">
        <MenuItems />
      </div>
    </Header>
  );
};
