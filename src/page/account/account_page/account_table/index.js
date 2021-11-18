import React, { useState, useEffect } from "react";
import { get } from "lodash";
import { Pagination, Input } from "antd";
import moment from "moment";
import {
    PlusCircleOutlined, DeleteOutlined, FilterOutlined
} from "@ant-design/icons";

// local com
import { openNotificationWithIcon } from "./helper/notification_antd";
import { handleErr } from "./helper/handle_err_request";
import { CardCustom, TableCustom } from "./helper/styled_component";
import ModalAction from './modal_action';
import ModalForm from './modal_form';
// 
import { columnInitTable, action, jsonFormInit, TITLE_TABLE, ACT_TYPE } from './const';
import * as services from "./services";

const { Search } = Input;

const TableFunction = (props) => {

    const [loading, setLoading] = useState(false);
    const [dataTable, setDataTable] = useState([]);
    // data handle
    const [jsonForm, setJsonForm] = useState(jsonFormInit);
    const [selectedRow, setSelectRow] = useState([]);
    // Pagination
    const [pageInfo, setPageInfo] = useState({
        current: 1,
        number_of_page: 20,
    })
    // modal
    const [showFilter, setShowFilter] = useState(false);
    const [showAction, setShowAction] = useState(false);
    const [showFormData, setShowFormData] = useState(false);

    useEffect(() => {
        _requestDataTable(pageInfo);
    }, []);

    const _handleChangeJsonForm = React.useCallback((column, data) => {
        const newJsonForm = jsonForm.map(i => {
            if (i.name == column) i.data = data;
            return i
        });
        setJsonForm(newJsonForm);
    }, []);

    const _requestDataTable = async (params = {}) => {
        try {
            setLoading(true);
            const { data } = await services.get(params);
            setLoading(false);
            if (data.data) {
                setPageInfo(data.page_info)
                setDataTable(data.data.map(i => {
                    i.key = i.id
                    return i
                }))
            } else {
                setDataTable([]);
            }
        } catch (err) {
            setLoading(false);
            handleErr(err)
        }

    }


    const _handleSubmitForm = async ({ data = null, type = null } = {}) => {
        try {
            if (!data || type) return 0;
            setLoading(true);
            if (type === ACT_TYPE.ADD) {
                await services.post(data);
                openNotificationWithIcon("success", "Thêm mới thành công")
            } else if (type === ACT_TYPE.EDIT) {
                await services.patch(data);
                openNotificationWithIcon("success", "Chỉnh sửa thành công")
            } else if (type === ACT_TYPE.DEL) {
                const confirm = window.confirm("Xác nhận xoá?")
                if (confirm) {
                    await services.deleteMany(data);
                    openNotificationWithIcon("success", "Xoá thành công")
                }
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            handleErr(error)
        }
    }

    const handleSelectAction = (val) => {
        if (val && val.type === ACT_TYPE.EDIT) {
            const dataEdit = {
                ...val.data
            }
            if (dataEdit.timestamp) dataEdit.timestamp = moment(dataEdit.timestamp);
            setShowFormData({
                data: dataEdit,
                type: ACT_TYPE.EDIT,
            })
            setShowAction(false);

        } else if (val.type === ACT_TYPE.DEL) {
            _handleSubmitForm({
                data: get(val, 'data', null),
                type: ACT_TYPE.DEL,
            })

        } else if (val.type === ACT_TYPE.DUP) {
            const dataEdit = { ...val.data }
            if (dataEdit.timestamp) dataEdit.timestamp = moment(dataEdit.timestamp);
            setShowFormData({
                data: dataEdit,
                type: ACT_TYPE.DUP,
            })
            setShowAction(false);
        }
    }

    return (
        <div style={{}}>
            <CardCustom
                title={TITLE_TABLE}
                extra={<Extra showDel={selectedRow && selectedRow[0]} _onFilter={() => setShowFilter(!showFilter)} _onClickAdd={() => setShowFormData({ type: ACT_TYPE.ADD })}
                />}>
                {!showFilter ? null : <FilterForm />}
                <TableCustom
                    dataSource={dataTable}
                    columns={columnInitTable}
                    loading={loading}
                    scroll={{ y: 'calc(100vh - 210px)' }}
                    pagination={false}

                    rowSelection={{
                        type: 'checkbox',
                        onChange: setSelectRow,
                        selectedRowKeys: selectedRow
                    }}
                    onRow={(r) => ({
                        onClick: () => setShowAction(r),
                    })}
                />

                <Pagination
                    style={{ marginTop: 10, float: 'right' }}
                    current={pageInfo.current}
                    onChange={(val) => {
                        // _handleFilter(val)
                    }}
                    total={pageInfo.total}
                    showSizeChanger={false}
                    showQuickJumper
                />
            </CardCustom>
            {/* end table */}
            <ModalForm
                visible={showFormData}
                jsonFormInput={jsonForm}
                onCancel={(isReload) => {
                    setShowFormData(false);
                    if (isReload) _requestDataTable();
                }}
                _handleSubmit={_handleSubmitForm}
                loading={loading}
            />

            <ModalAction
                visibleData={showAction}
                onClose={() => { setShowAction(false) }}
                listAction={action}
                _handleSelectAction={handleSelectAction}
            />
        </div>

    );
};

const FilterForm = () => {
    return (
        <div>
            sdfsdf
        </div>
    )
}

const Extra = ({
    showDel = false,
    _handleDel = () => { },
    _onClickAdd = () => { },
    _onFilter = () => { },
}) => {
    return (<div style={{ display: 'flex', alignItems: 'center', paddingRight: 7, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flex: 1 }}>
            <div style={{ display: 'flex' }}>

                {showDel ?
                    <DeleteOutlined
                        onClick={_handleDel}
                        style={{
                            fontSize: "25px",
                            color: "red",
                        }}
                    /> : null}

                <PlusCircleOutlined
                    style={{
                        fontSize: "25px",
                        color: "green",
                        margin: '0px 10px',
                    }}
                    onClick={_onClickAdd}
                />
                <FilterOutlined
                    onClick={_onFilter}
                    style={{
                        fontSize: "25px",
                        color: "#2593FC",
                    }} />
            </div>
        </div>
    </div>)
}

export default TableFunction;

