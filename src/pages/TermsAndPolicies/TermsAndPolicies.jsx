import React, { useEffect, useState } from 'react';
import RichTextEditor from 'react-rte';
import classes from "./termsandpolicies.module.css";
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { message, Radio } from 'antd';
import { useHistory } from "react-router-dom";
import { platformApi } from '../../helper/api';
import { useLocation } from 'react-router-dom'



function TermsAndPolicies() {

    const history = useHistory();
    const [terms, setTerms] = useState(RichTextEditor.createEmptyValue());
    const [policies, setPolicies] = useState(RichTextEditor.createEmptyValue());
    const [sig, setSig] = useState(true);
    const [val, setVal] = useState();

    const location = useLocation();

    let designId = location.pathname.split("/");

    useEffect(() => {
        platformApi.get(`/title/${designId[2]}`)
            .then(res => {
                let { data } = res;
                // setTerms(data.terms || "");
                // setPolicies(data.policies | "")
                // form.setFieldsValue(data);
                setSig(data.signature_enabled)
                setVal(data)
                console.log(data)

            }).catch(err => {
                history.push(`/`);
                message.error("Something went wrong!!", 3)
            })
    }, [])


    const onSave = () => {
        let obj = { ...val };
        obj['signature_enabled'] = sig;
        console.log(obj)
        platformApi.put(`/updateDesign/${designId[2]}`, obj)
        message.success("Application saved!!", 2)
    }


    const onChange = (e) => {
        if (e.target.value == 1) {
            setSig(true)
        }
        else {
            setSig(false)
        }
    }

    return (
        <>
            <div className={classes.header}>
                <div
                    onClick={() => history.goBack()}
                    style={{ cursor: "pointer" }}
                >
                    <ArrowLeftOutlined /> {"Terms and Policies"}
                </div>
                <div>
                    <button
                        onClick={onSave}
                        className={classes.primary_btn}
                    >
                        <SaveOutlined /> Save
                    </button>
                </div>
            </div>

            <div className={classes.comments}>
                <div className={classes.rte}>
                    <div className={classes.editor}>
                        <h2 style={{ fontWeight: "bold" }}>Terms</h2>
                        <RichTextEditor
                            value={terms}
                        // onChange={onChange}
                        />
                    </div>

                    <div className={classes.editor}>
                        <h2 style={{ fontWeight: "bold" }}>Policies</h2>
                        <RichTextEditor
                            value={policies}
                        // onChange={onChange}
                        />
                    </div>

                    <div className={classes.editor}>
                        <h2 style={{ fontWeight: "bold" }}>Required Signature?</h2>
                        <Radio.Group name="radiogroup" value={sig ? 1 : 2} onChange={(e) => onChange(e)}>
                            <Radio value={1}>Enabled</Radio>
                            <Radio value={2}>Disabled</Radio>
                        </Radio.Group>

                    </div>

                </div>
                <div>{""}</div>
            </div>


        </>
    )
}

export default TermsAndPolicies;