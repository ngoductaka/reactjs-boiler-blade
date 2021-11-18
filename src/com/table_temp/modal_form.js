
import React, { Component, useState, useEffect, useCallback } from "react";

import { findIndex, get, isEmpty } from "lodash";
import {
  Table,
  Upload,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  TimePicker, Card,
} from "antd";
import Styled from "styled-components";
import BlockUi from "react-block-ui";
import moment from "moment";

import styled from "styled-components";

import { RenderForm } from '../../../../components/RenderForm';
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
  const [dataInit, setDataInit] = useState({});
  useEffect(() => form.resetFields(), [dataInit]);

  useEffect(() => {
    if (get(visible, 'type') == 'add') {
      setDataInit({});
    } else {
      const dataEdit = get(visible, 'data', {});
      setDataInit(dataEdit)
    }
  }, [visible])

  const onFinish = async (val) => {
    _handleSubmit({ data: val, type: get(visible, 'type') })
  };

  return (
    <Modal
      // title="Order"
      visible={visible}
      style={{ top: 0 }}
      // onOk={this.handleOk}
      onCancel={onCancel}
      footer={null}
    >
      <StyledForm layout="vertical" onFinish={onFinish} form={form}
        initialValues={dataInit}>
        <RenderForm
          jsonFrom={jsonFormInput}
        // disabled={[]}
        />
        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            style={{ float: "right" }}
            htmlType="submit"
          > Submit  </Button>
        </Form.Item>
      </StyledForm>
    </Modal>
  )
};


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