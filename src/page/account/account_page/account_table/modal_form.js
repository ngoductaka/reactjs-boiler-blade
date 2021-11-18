
import React, { Component, useState, useEffect, useCallback, useMemo } from "react";

import { findIndex, get, isEmpty } from "lodash";
import {
  Table,
  Upload,
  Button,
  Modal, Space,
  Form, Drawer,
  Input,
  Select,
  DatePicker,
  InputNumber,
  TimePicker, Card,
} from "antd";

import styled from "styled-components";

import { RenderForm } from './helper/render_form';
import { ACT_TYPE } from "./const";
// import openNotificationWithIcon from "../../../../utils/noti";
// import openNotificationWithIcon from "../../utils/noti";


const ModalForm = ({
  visible,
  jsonFormInput,
  loading = false,
  onCancel,
  _handleSubmit,
}) => {
  const [form] = Form.useForm();
  const type = useMemo(() => get(visible, 'type', 'add'), [visible]);
  const dataInit = useMemo(() => get(visible, 'data', {}), [visible]);

  useEffect(() => form.resetFields(), [dataInit]);

  const onFinish = async (val) => {
    // pre handle submit

    // submit
    _handleSubmit({ data: val, type })
  };

  return (
    <Drawer title={false} placement={'right'} closable={false} onClose={onCancel} visible={visible} width={500}>
      <StyledForm layout="vertical" onFinish={onFinish} form={form} initialValues={dataInit}>
        <Form.Item> <Header loading={loading} type={type} _handleReset={() => form.resetFields()} /></Form.Item>
        <RenderForm jsonFrom={jsonFormInput} type={type} />
      </StyledForm>
    </Drawer>
  )
};

const Header = ({ loading, type, _handleReset = () => { } }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: 10 }}>
      <span style={{ fontSize: 18, fontWeight: '500' }}>{type === ACT_TYPE.EDIT ? "Chỉnh sửa" : "Thêm mới"}</span>
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