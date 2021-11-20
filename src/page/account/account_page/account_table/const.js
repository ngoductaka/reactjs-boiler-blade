import React from 'react';
import moment from 'moment';
import {
  PlusCircleOutlined, EditOutlined, DeleteOutlined,
} from "@ant-design/icons";

export const ENDPOINT = 'user';
export const TITLE_TABLE = "Accounts"


export const columnInitTable = [
  {
    title: "Mã đăng nhập",
    key: "username",
    dataIndex: 'username',
  },

  {
    title: "Tên",
    key: "name",
    dataIndex: 'name',
  },
  {
    title: "email",
    key: "email",
    dataIndex: 'email',
  },
  {
    title: "Số điện thoại",
    key: "phone",
    dataIndex: 'phone',
  },
  {
    title: "Chức năng",
    key: "role_id",
    dataIndex: 'role_id',
  },
  {
    title: "Mô tả",
    key: "description",
    dataIndex: 'description',
  },
  // {
  //     title: "active",
  //     key: "active",
  //     dataIndex: 'active',
  //     render: (val) => {
  //     return <span>{val+''}</span>
  //     }
  // },
  // {
  //     title: "notes",
  //     key: "notes",
  //     dataIndex: 'notes',
  // },
];
export const jsonFormFilterInit = [
  {
    name: "name",
    label: "Tên",
  },
]

export const jsonFormInit = [
  {
    name: "username",
    label: "Mã đăng nhập",
    rules: [{ required: true }],
  },
  {
    name: "name",
    label: "Tên",
    rules: [{ required: true }],
  },
  {
    name: "email",
    label: "email",
    rules: [{ required: true }],
  },
  {
    name: "password",
    label: "Mật khẩu",
    rules: [{ required: true }],
  },
  {
    name: "phone",
    // type: 'number',
    label: "Số điện thoại",
    rules: [{ type: 'number' }]
  },
  {
    name: "role_id",
    label: "Chức năng",
    type: 'select',
    data: [{
      id: '2'
    }],
    rules: [{ required: true }],
  },
  {
    name: "description",
    label: "Mô tả",
    // rules: [{ required: true }],
  },

];

export const ACT_TYPE = {
  "ADD": "ADD",
  "EDIT": "EDIT",
  "DUP": "DUP",
  "DEL": "DEL",
}
export const action = [
  {
    name: ACT_TYPE.EDIT,
    title: "Edit",
    Icon: () => <EditOutlined style={{ fontSize: 25 }} />,
  },
  {
    name: ACT_TYPE.DEL,
    title: "Delete",
    Icon: () => <DeleteOutlined style={{ fontSize: 25 }} />,
  },
  {
    name: ACT_TYPE.DUP,
    title: "Duplicate",
    Icon: () => <PlusCircleOutlined style={{ fontSize: 25 }} />,
  },
]

