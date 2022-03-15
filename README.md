# RegulonDB High Throughput Collection

welcome, n.n/

version 0.8.1

# Description

A web application developed with react. RegulonDB HT Web presents the breakdown of the information of different types of datasets, the application consumes the web services of RegulonDB-HT GraphQL API, so to install this application on your server is a mandatory requirement. The application has several tools for data visualization and filtering.

# Motivation

Bioinformatics is a multidisciplinary science, full of great challenges and much to explore. The RegulonDB frontend development team seeks to present the biological information contained in our database with the best user experience, our goal is to innovate in the presentation of information.

# Hardware requirements

## Server

minimum requirements

-   CPU > 2 GHz, 4 cores
-   RAM > 8Gb
-   Space on disk > 5 Gb
-   A connection to the Internet if RegulonDB-HT GraphQL API is not installed on the server

## Client

This application is rendered client-side so a client with a good device should have no problems viewing the information.

minimum requirements

-   CPU > 1.5 GHz, 2 cores
-   RAM > 2 Gb
-   Space on disk > 5 Gb if you want to install it for offline use
-   A connection to the Internet

**Warning** At the moment this application is only designed for desktop computers the experience on mobile devices may not be the best.

# Software Requirements

## server:

-   RegulonDB-HT GraphQL API
-   RegulonDB - Web Data Process Service
-   Node JS ^16.13.0
-   NPM ^8.1.4

## Client

-   Chrome 60+
-   Safari 10+ / iOS Safari 10+*
-   Edge 12+
-   Firefox ESR+
-   Internet Explorer 11*
-   Opera

*The application design may contain slight changes that do not affect functionality.

# Installation

**Step 1 download project**
You need to download this repository, in its master branch,

    $ git clone https://github.com/regulondbunam/RegulonDBHT-Web.git
    
  You can also download the zip file from the repository and unzip it to a designated location

**Step 2 install dependencies**
Enter the project directory and install the required libraries with the following command

    $ npm install

**Step 3 configuration**
At the root of the project, you will find the .env-sample file where you will find the information to declare the environment variables so that the application can connect to the regulonDB web services.

duplicate the .env-sample file and rename it to .env and add the information requested in the .env-sample file.

``` 
#rename this file to '.env' when the fields have been filled
# REACT_APP_WEB_SERVICE_URL = is the url where the web service is located
# REACT_APP_WEB_SERVICE_URL = "url of RegulonDB-HT GraphQL API"
# REACT_APP_PROSSES_SERVICE = "url of RegulonDB - Web Data Process Service"
# REACT_APP_IP = is the public ip address of the domain
# REACT_APP_DOMAIN_NAME = is the name of the web domain

REACT_APP_WEB_SERVICE_URL = ""
REACT_APP_PROSSES_SERVICE = ""
REACT_APP_IP = "0.0.0.0"
REACT_APP_DOMAIN_NAME = ""
```
**Step 4 start service**
 You can find more information on how to implement this application in the following link [cra-deployment](https://create-react-app.dev/docs/deployment)
 
For environments using  [Node](https://nodejs.org/), the easiest way to handle this would be to install  [serve](https://github.com/vercel/serve)  and let it handle the rest:
```
npm install -g serveserve -s build
```
Copy
The last command shown above will serve your static site on the port  **3000**. Like many of  [serve](https://github.com/vercel/serve)’s internal settings, the port can be adjusted using the  `-l`  or  `--listen`  flags:
```
serve -s build -l 4000
```
Copy
Run this command to get a full list of the options available:

```
serve -h
```
