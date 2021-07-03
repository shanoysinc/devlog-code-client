import React from "react";
import { Menu, Dropdown } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { CreateNotesModal } from "../../../Timeline/components/modal";
import { createNoteModalStore } from "../../../../state/createNoteModal/createNoteModalStore";
import { Link } from "react-router-dom";
import { MenuIcon } from "../../../../assets/svgComponent/MenuIcon";
const { Item } = Menu;
export const MenuItems = () => {
  const { createNotesModal, setCreateNotesModal } = createNoteModalStore(
    (state) => ({
      createNotesModal: state.visibility,
      setCreateNotesModal: state.setVisibility,
    })
  );

  const dropDownItem = (
    <Menu>
      <Item key="roadmap">
        <Link to="/roadmap">
          <div className="navbar__menu-items-link">
            <p>RoadMap</p>
          </div>
        </Link>
      </Item>
      <Item key="about">
        <Link to="/about">
          <div className="navbar__menu-items-link">
            <p>About</p>
          </div>
        </Link>
      </Item>
    </Menu>
  );

  return (
    <>
      <div className="hamburger-menu">
        <Dropdown
          overlay={dropDownItem}
          placement="bottomLeft"
          arrow
          trigger={["click"]}
        >
          <div className="hamburger-menu__container">
            <div>Menu</div>
            <MenuIcon color="white" height={16} width={16} />
          </div>
        </Dropdown>
      </div>

      <div className="navbar__menu-items__container">
        <Link to="/roadmap">
          <div className="navbar__menu-items-link">
            <p>RoadMap</p>
          </div>
        </Link>
        <Link to="/about">
          <div className="navbar__menu-items-link">
            <p>About</p>
          </div>
        </Link>
        <button
          className="navbar-menu-item__create-note__btn"
          onClick={() => setCreateNotesModal(!createNotesModal)}
        >
          <div>
            <FormOutlined />
          </div>
          <div>Create Note</div>
        </button>
      </div>

      <CreateNotesModal
        createNotesModal={createNotesModal}
        setCreateNotesModal={setCreateNotesModal}
      />
    </>
  );
};
