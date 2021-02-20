import React from "react";
import { Component } from "react";
import MenuBody from "./menu_body";
import {
  Button,
  IconButton
} from "../../../ui-components/ui_components";

class MainMenu extends Component {
  state = { idPressed: "", isPressed: false };

  DropMenu = () => {
    this.setState({ isPressed: !this.state.isPressed });
  };

  SetIdMenu = (id) => {
    this.setState({ idPressed: id });
  };

  CloseMenu = () => {
    this.setState({ isPressed: false, idPressed: "" });
  };

  render() {
    const { menuData } = this.props;

    const { idPressed, isPressed } = this.state;

    let menuButton = () => {
      return <></>;
    };
    if (typeof menuData !== "undefined") {
      menuButton = () => {
        return (
          <MenuButtons
            menuData={menuData}
            idPressed={idPressed}
            isPressed={isPressed}
            dropMenu={this.DropMenu}
            getId={this.SetIdMenu}
          />
        );
      };
    }
    let menuBody = () => {
      return <></>;
    };
    if (isPressed) {
      menuBody = () => {
        return (
          <MenuBody menuData={menuData} id={idPressed} close={this.CloseMenu} />
        );
      };
    }
    return (
      <div style={{ width: "100%" }} onMouseLeave={this.CloseMenu}>
        <div style={styleBar}>{menuButton()}</div>
        <div>{menuBody()}</div>
      </div>
    );
  }
}

const MenuButtons = ({ menuData, idPressed, isPressed, dropMenu, getId }) => {
  return (
    <>
      {menuData.map((Item) => {
        switch (Item.type) {
          case "HOME":
            return <div key={Item.id}>{HomeButton(Item.link)}</div>;
          default:
            return (
              <div key={Item.id}>
                <MenuButton
                  id={Item.id}
                  title={Item.title}
                  dropMenu={dropMenu}
                  getId={getId}
                  isPressed={idPressed === Item.id && isPressed}
                />
              </div>
            );
        }
      })}
    </>
  );
};

const MenuButton = ({ id, title, dropMenu, getId, isPressed }) => {
  let buttonStyle = {};
  if (isPressed) {
    buttonStyle = { backgroundColor: "#72a7c7" };
  }
  function hover() {
    getId(id);
  }
  function onClick() {
    dropMenu();
  }
  return (
    <div style={styleMenu} onMouseOver={hover}>
      <Button
        label={title}
        style={Object.assign({}, buttonStyle, styleMenuButton)}
        onClick={onClick}
      />
    </div>
  );
};

/* Funcion utilizada para validar la esturctura del objeto menuData
function TestMenuData(menuData, propiedad){
    return typeof menuData !== 'undefined' && menuData.hasOwnProperty(propiedad);
  }

*/

function HomeButton(homeLink) {
  return (
    <div style={styleHome}>
      <a style={{ textDecoration: "none" }} href={homeLink}>
        <IconButton
          icon={"home"}
          style={styleHomeButton}
          iconStyle={{ fontSize: "50px" }}
        />
      </a>
    </div>
  );
}

const styleBar = {
  paddingLeft: "10%",
  backgroundColor: "#32617d",
  height: "60px"
};

const styleHome = {
  float: "left",
  paddingRight: "2%"
};

const styleHomeButton = {
  width: "60px",
  height: "60px",
  border: "solid 3px #ffffff"
};

const styleMenu = {
  float: "left",
  paddingRight: "1%"
};
const styleMenuButton = {
  fontSize: "14px",
  width: "110px",
  height: "60px",
  fontFamily: "Arial"
};

export default MainMenu;
