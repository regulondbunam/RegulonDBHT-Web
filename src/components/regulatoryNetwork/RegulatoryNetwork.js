import React, { useState, useEffect } from "react";
import { Canvas } from "./components/Canvas";
import { Options } from "./components/Options";
import { useQuery } from "@apollo/client";

import Style from "./RegulatoryNetwork.module.css";
import { getNetwork } from "./web_services/queries";
import { FormatData } from "./web_services/structuringData";

function RegulatoryNetwork({ id_regulon = "RDBECOLITFC00123" }) {
  const [zoom, setZoom] = useState();
  const [layout, setLayout] = useState("grid");
  const [node, setNode] = useState(id_regulon);
  const minZoom = 0.05;
  const maxZoom = 2;

  useEffect(() => {
    const updateZoom = () => {
      setZoom(null);
    };
    updateZoom();
  }, [layout]);

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom);
  };

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const handleNodeChange = (newNode) => {
    setNode(newNode);
  };

  const { loading, error, data } = useQuery(getNetwork(node), {
    fetchPolicy: "network-only",
  });
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error...</p>;

  const network = FormatData(data);

  return (
    <div className={Style.conteiner}>
      <div className="App">
        <Options
          layout={layout}
          layoutChange={handleLayoutChange}
          nodeChange={handleNodeChange}
          idRegulon={id_regulon}
        />
        <Canvas
          zoom={zoom}
          zoomChange={handleZoomChange}
          layout={layout}
          layoutChange={handleLayoutChange}
          minZoom={minZoom}
          maxZoom={maxZoom}
          network={network}
          nodeChange={handleNodeChange}
        />
      </div>
    </div>
  );
}

export default RegulatoryNetwork;
