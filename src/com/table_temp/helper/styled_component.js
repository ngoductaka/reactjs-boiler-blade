import { Card, Table } from 'antd';
import styled from "styled-components";

export const CardCustom = styled(Card)`
    box-shadow: 0px 6px 14px 2px #ccc;
    margin: 10px 10px;
`;

export const TableCustom = styled(Table)`
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
