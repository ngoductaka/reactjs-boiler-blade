import React, { useState, useEffect } from "react";
import { Pagination, Input, Button, Upload } from "antd";
import {
    PlusOutlined, DeleteOutlined, FilterOutlined, ReloadOutlined, UploadOutlined
} from "@ant-design/icons";
import { get } from 'lodash';
import axios from 'axios';

// local com
import { openNotificationWithIcon } from "./helper/notification_antd";
import { handleErr } from "./helper/handle_err_request";
import { CardCustom, TableCustom } from "./helper/styled_component";
import ModalForm from './modal_form';
import FilterForm from './filter_form';
// 
import {
    columnInitTable, jsonFormInit, jsonFormFilterInit,
    TITLE_TABLE, ACT_TYPE
} from './const';
import * as services from "./services";

const TableFunction = (props) => {
    const [loading, setLoading] = useState(false);
    const [dataTable, setDataTable] = useState([]);
    // data handle
    const [jsonForm, setJsonForm] = useState(jsonFormInit);
    const [jsonFormFilter, setJsonFormFiter] = useState(jsonFormFilterInit);
    const [selectedRow, setSelectRow] = useState([]);
    // Pagination
    const [pageInfo, setPageInfo] = useState({
        current: 1,
        number_of_page: 15,
    });
    console.log('pageInfo', pageInfo)
    // modal
    const [showFilter, setShowFilter] = useState(false);
    const [showFormData, setShowFormData] = useState(false);

    useEffect(() => {
        _requestDataTable();
    }, []);
    const _handleChangePage = (current, number_of_page) => {
        _requestDataTable({
            current,
            number_of_page,
        })
    }

    const _handleChangeJsonForm = React.useCallback((column, data) => {
        const newJsonForm = jsonForm.map(i => {
            if (i.name == column) i.data = data;
            return i
        });
        setJsonForm(newJsonForm);
    }, []);

    const _requestDataTable = async (params = {}) => {
        try {
            const pageQuery = {
                current: pageInfo.current,
                number_of_page: pageInfo.number_of_page,
            };
            const query = {
                ...pageQuery,
                ...params,
            };
            setLoading(true);
            const { data } = await services.get(query);
            setLoading(false);
            let dataTableConvert = [];
            if (data.data) {
                setPageInfo({ ...pageInfo, ...data.page_info });
                dataTableConvert = data.data.map(i => {
                    i.key = i.id
                    return i
                })
            }
            setDataTable(dataTableConvert);
            return dataTableConvert;
        } catch (err) {
            setLoading(false);
            handleErr(err);
        }

    }
    const _handleDel = React.useCallback(() => {
        console.log(selectedRow)
    }, [selectedRow])

    return (
        <div style={{}}>
            <CardCustom
                title={TITLE_TABLE}
                extra={<Extra
                    loading={loading} showDel={selectedRow && selectedRow[0]}
                    _onReload={_requestDataTable}
                    _handleDel={_handleDel}
                    _onFilter={() => setShowFilter(!showFilter)}
                    _onClickAdd={() => setShowFormData({ type: ACT_TYPE.ADD })}
                />}>
                <TableCustom
                    dataSource={dataTable}
                    columns={columnInitTable}

                    loading={loading}
                    scroll={{ y: 'calc(100vh - 190px)' }}
                    pagination={false}

                    rowSelection={{
                        type: 'checkbox',
                        onChange: setSelectRow,
                        selectedRowKeys: selectedRow
                    }}

                    onRow={(r) => ({ onClick: () => setShowFormData({ type: ACT_TYPE.EDIT, data: r }) })}
                />
                <Pagination
                    showSizeChanger
                    pageSizeOptions={[5, 10, 15, 20, 25, 50, 100]}
                    style={{ marginTop: 10, float: 'right' }}
                    current={pageInfo.current}
                    onChange={_handleChangePage}
                    pageSize={Number(pageInfo.number_of_page || 15)}
                    total={pageInfo.total}
                    showQuickJumper
                />
            </CardCustom>
            {/* end table */}
            <ModalForm
                visible={showFormData} jsonFormInput={jsonForm}
                _onClose={(isReload) => {
                    setShowFormData(false);
                    if (isReload) _requestDataTable();
                }}
            />
            <FilterForm
                visible={showFilter} jsonFormInput={jsonFormFilter}
                _onClose={() => setShowFilter(false)}
                _onSubmit={_requestDataTable}
            />
        </div>

    );
};

const Extra = ({
    loading = false,
    showDel = false,
    _handleDel = () => { },
    _onClickAdd = () => { },
    _onFilter = () => { },
    _onReload = () => { },
}) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', paddingRight: 7, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flex: 1 }}>
                <div style={{ display: 'flex' }}>
                    {!showDel ? null : <Button loading={loading} onClick={_handleDel} className="ro-custom" type="text" icon={<DeleteOutlined />} >Xoá item đã chọn</Button>}
                    <Button loading={loading} onClick={() => _onReload()} className="ro-custom" type="text" icon={<ReloadOutlined />} >Làm mới</Button>
                    <Button loading={loading} onClick={_onClickAdd} className="ro-custom" type="text" icon={<PlusOutlined />} >Thêm mới</Button>
                    <Button loading={loading} onClick={_onFilter} className="ro-custom" type="text" icon={<FilterOutlined />} >Bộ lọc</Button>
                </div>
            </div>
        </div>
    )
}

export default TableFunction;



// baf1cf064104a8f584bf5bb433574c14
// const dnd = {
//     beforeUpload: file => {

//         var form = new FormData();
//         form.append("image", file);

//         axios.post(
//             "https://api.imgbb.com/1/upload?key=baf1cf064104a8f584bf5bb433574c14",
//             form
//         )
//             .then((respone) => console.log(respone));
//         return false;
//     },
// };