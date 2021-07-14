import React, { useEffect, useState } from 'react';
import classes from "./application.module.css";
import { Drawer, Form, Button, Col, Row, Input, message } from "antd";
import { EditOutlined, PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Section from '../Section/Section';
import { useHistory } from "react-router-dom";
import { platformApi } from '../../helper/api';
import { useLocation } from 'react-router-dom'



const Application = () => {
    const [visible, setVisible] = useState(false);
    const [visibleSection, setVisibleSection] = useState(false);
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const location = useLocation();
    const [form] = Form.useForm();
    const [value, setValue] = useState({
        designId: "",
        title: "test",
        email: "",
        details: ""
    })

    const [secValue, setSecValue] = useState({
        title: "test",
        details: ""
    })

    let designId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    
    

    useEffect(() => {
        if (designId) {
            setPrimaryData()
        }
    }, [])


    const setPrimaryData = () => {
        platformApi.get(`/title/${designId}`)
            .then(res => {
                let { data } = res;
                setValue(data)
                form.setFieldsValue(data);

            }).catch(err => {
                history.push(`/`);
                message.error("Something went wrong!!", 3)
            })
    }


    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const onEditTitle = (values) => {
        setLoading(true)
        if (value.designId) {
            platformApi.put(`/updateDesign/${value.designId}`, values)
                .then(res => {
                    let { data } = res;
                    setPrimaryData()
                    setVisible(false)
                    setLoading(false)
                    message.success("Application Data updated !!", 3)
                }).catch(err => {
                    setLoading(false)
                    message.error("Something went wrong!!", 3)
                })
        }
    };


    const handleEvents = (e) => {
        setValue((pre) => {
            return {
                ...pre, [e.target.name]: e.target.value
            }
        })
    }


    const handleSectionEvents = (e) => {
        setSecValue((pre) => {
            return {
                ...pre, [e.target.name]: e.target.value
            }
        })
    }

    // have to change
    const onSaveSection = (values) => {
        platformApi.post(`section/save/${value.designId}`, values).
            then((res) => {
                let { data } = res;
                message.success("Sections added!!", 3)
                history.push(`/application/${value.designId}/section/${data.sectionId}`);
            }).catch(err => {
                message.error("error in saving sections!!", 3)
            })
    }


    return (
        <>
            <div style={{ display: "flex" }}>


                <div className={classes.application_page}>

                    <div className={classes.nav}>
                        <div style={{ textTransform: 'capitalize' }}>{value.title}</div>
                        <div>
                            <button onClick={() => setVisibleSection(true)} className={classes.primary_btn}><PlusOutlined /> Add Section</button>

                            <button onClick={() => setVisible(true)} className={classes.secondary_btn}> <EditOutlined /> Edit</button>
                        </div>
                    </div>


                    <Section />

                </div>


                <div className={classes.application_page_right}>
                    <div style={{ padding: "1.25rem 0" }}>
                        <span className={classes.sections}> <UnorderedListOutlined /> Section</span>
                    </div>
                    {/* List of sections */}


                    <span
                        onClick={() => history.push("/application/:title/terms-and-policies")}
                        className={classes.terms}
                    >
                        <EditOutlined /> Terms & Policies
                    </span>
                </div>

            </div>


            {/* Edit Application */}

            <Drawer
                title="Edit Application"
                width={320}
                closable={false}
                onClose={() => setVisible(false)}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form
                    layout="vertical"
                    onFinish={onEditTitle}
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
                                    value={value.title}
                                    name="title"
                                    onChange={handleEvents}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="email"
                                label="Email"
                                tooltip="The email address submissions will be sent to."
                                rules={[{ required: true, message: "Email is required" }]}
                            >
                                <Input
                                    value={value.email}
                                    name="email"
                                    onChange={handleEvents}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="details" label="Details">
                                <Input.TextArea
                                    rows={3}
                                    rows={3}
                                    value={value.details}
                                    name="details"
                                    onChange={handleEvents}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button on type="primary" htmlType="submit" loading={loading}>
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>

            {/* Add sections */}

            <Drawer
                title="New Section"
                width={320}
                closable={false}
                onClose={() => setVisibleSection(false)}
                visible={visibleSection}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form
                    layout="vertical"
                    onFinish={onSaveSection}
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
                                <Input.TextArea
                                    value={secValue.details}
                                    name="details"
                                    onChange={handleSectionEvents}
                                    rows={3} />
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


        </>
    )
}

export default Application;