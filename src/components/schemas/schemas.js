import React from 'react'
//import ReactDOMServer from 'react-dom/server'
import { helmetJsonLdProp } from "react-schemaorg";
import { Helmet } from 'react-helmet-async';

export const urlPage = process.env.REACT_APP_DOMAIN_NAME;

export const Schema = ({
    jsonLd = {}
}) => {
    return <React.Fragment>
        <Helmet script={[helmetJsonLdProp(jsonLd)]}/>
    </React.Fragment>
}
/*
const Shemas = ({
    type,
    name,
    description,
    keyWords,
    url
}) => {
    return (
        <Helmet
            script={[
                helmetJsonLdProp({

                }),
            ]}
        />
    );
}
*/
// SchemaCatalog v0.3

// Constantes tecnicas propias de RegulonDB
export const publisher = {
    "@type": "NGO",
    "name": "RegulonDB"
}
export const provider = {
    "@type": "Organization",
    "name": "RegulonDB"
}
export const license = "MIT License. Copyright (c) [2020] RegulonDB"

export const creator = {
    "@type": "Organization",
    "url": urlPage,
    "name": "RegulonDB"
}

// Constantes tecnicas de Validacion

const _name = 'The name of the item.'
const _description = 'A description of the item.'
const _creator = creator
const _publisher = publisher
const _provider = provider
const _license = license
const _keywords = ["keyword", "keyword"]
const _url = "Url of the item"
const _measurementTechnique = 'A technique or technology used in a Dataset. A high level summary for dataset discovery'
const _citation = 'A citation or reference to another creative work, such as another publication, web page, scholarly article, etc.'
const _representativeOfPage = 'false' //'[Indicates whether this image is representative of the content of the page. False | True]'
const _about = "The subject matter of the content."
const _documentation = "URL of documentation"
const _termsOfService = "[Human-readable terms of service documentation: URL]"
const _audienceType = "[The target group associated with a given audience.]"

export function AboutPage({ name = _name, description = _description, creator = _creator, publisher = _publisher, license = _license, keywords = _keywords, url = _url }) {
    return {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": name,
        "description": description,
        "creator": creator,
        "inLanguage": "English",
        "publisher": publisher,
        "license": license,
        "keywords": keywords,
        "url": url
    }
}

export function ContactPage({ name = _name, description = _description, creator = _creator, publisher = _publisher, license = _license, keywords = _keywords, url = _url }) {
    return {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": name,
        "description": description,
        "creator": creator,
        "inLanguage": "English",
        "publisher": publisher,
        "license": license,
        "keywords": keywords,
        "url": url
    }
}

export function FAQPage({ name = _name, description = _description, creator = _creator, publisher = _publisher, license = _license, keywords = _keywords, url = _url }) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "name": name,
        "description": description,
        "creator": creator,
        "inLanguage": "English",
        "publisher": publisher,
        "license": license,
        "keywords": keywords,
        "url": url
    }
}

export function DataCatalog({ name = _name, description = _description, creator = _creator, publisher = _publisher, license = _license, keywords = _keywords, url = _url }) {
    return {
        "@context": "https://schema.org",
        "@type": "DataCatalog",
        "name": name,
        "description": description,
        "creator": creator,
        "inLanguage": "English",
        "publisher": publisher,
        "license": license,
        "keywords": keywords,
        "url": url
    }
}

export function DataDownload({ name = _name, description = _description, measurementTechnique = _measurementTechnique, creator = _creator, publisher = _publisher, license = _license, keywords = _keywords, url = _url }) {
    return {
        "@context": "https://schema.org",
        "@type": "DataDownload",
        "name": name,
        "description": description,
        "creator": creator,
        "inLanguage": "English",
        "measurementTechnique": measurementTechnique,
        "publisher": publisher,
        "license": license,
        "keywords": keywords,
        "url": url
    }
}

// 6

