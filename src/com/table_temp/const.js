import React from 'react';
import moment from 'moment';
import {
    PlusCircleOutlined, EditOutlined, DeleteOutlined,
} from "@ant-design/icons";

export const columnInitTable = [
    {
        title: "Id",
        key: "id",
        dataIndex: 'id',

        // render: (val) => {
        //     return (
        //         <div
        //             style={{
        //                 padding: 12,
        //                 height: 50,
        //                 background: COLOR[val.state],
        //             }}
        //         >
        //             <span>{val.id}</span>
        //         </div>
        //     );
        // },
    },

    {
        title: "Name",
        key: "name",
        dataIndex: 'name',
    },
    {
        title: "Location",
        key: "location",
        dataIndex: 'location',
    },
    {
        title: "Position",
        key: "position",
        dataIndex: 'position',
    },
    {
        title: "Category",
        key: "category",
        dataIndex: 'category',
    },
    {
        title: "Customer",
        key: "customer",
        dataIndex: 'customer',
    },
    {
        title: "Freq",
        key: "freq",
        dataIndex: 'freq',
    },
    {
        title: "Weight",
        key: "weight",
        dataIndex: 'weight',
    },
    {
        title: "Size",
        key: "size",
        dataIndex: 'size',
    },
    // {
    //     title: "capacity",
    //     key: "capacity",
    //     dataIndex: 'capacity',
    // },
    {
        title: "Date time",
        key: "timestamp",
        dataIndex: 'timestamp',

        render: (val) => {
            try {

                if (!val) return null;
                const t = moment(val).format('DD-MM-YYYY HH:mm:ss');
                return (
                    <span>{t}</span>
                );
            } catch (err) {
                return (
                    <span>{val}</span>
                );
            }
        },
    },
]

export const action = [
    {
        name: "Edit",
        title: "Edit",
        Icon: () => <EditOutlined style={{ fontSize: 25 }} />,
    },
    {
        name: "Delete",
        title: "Delete",
        Icon: () => <DeleteOutlined style={{ fontSize: 25 }} />,
    },
    {
        name: "Duplicate",
        title: "Duplicate",
        Icon: () => <PlusCircleOutlined style={{ fontSize: 25 }} />,
    },
]

export const json_form_init = [
    {
        name: "id",
        label: "Id",
        rules: [{ required: true }],
        // type: 'select',
        // data: []
    },
    {
        name: "name",
        label: "Name",
        rules: [{ required: true }],
    },
    {
        name: "location",
        label: "Location",
        rules: [{ required: true }],
        type: 'select',
    },
    {
        name: "position",
        label: "Position",
        // rules: [{ required: true }],
    },
    {
        name: "category",
        label: "Category",
        // rules: [{ required: true }],
    },
    {
        name: "customer",
        label: "Customer",
        // rules: [{ required: true }],
    },
    {
        name: "freq",
        label: "Freq",
        // rules: [{ required: true }],
    },
    {
        name: "weight",
        label: "Weight",
        // rules: [{ required: true }],
        type: 'number',

    },
    {
        name: "size",
        label: "Size",
        // rules: [{ required: true }],
        type: 'number',
    },
    // {
    //   name: "capacity",
    //   label: "capacity",
    //   // rules: [{ required: true }],
    // },
    {
        name: "timestamp",
        label: "Timestamp",
        type: "PickDateTime",
        // rules: [{ required: true }],
    },
];
