
import React, { useEffect, useMemo } from "react";
import { get } from "lodash";
import { Button, Form, Drawer } from "antd";
import styled from "styled-components";

import { RenderForm } from './helper/render_form';
const ModalForm = ({
    visible,
    jsonFormInput,
    _onClose,
    _onSubmit,
}) => {
    const [form] = Form.useForm();
    const dataInit = useMemo(() => get(visible, 'data', {}), [visible]);

    useEffect(() => form.resetFields(), [dataInit]);

    const onFinish = async (val) => {
        try {
            // pre handle submit
            await _onSubmit(val)
            _onClose()
        } catch (err) {
            _onClose()
        }
    };

    return (
        <Drawer title={false} placement={'right'} closable={false} onClose={_onClose} visible={visible} width={500}>
            <StyledForm layout="vertical" onFinish={onFinish} form={form} initialValues={dataInit}>
                <Form.Item> <Header loading={false} _handleReset={() => form.resetFields()} /></Form.Item>
                <RenderForm jsonFrom={jsonFormInput} />
            </StyledForm>
        </Drawer>
    )
};

const Header = ({ loading, type, _handleReset = () => { } }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: 10 }}>
            <span style={{ fontSize: 18, fontWeight: '500' }}>Bộ lọc</span>
            <div>
                <Button
                    loading={loading}
                    type="primary"
                    style={{
                        float: "left",
                        borderRadius: 5, marginLeft: 13, marginTop: 6
                    }}
                    htmlType="submit"
                > Submit  </Button>
                <Button
                    loading={loading}
                    onClick={_handleReset}
                    // type="primary"
                    style={{
                        float: "left",
                        borderRadius: 5, marginLeft: 13, marginTop: 6
                    }}
                > Reset  </Button>
            </div>
        </div>
    )
}


const StyledForm = styled(Form)`
  .ant-modal-body {
    padding: 0px 24px 24px 24px;
    background: red;
  }

  .ant-form-item {
    margin-bottom: 4px;
  }
`;


export default ModalForm;