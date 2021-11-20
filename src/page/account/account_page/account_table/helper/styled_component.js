import { Card, Table } from 'antd';
import styled from "styled-components";

export const CardCustom = styled(Card)`
    margin: 0px;
    padding: 0px;

    border: none;
    & .ant-card-body {
        padding: 0px 20px;
    }
    & .ant-card-head-title {
        padding: 10px 0px;
    }
    & .ant-card-extra {
        padding: 10px 0px;
    }
`;
export const TableCustom = styled(Table)`
    .ant-table-cell {
        padding: 7px 10px;
    }
    .ant-table-tbody > tr:hover td{
        background: #ddd;
    }
`;

export const TableCustom_ = styled(Table)`
    td.ant-table-cell {
    padding: 10px;
    }
    .ant-table-thead > tr >th{
        background: #aeaeae !important; 
        font-weight: 500;
        border-bottom: 1px solid #555
      }
    table th {
    background: #eee;
    }
    .ant-table-thead > tr.ant-table-row-hover td,
    .ant-table-tbody > tr.ant-table-row-hover td,
    .ant-table-thead > tr td,
    .ant-table-tbody > tr td{
        transition-property: transform;
        transition-duration: 0.5s;
    }
    .ant-table-thead > tr.ant-table-row-hover td,
    .ant-table-tbody > tr.ant-table-row-hover td,
    .ant-table-thead > tr:hover td,
    .ant-table-tbody > tr:hover td{
        background: #fff;
        transform: scale(1.04);
        border: '1px solid #000';
        /* height: 55px; */
    }
`;
