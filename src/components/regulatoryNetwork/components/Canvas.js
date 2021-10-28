import React, { useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import svg from "cytoscape-svg";
import { saveAs } from "file-saver";
import popper from "cytoscape-popper";
import dagre from "cytoscape-dagre";

//Assets
import Style from "./styles/Canvas.module.css";
import networkStyle from "./styles/network.style.json";
import "boxicons";

cytoscape.use(svg);
cytoscape.use(dagre);
if (typeof cytoscape("core", "popper") == "undefined") {
  cytoscape.use(popper);
}

export const Canvas = ({
  layout,
  minZoom,
  maxZoom,
  zoom,
  zoomChange,
  network,
  nodeChange,
}) => {
  const [cy, setCy] = useState(null);

  const layoutOptions = {
    name: layout,
    fit: true,
    directed: true,
    avoidOverlap: true,
  };

  const style = {
    width: "100%",
    height: "500px",
    backgroundColor: "#fff",
  };

  const cyto = (cy) => {
    cy.userZoomingEnabled(false);

    cy.bind("tap", "node", function (evt) {
      evt.target.data().network !== "Gene" && nodeChange(evt.target.id());
    });

    setCy(cy);
    zoom === null ? zoomChange(cy.fit().zoom()) : cy.zoom(zoom);

    // bind tapstart to edges and highlight the connected nodes
    cy.bind("mouseover", "edge", function (event) {
      var connected = event.target.connectedNodes();
      connected.addClass("highlight");
    });

    // bind tapend to edges and remove the highlight from the connected nodes
    cy.bind("mouseout", "edge", function (event) {
      var connected = event.target.connectedNodes();
      connected.removeClass("highlight");
    });

    cy.elements().unbind("mouseover");
    cy.elements().bind("mouseover", (event) => {
      event.target.popperRefObj = event.target.popper({
        content: () => {
          let content = document.createElement("div");

          content.classList.add("popper-div");
          content.style =
            "background-color: #346583;color: #fff;text-align: left; padding: 3px 5px;border-radius: 5px";

          content.innerHTML = `${
            event.target.data("label") == null
              ? `Source: ${event.target.data(
                  "sourceLabel"
                )} <br> Target: ${event.target.data(
                  "targetLabel"
                )} <br> Effect: ${event.target.data("effect")}`
              : `Id: ${event.target.id()} <br> Label: ${event.target.data(
                  "label"
                )}`
          }`;

          document.body.appendChild(content);
          return content;
        },
        popper: {
          placement: "top",
          removeOnDestroy: true,
        },
      });
    });

    cy.elements().unbind("mouseout");
    cy.elements().bind("mouseout", (event) => {
      if (event.target.popperRefObj) {
        event.target.popperRefObj.state.elements.popper.remove();
        event.target.popperRefObj.destroy();
      }
    });

    cy.elements().unbind("click");
    cy.elements().bind("click", (event) => {
      if (event.target.popperRefObj) {
        event.target.popperRefObj.state.elements.popper.remove();
        event.target.popperRefObj.destroy();
      }
    });
  };

  const saveAsPng = () => {
    saveAs(cy.png(), "graph.png");
  };

  const saveAsSvg = () => {
    const svgContent = cy.svg({ scale: 1, full: true });
    const blob = new Blob([svgContent], {
      type: "image/svg+xml;charset=utf-8",
    });
    saveAs(blob, "demo.svg");
  };

  const saveAsJpg = () => {
    saveAs(cy.jpg(), "graph.jpg");
  };

  const saveAsJson = () => {
    var jsonBlob = new Blob([JSON.stringify(cy.json())], {
      type: "application/javascript;charset=utf-8",
    });
    saveAs(jsonBlob, "graph.json");
  };

  return (
    <div className={Style.canvas}>
      <div className={Style.secondRow}>
        <div className={Style.zoom}>
          <button
            onClick={() =>
              zoom > minZoom ? zoomChange(zoom - 0.2) : zoomChange(minZoom)
            }
          >
            <box-icon name="minus" color="#ffffff"></box-icon>
          </button>
          <button
            onClick={() =>
              zoom < maxZoom ? zoomChange(zoom + 0.2) : zoomChange(maxZoom)
            }
          >
            <box-icon name="plus-medical" color="#ffffff"></box-icon>
          </button>
        </div>
        <div className={`${Style.dropdown} ${Style.download}`}>
          <button id="btn-download">
            <box-icon type="solid" name="download" color="#ffffff"></box-icon>
          </button>
          <div className={Style.dropdownContent}>
            <a href="/#" onClick={saveAsPng}>
              Save as PNG
            </a>
            <a href="/#" onClick={saveAsSvg}>
              Save as SVG
            </a>
            <a href="/#" onClick={saveAsJpg}>
              Save as JPG
            </a>
            <a href="/#" onClick={saveAsJson}>
              Save as JSON
            </a>
          </div>
        </div>
      </div>
      <div id="cy">
        <CytoscapeComponent
          elements={CytoscapeComponent.normalizeElements(network)}
          style={style}
          zoomingEnabled={true}
          maxZoom={maxZoom}
          minZoom={minZoom}
          autounselectify={false}
          boxSelectionEnabled={true}
          layout={layoutOptions}
          stylesheet={networkStyle}
          cy={cyto}
        />
      </div>
    </div>
  );
};
