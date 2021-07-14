import React, { useState } from "react";
import { Drawer, Form, Button, Col, Row, Input, message } from "antd";
import { useHistory } from "react-router-dom";
import Footer from "../../components/footer/footer";
import "./Home.css";
import { platformApi } from "../../helper/api";


function Home() {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    title: "",
    email: "",
    details: ""
  })

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {

    setLoading(true)
    console.log("Success:", values);

    platformApi.post("/saveDesign", values).
      then(res => {
        let { data } = res;

        setLoading(false)

        message.success("Application Saved!!", 3);
        history.push(`/application/${data.designId}`);
      }).
      catch(err => {
        setLoading(false)

        message.error("Something went wrong!!", 3);
      })

  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  const handleEvents = (e) => {
    setValue((pre) => {
      return {
        ...pre, [e.target.name]: e.target.value
      }
    })
  }


  return (
    <>
      <div className="home">
        <h1 className="ant-typography" style={{ margin: "0px 0px 3px" }}>
          <span style={{ color: "rgb(24, 144, 255)" }}>Quik</span>apply
        </h1>
        <span
          className="ant-typography"
          style={{
            margin: "0px",
            color: "rgb(102, 102, 102)",
            fontSize: "16px",
          }}
        >
          Bring your printed{" "}
          <span
            role="img"
            aria-label="file-text"
            className="anticon anticon-file-text"
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="file-text"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494zM504 618H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM312 490v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8z"></path>
            </svg>
          </span>{" "}
          application forms online
        </span>
        <button
          type="button"
          className="ant-btn ant-btn-primary ant-btn-lg"
          style={{ marginTop: "30px" }}
          ant-click-animating-without-extra-node="false"
          onClick={showDrawer}
        >
          <span>Design new application</span>
        </button>
      </div>
      <Drawer
        title="New Application"
        width={320}
        closable={false}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
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
                  value={value.details}
                  name="details"
                  onChange={handleEvents}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Footer />
    </>
  );
}

export default Home;