export function Dataset({ name = _name, description = _description, measurementTechnique = _measurementTechnique, creator = _creator, publisher = _publisher, license = _license, citation = _citation, keywords = _keywords, url = _url }) {
    return {
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": name,
        "description": description,
        "creator": creator,
        "inLanguage": "English",
        "measurementTechnique": measurementTechnique,
        "publisher": publisher,
        "license": license,
        "citation": citation,
        "keywords": keywords,
        "url": url
    }
}

// 7

export function ImageObject({ creator = _creator, description = _description, name = _name, representativeOfPage = _representativeOfPage, publisher = _publisher, license = _license, url = _url }) {
    return {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "creator": creator,
        "description": description,
        "name": name,
        "representativeOfPage": representativeOfPage,
        "publisher": publisher,
        "license": license,
        "url": url
    }
}

// 8
// investigar a fonde on google data search action
export function SearchAction({ name = _name, description = _description, query = "The query used on this action" }) {
    return {
        "@context": "https://schema.org",
        "@type": "SearchAction",
        "name": name,
        "description": description,
        "query": query
    }
}

//9
export function SearchResultsPage({ name = _name, description = _description, creator = _creator, publisher = _publisher, license = _license, keywords = _keywords, url = _url }) {
    return {
        "@context": "https://schema.org",
        "@type": "SearchResultsPage",
        "name": name,
        "description": description,
        "creator": creator,
        "inLanguage": "English",
        "publisher": publisher,
        "license": license,
        "keywords": keywords,
        "url": url
    }
}

//10
export function Table({ name = _name, description = _description, about = _about, creator = _creator, publisher = _publisher, license = _license, keywords = _keywords }) {
    return {
        "@context": "https://schema.org",
        "@type": "Table",
        "name": name,
        "description": description,
        "about": about,
        "creator": creator,
        "inLanguage": "English",
        "publisher": publisher,
        "license": license,
        "keywords": keywords
    }
}

//11
export function VideoObject({ name = _name, description = _description, creator = _creator, publisher = _publisher, license = _license, keywords = _keywords }) {
    return {
        "@context": "https://schema.org/",
        "@type": "VideoObject",
        "name": name,
        "description": description,
        "creator": creator,
        "inLanguage": "English",
        "publisher": publisher,
        "license": license,
        "keywords": keywords
    }
}

//12
export function WebAPI({ name = _name, description = _description, documentation = _documentation, termsOfService = _termsOfService, provider = _provider }) {
    return {
        "@context": "https://schema.org/",
        "@type": "WebAPI",
        "name": name,
        "description": description,
        "documentation": documentation,
        "termsOfService": termsOfService,
        "provider": provider
    }
}

//13
export function WebPage({name=_name,description=_description,creator=_creator,publisher=_publisher,license=_license,keywords=_keywords,url=_url}){
    return{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": name,
        "description": description,
        "creator": creator,
        "inLanguage": "English",
        "publisher": publisher,
        "license": license,
        "keywords": keywords,
        "url": url
    }
}

//14
export function WebSite({name=_name, description=_description, creator=_creator,audienceType=_audienceType,publisher=_publisher,license=_license,keywords=_keywords,url=_url}){
    return{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": name,
        "description": description,
        "creator": creator,
        "audienceType": audienceType,
        "inLanguage": "English",
        "publisher": publisher,
        "license": license,
        "keywords": keywords,
        "url": url
    }
}

//15
export function WPHeader({name=_name,description=_description,creator=_creator,publisher=_publisher,license=_license,keywords=_keywords,url=_url}){
    return{
        "@context": "https://schema.org",
        "@type": "WPHeader",
        "name": name,
        "description": description,
        "creator": creator,
        "inLanguage": "English",
        "publisher": publisher,  
        "license": license,
        "keywords": keywords,
        "url": url
    }
}

//16
export function WPFooter({name=_name,description=_description,creator=_creator,publisher=_publisher,license=_license,keywords=_keywords,url=_url}){
    return{
        "@context": "https://schema.org",
        "@type": "WPFooter",
        "name": name,
        "description": description,
        "creator": creator,
        "inLanguage": "English",
        "publisher": publisher,
        "license": license,
        "keywords": keywords,
        "url": url
    }
}


