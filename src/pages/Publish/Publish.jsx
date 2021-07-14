import React from 'react';
import { Result, Button, Input, message } from 'antd';
import { useLocation } from 'react-router-dom'
import { CopyOutlined } from '@ant-design/icons';

function Publish() {

    const location = useLocation();
    let designId = location.pathname.split("/");


    const copyToClipBoard = () => {
        message.success("Copied to clipboard", 2)
        navigator.clipboard.writeText(`https://quickapp-front.herokuapp.com/application/${designId[2]}/quick`)
    }


    return (
        <>
            <div >
                <div style={{ textAlign: "center", background: "#E6F7FF", border: "1px solid blue", padding: ".7rem" }}>
                    Be sure to save your apply links somewhere. After leaving or reloading this page you won't have access to them again.
                </div>
                <Result
                    style={{ background: "rgb(240, 242, 245)" }}
                    status="success"
                    title="Your application has been published"
                    subTitle="You can now copy and begin sharing the following apply links"
                    extra={[
                        <Input style={{ width: "17%" }} value={`https://quickapp-front.herokuapp.com/application/${designId[2]}/quick`} />
                        ,
                        <Button
                            onClick={copyToClipBoard}
                            key="buy"> <CopyOutlined /> {" "}Copy Quick Link</Button>,
                    ]}
                />,


                <div style={{ textAlign: "center", fontSize: '20px' }}>
                    Thanks for using Quikapply
                </div>
            </div>

        </>
    )
}

export default Publish;