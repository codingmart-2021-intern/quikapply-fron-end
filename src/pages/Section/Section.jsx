import React, { useEffect, useState } from 'react';
import { platformApi } from '../../helper/api';
import { useLocation } from 'react-router-dom'

const Section = () => {

    const location = useLocation();
    let designId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);




    useEffect(() => {
        platformApi.get("/columns").then(res => {
            let { data } = res;

            console.log(data)
            let arr = [];
            let sections = [];
            let rows = [];
            let columns = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i]?.rows?.sections?.design?.designId == designId) {
                    arr.push(data[i])
                }
            }
            console.log(arr);
            for (let j = 0; j < arr.length; j++) {
                sections.push(arr[j]?.rows?.sections?.sectionId)
            }

            for (let j = 0; j < arr.length; j++) {
                rows.push(arr[j]?.rows?.rowId)
            }

            for (let j = 0; j < arr.length; j++) {
                columns.push(arr[j].columnId)
            }

            console.log(sections, rows, columns);

            sections = [...new Set(sections)];
            rows = [...new Set(rows)];
            columns = [...new Set(columns)];

            console.log(sections, rows, columns);

        }).catch()
    }, [])

    return (
        <>
            <div style={{ textAlign: "center", marginTop: "9rem" }}>
                <h1 style={{ fontWeight: "bold" }}> Add your first section </h1>
            </div>

        </>
    )
}

export default Section;