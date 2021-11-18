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
    TimePicker, Card
} from "antd";
import styled from "styled-components";

const ModalAction = ({
    visibleData = false,
    onClose=() => {},
    listAction,
    _handleSelectAction=() => {},
}) => {
    // return null;
    return (
        <Modal
            title={"Action for " + get(visibleData, "id", "")}
            centered
            visible={visibleData}
            onCancel={onClose}
            footer={null}
            // style={{width: 250}}
            width={800}
        >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                {listAction && listAction.map((action) => {
                    return (
                        <DivAction
                            key={action.name}
                            onClick={() => _handleSelectAction({ data: visibleData, type: action.name }) }
                        >
                            {action.Icon()}
                            {action.title}
                        </DivAction>
                    );
                })}
            </div>
        </Modal>
    )
}



const DivAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 120px;
  cursor: pointer;

  transition-property: transform;
  transition-duration: 1s;

  &:hover {
    transform: scale(1.1);
    border: 1px solid green;
  }
`;


export default ModalAction;