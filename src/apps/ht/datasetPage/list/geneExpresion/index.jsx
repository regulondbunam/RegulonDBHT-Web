import React from 'react';
import { useQuery, gql } from '@apollo/react-hooks';

const query_GET_GENEEXPRESSION = gql`
{
    getDatasetsFromSearch(advancedSearch: "'GENE_EXPRESSION'[datasetType]", ){
      _id
      sample{
        title
      }
      publications{
        authors
        title
      }
      sourceSerie{
        platform{
          _id
          title
        }
      }
    }
  }
`

function FormatJsonTable (data = []){
    let jsonTable = {
        columns: [
            {Header: 'id', accessor: '_id', width: '150'},
            {Header: 'Title', accessor: '_titleGE'},
            {Header: 'Publication', accessor: '_publicationGE'},
            {Header: 'Platform', accessor: '_platform'},
        ],
        data: []
    }
    if (Array.isArray(data)) {
        data.forEach((ge)=>{
            let id = ge._id.split("_")
            let title = "";
            if (ge?.sample) {
              title = ge.sample.title
            }
            let publication = "";
            if (ge.publications.length > 0) {
                publication = ge.publications[0].title
            }
            let platform = "";
            if (ge?.sourceSerie) {
                platform = ge.sourceSerie.platform.title
            }
            
            jsonTable.data.push({
                _id: id[2],
                _titleGE: title,
                _publicationGE: publication,
                _platform: platform
            })
        })
        jsonTable.data =  jsonTable.data.sort((a, b) => {
            const nameA = a._publicationGE.toUpperCase(); // ignore upper and lowercase
            const nameB = b._publicationGE.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return 1;
            }
            if (nameA > nameB) {
              return -1;
            }
            return 0;
          });
    }
    //console.log(data);
    return jsonTable
}

export function GEData({getData = ()=>{}, getState = ()=>{}}) {
    const {loading, error, data} = useQuery(query_GET_GENEEXPRESSION)
    //console.log(data);
    React.useEffect(()=>{
        if(loading){
            getState("loading")
        }
        if(error){
            console.error("get_GE: ",error);
            getState("error")
        }
        if(data){
            getData(FormatJsonTable(data.getDatasetsFromSearch))
            getState("done")
        }
    },[loading, data, error, getData,getState])
    return <></>
}