import React, { useEffect } from 'react';
//import { Person } from "schema-dts";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "@apollo/client";
//import {CITATIONS_FIELDS} from "../fragments/fragments"

//const RegulonGeneOntologyItem = ``


function queryC(linked_control_ids = []) {
    if (linked_control_ids.length === 0 || !linked_control_ids) {
        return gql`
    {
        getDatasetsFromSearch(advancedSearch: "D[_id]") {
          _id
        }
    }`
    }
    let search = linked_control_ids.map((id) => {
        return `${id}[linkedDataset.controlId]`
    }).join(" OR ")
    //console.log(search)
    return gql`
    {
        getDatasetsFromSearch(advancedSearch: "${search}") {
          _id
          sample{
            title
        }
        }
    }`
}

export const GetRelatedDatasetByControlId = ({
    linked_control_ids = [],
    status = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(queryC(linked_control_ids))
    useEffect(() => {
        if (loading) {
            status('loading')
        }
        if (data) {
            try {
                resoultsData(data?.getDatasetsFromSearch)
                status('done')
            } catch (error) {
                status('error')
                console.error(error)
            }
        }
        if (error) {
            status('error')
            console.error(error)
        }

    }, [loading, error, status, data, resoultsData, linked_control_ids]);
    return (<></>);
}

function queryE(linked_experimental_ids = []) {
    if (linked_experimental_ids.length === 0 || !linked_experimental_ids) {
        return gql`
    {
        getDatasetsFromSearch(advancedSearch: "D[_id]") {
          _id

        }
    }`
    }
    let search = linked_experimental_ids.map((id) => {
        return `${id}[linkedDataset.experimentId]`
    }).join(" OR ")
    return gql`
    {
        getDatasetsFromSearch(advancedSearch: "${search}") {
          _id
          sample{
            title
        }
        }
    }`
}

export const GetRelatedDatasetByExperimentalId = ({
    linked_experimental_ids = [],
    status = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(queryE(linked_experimental_ids))
    useEffect(() => {
        if (loading) {
            status('loading')
        }
        if (data) {
            try {
                resoultsData(data?.getDatasetsFromSearch)
                status('done')
            } catch (error) {
                status('error')
                console.error(error)
            }
        }
        if (error) {
            status('error')
            console.error(error)
        }

    }, [loading, error, status, data, resoultsData, linked_experimental_ids]);
    return (<></>);
}

function queryS(sourceId) {
    return gql`
    {
        getDatasetsFromSearch(advancedSearch: "${sourceId}[sourceSerie.sourceId]") {
          _id
          sample {
            title
          }
        }
      }`
}

export const GetRelatedDatasetBySource = ({
    sourceId,
    status = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(queryS(sourceId))
    useEffect(() => {
        if (loading) {
            status('loading')
        }
        if (data) {
            try {
                if (data?.getDatasetsFromSearch.length > 1) {
                    status('done')
                } else {
                    status("no_found")
                }
                resoultsData(data?.getDatasetsFromSearch)
            } catch (error) {
                status('error')
                console.error(error)
            }
        }
        if (error) {
            status('error')
            console.error(error)
        }

    }, [loading, error, status, data, resoultsData, sourceId]);
    return (<></>);
}