import React, { useEffect, useState } from 'react';
import { platformApi } from '../../helper/api';
import { useLocation } from 'react-router-dom'
import classes from "./section.module.css";

const Section = ({ designId }) => {

    const location = useLocation();
    // let designId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

    const [sec, setSec] = useState([]);


    useEffect(() => {

        // console.log(designId,"designId")
        // platformApi.get("/columns").then(res => {
        //     let { data } = res;

        //     console.log("data"+data)
        //     let arr = [];
        //     let sections = [];
        //     let rows = [];
        //     let columns = [];

        //     let val = [];
        //     for (let i = 0; i < data.length; i++) {
        //         if (data[i]?.rows?.sections?.design?.designId == designId) {
        //             arr.push(data[i])
        //         }
        //     }
        //     console.log(arr);
        //     for (let j = 0; j < arr.length; j++) {
        //         sections.push(arr[j]?.rows?.sections?.sectionId)
        //     }

        //     for (let j = 0; j < arr.length; j++) {
        //         rows.push(arr[j]?.rows?.rowId)
        //     }

        //     for (let j = 0; j < arr.length; j++) {
        //         columns.push(arr[j].columnId)
        //     }

        //     console.log(sections, rows, columns);

        //     sections = [...new Set(sections)];
        //     rows = [...new Set(rows)];
        //     columns = [...new Set(columns)];

        //     // obj

        //     for (let j = 0; j < sections.length; j++) {
        //         for (let i = 0; i < arr.length; i++) {
        //             if (sections[j] == arr[j]?.rows?.sections?.sectionId) {
        //                 val.push(arr[j])
        //             }
        //         }

        //     }

        //     console.log(val)

        //     setSec(val)

        // }).catch()


        platformApi.get("/title/4/sections").then(res => {
            let { data } = res;
            let arr = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i]?.design?.designId == designId) {
                    arr.push(data[i])
                }
            }

            setSec(arr)
        }).catch()

    }, [])

    return (
        <>
            <div style={{ textAlign: "center", marginTop: "5rem" }}>
                {
                    sec.length > 0 ? (

                        <div className={classes.rows} style={{marginBottom:"10px"}}>

                            {
                                sec && sec.map((ele, index) => {


                                    return (
                                        <div key={index} className={classes.row} style={{ marginBottom: "2rem" }}>
                                            <h1 style={{ textAlign: "left" ,marginBottom:"10px"}}>{ele?.title} {"  "}
                                                {/* <h4 style={{ textAlign: "left" }}>{ele?.rows?.sections?.details}</h4> */}
                                            </h1>

                                            {/* < Row gutter={16} >
                                                {ele.columns && ele.columns.length > 0 && ele.columns.map((val, i) => {
                                                    return <Col key={i} className={classes.col} span={24 / ele.count}>
                                                        <div style={style} >
                                                            {val?.inputType ? <Input
                                                                placeholder="Enter the Details"
                                                                type={val.inputType}
                                                            /> :
                                                                <PlusSquareOutlined onClick={() => setIndexes(index, i)} style={{ color: "#1890ff", fontSize: "1.5rem" }} />
                                                            }
                                                        </div>
                                                    </Col>
                                                })
                                                }
                                            </Row> */}
                                        </div>
                                    )
                                })

                            }
                            {/* <Button onClick={() => setVisibleRow(true)} style={{ padding: "0px 3.5rem" }} type="dashed" icon={<PlusOutlined />}>
                                Add row
                            </Button> */}

                        </div>

                    ) :
                        < h1 style={{ fontWeight: "bold" }}> Add your first section </h1>
                }
            </div>

        </>
    )
}

export default Section;