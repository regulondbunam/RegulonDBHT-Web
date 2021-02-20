import React from "react";

const MenuBody = ({ menuData, id, close }) => {
  const submenuData = menuData.find((element) => element.id === id);
  const content = submenuData.options;
  return (
    <div style={styleMenuBody}>
      {content.map((item) => {
        switch (item.type) {
          case "SUBMENU":
            return (
              <div key={item.id} style={styleSubmenu}>
                <a href={item.link} style={styleSubTitle}>
                  {item.title}
                </a>
                {item.options.map((itemm) => {
                  return (
                    <div
                      key={itemm.id}
                      style={{ paddingTop: "5%", paddingBottom: "1%" }}
                    >
                      <a
                        style={setStyleLink(itemm.id, itemm.state)}
                        target={itemm.target}
                        href={itemm.link}
                      >
                        {itemm.title}
                      </a>
                    </div>
                  );
                })}
              </div>
            );
          case "LINK":
            return (
              <div key={item.id} style={styleSubmenu}>
                <a
                  style={setStyleLink(item.id, item.state)}
                  target={item.target}
                  href={item.link}
                >
                  {item.title}
                </a>
              </div>
            );
          case "CARD":
            return <div></div>;
          default:
            return <div></div>;
        }
      })}
      <br />
      <br />
    </div>
  );
};

const setStyleLink = (id, state) => {
  switch (state) {
    case "enabled":
      return {
        textDecoration: "none",
        fontSize: "16",
        fontFamily: "sans-serif",
        color: "#ffffff"
      };
    case "disabled":
      return {
        textDecoration: "none",
        fontSize: "16",
        fontFamily: "sans-serif",
        color: "#ffffff"
      };
    case "soon":
      return {
        textDecoration: "underline",
        fontSize: "16",
        fontFamily: "sans-serif",
        color: "#ffffff"
      };
    default:
      console.log(`link "${id}" status not defined`);
      return {
        display: "null"
      };
  }
};

const styleSubmenu = {
  float: "left",
  paddingLeft: "5%",
  paddingTop: "3%"
};

const styleMenuBody = {
  display: "flex",
  backgroundColor: "#72a7c7",
  boxShadow: "inset 0px -5px 5px 0px rgba(0,0,0,.5)",
  padding: "1% 10% 2% 10%",
  height: "auto"
};

const styleSubTitle = {
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "12",
  fontFamily: "sans-serif",
  color: "#1F3D4E"
};

export default MenuBody;
