import React, { useEffect, useState } from "react";
import { getScores } from "../utils/api";

import Tables from "./Table";
import "./ReportPage.css";

var tables;

const Overlay = () => {
    return (
        <div className="row justify-content-center ">
            <div className="loader"></div>
        </div>
    );
};

const ReportPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    
    const generateTables = () => {
        const data = getScores();
        data.then((sessions)=>{
            tables = <Tables sessions={sessions}/>;
            setIsLoading(false);
        });
    };
    useEffect(() => {
        if(isLoading==true){
            generateTables();
        }
    }, [isLoading]);

    return (
        <div className={(isLoading)? "container pt-5 justify-content-md-center min-vh-100 d-flex align-items-center": "container pt-5 justify-content-md-center min-vh-100"}>
            { isLoading && <Overlay/>}
            { !isLoading && tables}
        </div>
    );
};

export default ReportPage;