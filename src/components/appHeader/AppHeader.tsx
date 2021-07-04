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
            <span className="logo__sub-title">Dev</span>log
          </h1>
          {/* <div className="navbar-search">
            <AutoComplete
              style={{ width: "100%" }}
              size="middle"
              suffixIcon={<SearchOutlined />}
              options={notes}
              placeholder="Try searching for a note"
              filterOption={(inputValue, note) =>
                note!.title.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              onSelect={searchBarHandler}
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
