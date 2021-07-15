import React, { useEffect, useState } from 'react';
import classes from "./quick.module.css";
import { useLocation } from 'react-router-dom'
import { Col, Row, Input, } from "antd";
import { PlusSquareOutlined } from '@ant-design/icons';
import { platformApi } from '../../helper/api';


const Index = () => {

    const location = useLocation();
    let designId = location.pathname.split("/");

    const [sec, setSec] = useState([]);

    useEffect(() => {

        platformApi.get(`/title/${designId[2]}`)
            .then(res => {
                let { data } = res;
                setSec(data.sections)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])


    const style = { background: '#fff', padding: '2rem 1rem', cursor: "not-allowed" };


    return (


        <div style={{ textAlign: "center", marginTop: "2rem", }}>
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
                                            return < Row gutter={16} style={{ marginBottom: "15px" }}  >
                                                {val.columns && val.columns.length > 0 && val.columns.map((value, ind) => {
                                                    return <Col key={i} className={classes.col} span={24 / val.columns.length}>
                                                        <div style={style}  >
                                                            {value?.type ? <Input
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
                        {/* <Button onClick={() => setVisibleRow(true)} style={{ padding: "0px 3.5rem" }} type="dashed" icon={<PlusOutlined />}>
                        Add row
                    </Button> */}

                    </div>

                ) :
                    ""
            }
             <Button type="primary" style={{float:"right",marginRight:"1rem"}}>Submit</Button>
        </div>

    )
}

export default Index;
