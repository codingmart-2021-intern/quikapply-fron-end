import React, { useEffect, useState } from 'react'
import classes from "./row.module.css";
import { EditOutlined, ArrowLeftOutlined, PlusOutlined, DeleteOutlined, CheckOutlined, AlignCenterOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { Drawer, Form, Button, Col, Row, Input, Popconfirm, message, Typography } from "antd";
import { useLocation } from 'react-router-dom'
import { platformApi } from '../../helper/api';

const { Title } = Typography;
const Index = () => {
    const [visibleRow, setVisibleRow] = useState(false);
    const [visibleEditSection, setVisibleEditSection] = useState(false);
    const [visibleAddRow, setVisibleAddRow] = useState(false);
    const [visibleInputFields, setVisibleInputFields] = useState(false);
    const [secValue, setSecValue] = useState({
        sectionId: "",
        title: "",
        details: ""
    })
    const [rowValue, setRowValue] = useState({
        title: "",
        details: ""
    })

    const [count, setCount] = useState(0);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [rowIndex, setRowIndex] = useState(null)
    const [colIndex, setColIndex] = useState(null)


    const history = useHistory();
    const location = useLocation();
    const [form] = Form.useForm();

    let secId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    console.log(secId);
    let designId = location.pathname.split("/");


    console.log(designId)

    useEffect(() => {
        if (secId) {
            setPrimaryData()
        }
    }, [])


    const setPrimaryData = () => {
        platformApi.get(`/title/${secId}/sections`)
            .then(res => {
                let { data } = res;

                data.forEach(element => {

                    if (element.sectionId == secId) {
                        console.log(element);
                        setSecValue({
                            sectionId: element.sectionId, "title": element.title,
                            "details": element.details
                        })
                        form.setFieldsValue({
                            sectionId: element.sectionId, "title": element.title,
                            "details": element.details
                        });
                    }
                });


            }).catch(err => {
                history.push(`/`);
                message.error("Something went wrong!!", 3)
            })
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const onEditSection = (values) => {
        platformApi.put(`/section/edit/${secId}`, values)
            .then(res => {
                message.success("Section updated!!", 3);
                history.goBack();
            }).catch(err => {
                message.error("Section updation failed!!", 3)
            })
    }

    // add api
    const onCreateRows = (values) => {
        setVisibleRow(false)
        setVisibleAddRow(false)
        let row = [...rows];
        let obj = {}
        obj['title'] = values.title;
        obj['details'] = values.details;
        row[row.length - 1]['data'] = obj;
        console.log(row);
        setRows(row)



    }


    const done = () => {
        // history.push(`/application/${designId[2]}`)
        returnPromise().then(() => {
            history.push(`/application/${designId[2]}`)
        }).catch()

    }


    const returnPromise = () => {
        return new Promise(async(resolve, reject) => {
            for (let i = 0; i < rows.length; i++) {
                const res = await platformApi.post(`/row/save/${secId}`,
                    { title: rows[i]?.data?.title, details: rows[i]?.data?.details })
                // .then(res => {
                let { data } = res;
                let rowId = data.rowId;
                // console.log(rows)

                for (let j = 0; j < rows[i].columns.length; j++) {
                    await platformApi.post(`/columns/save/${rowId}`,
                        { type: rows[i].columns[j].inputType, inputModel: { inputType: rows[i].columns[j].inputType } })
                    // .then().catch()
                }

                // })
                // .catch(err => {

                // })
            }
            resolve({ status: true })

        })
    }


    const handleSectionEvents = (e) => {
        setSecValue((pre) => {
            return {
                ...pre, [e.target.name]: e.target.value
            }
        })
    }

    const handleRowEvents = (e) => {
        setRowValue((pre) => {
            return {
                ...pre, [e.target.name]: e.target.value
            }
        })
    }

    const onDeleteSection = () => {
        platformApi.delete(`/section/delete/${secId}`)
            .then(res => {
                message.success("Section deleted!!", 3);
                history.goBack();
            }).catch(err => {
                message.error("Section deletion failed!!", 3)
            })
    }

    const addRowstoSections = (count) => {
        setVisibleAddRow(true)
        let cols = [];
        let row = [...rows];
        setCount(count)
        for (let i = 0; i < count; i++) {
            cols.push(i);
        }
        setColumns(cols)
        let obj = {}
        obj['columns'] = cols;
        obj['count'] = count;
        row.push(obj);
        console.log(row);
        setRows(row)
    }

    const setIndexes = (row, col) => {
        setRowIndex(row);
        setColIndex(col)
        setVisibleInputFields(true)
    }

    const addInputFields = (filedName) => {
        let obj = {}
        let row = [...rows];
        let col = row[rowIndex];
        obj['inputType'] = filedName;
        col['columns'][colIndex] = obj
        row[rowIndex] = col;
        setRows(row)
        console.log(row);
        console.log(col);
        setVisibleInputFields(false)
    }




    const style = { background: '#fff', padding: '2rem 1rem' };

    return (

        <>
            <div className={classes.nav}>
                <div onClick={() => history.goBack()} style={{ cursor: "pointer" }}><ArrowLeftOutlined /> {"Go Back"}</div>
                <div>
                    <button onClick={() => setVisibleRow(true)} className={classes.primary_btn}><PlusOutlined /> Add row to Section</button>
                    <button onClick={done} className={classes.secondary_btn}> <CheckOutlined /> Done</button>
                    <button onClick={() => setVisibleEditSection(true)} className={classes.secondary_btn}> <EditOutlined /> Edit</button>
                    <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={onDeleteSection}>
                        <button className={classes.secondary_btn} href="#"><DeleteOutlined /> Remove</button>
                    </Popconfirm>
                </div>
            </div>

            {/* Section view */}

            <div style={{ padding: "1rem 2rem" }}>
                <Title style={{ color: '#000' }} level={3}>{secValue.title}</Title>
                <Title level={5}>{secValue.details}</Title>
            </div>

            {/* row */}

            <div className={classes.rows}>

                {
                    rows && rows.map((ele, index) => {


                        return (
                            <div key={index} className={classes.row} style={{ marginBottom: "2rem" }}>
                                <h2 style={{ textAlign: "left" }}>{ele?.data?.title} {"  "} <h4 style={{ textAlign: "left" }}>{ele?.data?.details}</h4> </h2>

                                < Row gutter={16} >
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
                                </Row>
                            </div>
                        )
                    })

                }
                <Button onClick={() => setVisibleRow(true)} style={{ padding: "0px 3.5rem" }} type="dashed" icon={<PlusOutlined />}>
                    Add row
                </Button>

            </div>


            {/* Add rows align */}

            <Drawer
                title="New Section"
                width={400}
                closable={false}
                onClose={() => setVisibleRow(false)}
                visible={visibleRow}
                bodyStyle={{ paddingBottom: 80 }}
            >

                <div className={classes.alignment} onClick={() => addRowstoSections(1)}>
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                </div>
                <div className={classes.alignment} onClick={() => addRowstoSections(2)}>
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                </div>
                <div className={classes.alignment} onClick={() => addRowstoSections(3)}>
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                </div>
                <div className={classes.alignment} onClick={() => addRowstoSections(4)}>
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                </div>

                {/* Add roes */}
                <Drawer
                    title="Enter row Details"
                    width={320}
                    closable={false}
                    onClose={() => setVisibleAddRow(false)}
                    visible={visibleAddRow}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form
                        layout="vertical"
                        onFinish={onCreateRows}
                        onFinishFailed={onFinishFailed}
                    >
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="title"
                                    label="Title"
                                    rules={[{ required: true, message: "Title is required" }]}
                                >
                                    <Input
                                        value={rowValue.title}
                                        name="title"
                                        onChange={handleRowEvents}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="details" label="Details">
                                    <Input.TextArea rows={3}
                                        value={rowValue.details}
                                        name="details"
                                        onChange={handleRowEvents}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </Drawer>

            </Drawer>

            {/* Edit sections */}

            <Drawer
                title="New Section"
                width={320}
                closable={false}
                onClose={() => setVisibleEditSection(false)}
                visible={visibleEditSection}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form
                    layout="vertical"
                    onFinish={onEditSection}
                    onFinishFailed={onFinishFailed}
                    form={form}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[{ required: true, message: "Title is required" }]}
                            >
                                <Input
                                    value={secValue.title}
                                    name="title"
                                    onChange={handleSectionEvents}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="details" label="Details">
                                <Input.TextArea rows={3}
                                    value={secValue.details}
                                    name="details"
                                    onChange={handleSectionEvents}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>

            {/* Add input field */}

            <Drawer
                title="New Section"
                width={400}
                closable={false}
                onClose={() => setVisibleInputFields(false)}
                visible={visibleInputFields}
                bodyStyle={{ paddingBottom: 80 }}
            >

                <div className={classes.inputAlignment} onClick={() => addInputFields("text")} >
                    Text Input
                </div>
                <div className={classes.inputAlignment} onClick={() => addInputFields("number")}>
                    Number Input
                </div>
                {/* <div className={classes.inputAlignment} onClick={() => addInputFields("checkbox")}>
                    Checkbox
                </div> */}
                {/* <div className={classes.inputAlignment} onClick={() => addInputFields("radio")}>
                    Radio
                </div> */}
                <div className={classes.inputAlignment} onClick={() => addInputFields("date")}>
                    Date Picker
                </div>
                <div className={classes.inputAlignment} onClick={() => addInputFields("file")}>
                    File Upload
                </div>

            </Drawer>

        </>
    )
}

export default Index
