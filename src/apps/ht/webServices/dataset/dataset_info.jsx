import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";
import { query } from './buildQuery';

const queryI = gql`
{
  dataset: __type(name: "Dataset") {
    fields {
      name
    }
  }
}
    `

const GetInfoDataset = ({
  id_dataset = "",
  status = () => { },
  resoultsData = () => { },
}) => {
  const { data, error } = useQuery(queryI)
  if (error) {
    console.error(error)
  }
  if (data) {
    return <InfoDataset id_dataset={id_dataset} status={(state)=>{status(state)}} resoultsData={(data)=>{resoultsData(data)}} fields={data?.dataset?.fields}  />
  }
  return (<></>);
}

const InfoDataset = ({
  id_dataset = "",
  status = () => { },
  resoultsData = () => { },
  fields = []
}) => {
  fields = fields.map(f =>{
    return f.name
  })
  console.log(fields)
  const { data, loading, error } = useQuery(query(id_dataset,fields))
  useEffect(() => {
    if (loading) {
      status('loading')
    }
    if (data) {
      try {
        resoultsData(clean(data?.getDatasetsFromSearch[0]))
        status('done')
      } catch (error) {
        resoultsData(undefined)
        status('error')
        console.error(error)
      }
    }
    if (error) {
      resoultsData(undefined)
      status('error')
      console.error(error)
    }

  }, [loading, error, status, data, resoultsData, id_dataset]);
  return (<></>);
}

function clean(data = {}){
  if(data?.sample?.title === '-'){
    data.sample.title = undefined;
  }
  return data
}

export default GetInfoDataset;