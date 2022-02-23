import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
//import { QUERY } from "./query";

const DataSolver = ({
  query,
  QUERY_GQL,
  DATASET,
  set_suggest = () => { }
}) => {
  const { data, loading, error } = useQuery(QUERY_GQL, {
    variables: { keyword: "R[_id]" + " AND " + DATASET + "[datasetType]" },
  })

  var listaVacia = ["No suggestions","",""]


  useEffect(() => {
    if (data) {
      getDataList(data?.getDatasetsFromSearch, query)
    }
    if (error) {
      console.error("Error DataSolver: ", error)
    }
  }, [data])

  function getDataList(data, query) {
    if (!data) {
      return undefined;
    }
    let lista = [];//Lista inicializada para cargar al final del filtro
    let path = query.split(".");//Camino para acceder a los datos deseados
    data.map((datasets) => {
      switch (path.length) {

        case 1://Nivel 1 - funcionando
          const campo1 = path[0];
          if (Array.isArray(datasets[campo1])) {
            datasets[campo1].map(datasetlvl1 => {
              if (datasetlvl1) {
                lista.push(datasetlvl1)
              }
            })
          } else {
            if (datasets[campo1]) {
              lista.push(datasets[campo1])
            }
          }
          break;

        case 2: //Nivel 2 - funcionando
          const C2campo1 = path[0];
          const C2campo2 = path[1];

          if (!datasets[C2campo1]) {
            break;
          }

          //console.log(datasets[C2campo1])

          if (Array.isArray(datasets[C2campo1])) {
            //console.log(datasets[C2campo1])
            datasets[C2campo1].map(datasetlvl2 => {
              if (Array.isArray(datasetlvl2[C2campo2])) {
                datasetlvl2[C2campo2].map(dato => {
                  console.log(dato)
                  if (dato) {
                    lista.push(dato)
                  } else {
                    lista.push("No suggestions")
                  }
                })
              } else {
                if (datasetlvl2[C2campo2]) {
                  //console.log(datasetlvl2[C2campo2])
                  lista.push(datasetlvl2[C2campo2])
                } else {
                  lista.push("No suggestions")
                }
              }
            })
          }

          if (typeof (datasets[C2campo1]) === "object") {
            let datasetlvl2 = datasets[C2campo1]
            
            if (Array.isArray(datasetlvl2[C2campo2])) {
              
              datasetlvl2[C2campo2].map(dato => {
                if (dato) {
                  lista.push(dato)
                } else {
                  lista.push("No suggestions")
                }
              })
            } else {
              //console.log(datasetlvl2)
              if (datasetlvl2[C2campo2]) {
                lista.push(datasetlvl2[C2campo2])
              } else {
                lista.push("No suggestions")
              }
            }
          }

          break;

        case 3:// Nivel 3 - 80% funcional
          const C3campo1 = path[0]
          const C3campo2 = path[1]
          const C3campo3 = path[2]

          if (!datasets[C3campo1]) {
            break;
          }

          if (Array.isArray(datasets[C3campo1])) {
            datasets[C3campo1].map(datasetlvl2 => {
              if (typeof (datasets[C3campo1]) === "object") {
                let datasetlvl3 = datasetlvl2[C3campo2]
                if (datasetlvl3[C3campo3]) {
                  lista.push(datasetlvl3[C3campo3])
                } else {
                  lista.push("No suggestions")
                }
              }
              if (Array.isArray(datasetlvl2[C3campo2])) {
                datasetlvl2[C3campo2].map(datasetlvl3 => {
                  if (datasetlvl3[C3campo3]) {
                    lista.push(datasetlvl3[C3campo3])
                  } else {
                    lista.push("No suggestions")
                  }
                })
              }
            })
          }

          if (typeof (datasets[C3campo1]) === "object") {
            let datasetlvl2 = datasets[C3campo1]
            if (!datasetlvl2[C3campo2]) {
              break;
            }
            if (Array.isArray(datasetlvl2[C3campo2])) {
              datasetlvl2[C3campo2].map(datasetlvl3 => {
                if (datasetlvl3[C3campo3]) {
                  lista.push(datasetlvl3[C3campo3])
                } else {
                  lista.push("No suggestions")
                }
              })
            }
            if (typeof (datasetlvl2[C3campo2]) === "object") {
              let datasetlvl3 = datasetlvl2[C3campo2]
              if (datasetlvl3[C3campo3]) {
                lista.push(datasetlvl3[C3campo3])
              } else {
                lista.push("No suggestions")
              }
            }
          }

          break;

        default:
          break;
      }
    });

    if (lista.length) {
      cleanDataList(lista)
    }
  }

  function cleanDataList(DataList) {
    let cleanList;
    if (DataList !== null) {
      if (Array.isArray(DataList)) {

        DataList.sort();

        cleanList = DataList.filter((item, index) => {
          return DataList.indexOf(item) === index;
        })
      }

      if(cleanList.length > 1){
        let newArray = cleanList.filter((item) => item !== "No suggestions");
        set_suggest(newArray)
        newArray.map(lista => {
          console.log(lista)
        })
      } else {
        set_suggest(cleanList)
        cleanList.map(lista => {
          console.log(lista)
        })
      }
      }
      
  }

  return <></>
};




export default DataSolver;
