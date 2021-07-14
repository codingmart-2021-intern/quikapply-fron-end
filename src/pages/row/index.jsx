import React, { useEffect, useState } from 'react'
import classes from "./row.module.css";
import { EditOutlined, ArrowLeftOutlined, PlusOutlined, DeleteOutlined, CheckOutlined, AlignCenterOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { Drawer, Form, Button, Col, Row, Input, Popconfirm, message } from "antd";
import { useLocation } from 'react-router-dom'
import { platformApi } from '../../helper/api';

const Index = () => {
    const [visibleRow, setVisibleRow] = useState(false);
    const [visibleEditSection, setVisibleEditSection] = useState(false);
    const [visibleInputFields, setVisibleInputFields] = useState(false);
    const [secValue, setSecValue] = useState({
        sectionId: "",
        title: "test",
        details: ""
    })
    const history = useHistory();
    const location = useLocation();
    const [form] = Form.useForm();

    let secId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    console.log(secId);


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

    const handleSectionEvents = (e) => {
        setSecValue((pre) => {
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

    return (
        <>
            <div className={classes.nav}>
                <div onClick={() => history.goBack()} style={{ cursor: "pointer" }}><ArrowLeftOutlined /> {"Nav"}</div>
                <div>
                    <button onClick={() => setVisibleRow(true)} className={classes.primary_btn}><PlusOutlined /> Add row to Section</button>
                    <button onClick={() => history.push(`/application/1`)} className={classes.secondary_btn}> <CheckOutlined /> Done</button>
                    <button onClick={() => setVisibleEditSection(true)} className={classes.secondary_btn}> <EditOutlined /> Edit</button>
                    <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={onDeleteSection}>
                        <button className={classes.secondary_btn} href="#"><DeleteOutlined /> Remove</button>
                    </Popconfirm>
                </div>
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

                <div className={classes.alignment}>
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                </div>
                <div className={classes.alignment}>
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                </div>
                <div className={classes.alignment}>
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                </div>
                <div className={classes.alignment}>
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                    <AlignCenterOutlined style={{ fontSize: "4rem", color: "#777" }} />
                </div>


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

                <div className={classes.inputAlignment}>
                    Text Input
                </div>
                <div className={classes.inputAlignment}>
                    Number Input
                </div>
                <div className={classes.inputAlignment}>
                    Checkbox
                </div>
                <div className={classes.inputAlignment}>
                    Radio
                </div>
                <div className={classes.inputAlignment}>
                    Date Picker
                </div>
                <div className={classes.inputAlignment}>
                    File Upload
                </div>

            </Drawer>


        </>
    )
}

export default Index
