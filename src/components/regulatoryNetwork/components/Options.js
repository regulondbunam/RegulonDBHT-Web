import React from "react";

//Assets
import Style from "./styles/Options.module.css";

export const Options = ({ layout, layoutChange, nodeChange, idRegulon }) => {
  const options = ["Cose", "Dagre", "Grid", "Breadthfirst", "Circle"];
  return (
    <div className={Style.options}>
      <div className={Style.firstRow}>
        <label>LAYOUT </label>
        <select value={layout} onChange={(e) => layoutChange(e.target.value)}>
          {options.map((option) => (
            <option value={option.toLowerCase()}>{option}</option>
          ))}
        </select>
        <button className={Style.return} onClick={() => nodeChange(idRegulon)}>
          <box-icon name="refresh" color="#ffffff"></box-icon>
        </button>
      </div>
    </div>
  );
};
