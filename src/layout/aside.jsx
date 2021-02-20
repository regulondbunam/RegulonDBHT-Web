import React from "react";
import ContDescription from "./components/aside/aside_contDescription";

const Aside = () => {
  return (
    <aside style={{ position: "absolute", right: "0", width: "15%" }}>
      <div style={{ position: "fixed", width: "100%" }}>
        <table>
          <thead>
            <tr>
              <th style={{ backgroundColor: "#3D779B" }}>
                <h3 style={{ color: "white" }}>Relational Tool</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <ContDescription />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </aside>
  );
};

export default Aside;
