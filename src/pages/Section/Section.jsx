import React, { useEffect, useState } from 'react';
import { platformApi } from '../../helper/api';
import { useLocation } from 'react-router-dom'
import classes from "./section.module.css";
import { Col, Row, Input, Spin, } from "antd";
import { PlusSquareOutlined } from '@ant-design/icons';


const Section = ({ designId, sec, loading }) => {

    const location = useLocation();
    let designIds = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);



    const style = { background: '#fff', padding: '2rem 1rem', cursor: "not-allowed" };

    return (
        <>

            {loading ? <Spin size="large" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }} /> :
                <div style={{ textAlign: "center", marginTop: "5rem", }}>
                    {
                        sec.length > 0 ? (

                            <div className={classes.rows} style={{ marginBottom: "10px" }}>

                                {
                                    sec && sec.map((ele, index) => {


                                        return (
                                            <div key={index} className={classes.row} style={{ marginBottom: "2rem" }}>
                                                <h1 style={{ textAlign: "left", marginBottom: "10px" }}>{ele?.title} {"  "}
                                                    {/* <h4 style={{ textAlign: "left" }}>{ele?.rows?.sections?.details}</h4> */}
                                                </h1>
                                                {ele.rows && ele.rows.length > 0 && ele.rows.map((val, i) => {
                                                    return < Row gutter={16} key={i} style={{ marginBottom: "15px" }}  >
                                                        {val.columns && val.columns.length > 0 && val.columns.map((value, ind) => {
                                                            return <Col key={ind} className={classes.col} span={24 / val.columns.length}>
                                                                <div style={style}  >
                                                                    {value?.type ? <Input
                                                                        disabled={true}
                                                                        placeholder="Enter the Details"
                                                                        type={val.inputType}
                                                                    /> :
                                                                        <PlusSquareOutlined style={{ color: "#1890ff", fontSize: "1.5rem" }} />
                                                                    }
                                                                </div>
                                                            </Col>
                                                        })
                                                        }
                                                    </Row>
                                                })
                                                }
                                            </div>
                                        )
                                    })

                                }

                            </div>

                        ) :
                            < h1 style={{ fontWeight: "bold" }}> Add your first section </h1>
                    }
                </div>
            }

        </>
    )
}

export default Section;