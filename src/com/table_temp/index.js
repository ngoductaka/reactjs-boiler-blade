import React, { useState, useEffect } from "react";
import { get } from "lodash";
import {
    Button,
} from "antd";
import moment from "moment";
import {
    PlusCircleOutlined, DeleteOutlined,
} from "@ant-design/icons";

// local com
import { openNotificationWithIcon } from "./helper/notification_antd";
import { handleErr } from "./helper/handle_err_request";
import { CardCustom, TableCustom } from "./helper/styled_component";
import { columnInitTable, action, json_form_init } from './const';
import ModalAction from './modal_action';
import ModalForm, { moldForm } from './modal_form';

// import {

// } from "./services";

const TableFunction = (props) => {
    const [rightOption, setRightOption] = useState(false);
    const [loading, setLoading] = useState(false);

    const [visible, setVisible] = useState(false);
    const [planData, setPlanData] = useState([]);

    const [jsonForm, setJsonForm] = useState(json_form_init);
    const [showDel, setShowDel] = useState(false);
    const [selectedRow, setSelectRow] = useState([]);

    useEffect(() => {
        if (selectedRow[0]) {
            setShowDel(true)
        } else {
            setShowDel(false)
        }

    }, [selectedRow]);

    const _handleChangeJsonForm = (column, data) => {
        const newJsonForm = jsonForm.map(i => {
            if (i.name == column) {
                i.data = data;
            }
            return i
        });
        setJsonForm(newJsonForm);
    }

    const onSearch = async (val) => {
        console.log('-----------------', val)
        if (val) {
            setLoading(true);
            // const data = await getMoldWithParams({ mold_id: val });
            setLoading(false);
            // if (data.data) {
            //     setPlanData([data.data])
            // } else {
            //     setPlanData([]);
            // }
        } else {
            _requestPlan()
        }

    }

    const _requestPlan = async () => {
        try {
            setLoading(true);
            const data = {} //await getMold();
            setLoading(false);
            if (data.data) {
                setPlanData([])
            } else {
                setPlanData([]);
            }

        } catch (err) {
            openNotificationWithIcon('error', 'Tải dữ mold thất bại');
            handleErr(err)
            setLoading(false);
            console.log('err load plan', err)
        }

    }

    const handleSelectAction = (val) => {
        // console.log('-------------', val)
        if (val && val.type == 'Edit') {
            const dataEdit = {
                ...val.data
            }
            if (dataEdit.timestamp) {
                dataEdit.timestamp = moment(dataEdit.timestamp);
            }
            jsonForm.map(i => {
                if (i.name === 'id') {
                    i.disabled = true;
                }
            })
            setJsonForm([...jsonForm])
            console.log('dataEdit34344dataEditdataEdit', val)
            setVisible({
                data: dataEdit,
                type: 'edit',
            })
            setRightOption(false);

        } else if (val.type == 'Delete') {
            console.log(val.data, '=======');
            jsonForm.map(i => {
                if (i.name == 'id') {
                    i.disabled = false;
                }
            })
            setJsonForm([...jsonForm])
            if (get(val, 'data.id', null)) {
                const confirm = window.confirm(`Xoá mold ${val.data.id}?`)
                if (confirm) {
                    // delMolds({ id: [val.data.id] }).then(() => {
                    //     _requestPlan();
                    //     setRightOption(false);
                    //     openNotificationWithIcon("success", "Xoá mold thành công");
                    // }).catch(err => {
                    //     handleErr(err)
                    //     openNotificationWithIcon("error", "Xoá mold thất bại");
                    // })
                }
            }

        } else if (val.type == 'Duplicate') {
            const dataEdit = {
                ...val.data
            }
            jsonForm.map(i => {
                if (i.name == 'id') {
                    i.disabled = false;
                }
            })
            setJsonForm([...jsonForm])
            if (dataEdit.timestamp) {
                dataEdit.timestamp = moment(dataEdit.timestamp);
            }
            setVisible({
                data: dataEdit,
                type: 'duplicate',
            })
            setRightOption(false);

        }
    }


    const _handleSubmit = ({ data, type }) => {
        try {
            setLoading(true);
            if (type == 'edit') {
                // updateMold(body)
                //     .then(val => {
                //         setVisible(false);
                //         _requestPlan();
                //         openNotificationWithIcon("success", "Sửa mold thành công");

                //     })
                //     .catch(handleErr)
            } else {
                // body.mold_id = body.id
                // addMold(body)
                //     .then(val => {
                //         setVisible(false);
                //         _requestPlan();
                //         openNotificationWithIcon("success", "Thêm mới mold thành công");

                //     })
                //     .catch(handleErr)


            }

            setLoading(false);
        } catch (error) {
            handleErr(error)
            setLoading(false);
        }
    }

    const _handleDel = () => {
        const confirm = window.confirm("Xoá mold đã chọn?")
        if (confirm) {
            console.log(selectedRow)
            // delMolds({ id: selectedRow })
            //     .then(() => {
            //         _requestPlan();
            //         setSelectRow([]);
            //         openNotificationWithIcon("success", "Xoá molds thành công");
            //     })
            //     .catch(handleErr)
        }
    }

    return (
        <div style={{ position: 'relative' }}>
            <CardCustom
                title={
                    <div>
                        <span style={{ fontSize: 18, fontWeight: '500' }}>{"Mold table"}</span>
                    </div>
                }
                extra={<div style={{ display: 'flex', alignItems: 'center', padding: 7, justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <div style={{ display: 'flex' }}>
                            {showDel && <Button
                                onClick={_handleDel}
                                type="danger"
                                style={{ display: 'flex', alignItems: 'center', marginRight: 30 }}
                                icon={<DeleteOutlined />} >Xoá mold đã chọn </Button>}

                            {props.level != 3 ? <PlusCircleOutlined
                                style={{
                                    fontSize: "29px",
                                    // marginBottom: "10px",
                                    color: "green",
                                }}
                                onClick={() => {
                                    jsonForm.map(i => {
                                        if (i.name == 'id') {
                                            i.disabled = false;
                                        }
                                    })
                                    setJsonForm([...jsonForm])
                                    setVisible({ type: "add" })
                                }}
                            /> : null}</div>
                    </div>
                </div>} >

                <TableCustom
                    rowSelection={props.level != 3 ? {
                        type: 'checkbox',
                        onChange: setSelectRow,
                        selectedRowKeys: selectedRow
                    } : null}
                    dataSource={planData}
                    columns={columnInitTable}
                    pagination={{ pageSize: 15 }}
                    onRow={(r) => ({
                        onClick: () => {
                            setRightOption(r);
                        },
                    })}
                />
            </CardCustom>
            {/* end table */}
            <ModalForm
                visible={visible}
                jsonFormInput={jsonForm}
                onCancel={(isReload) => {
                    setVisible(false);
                    if (isReload) _requestPlan();
                }}
                _handleSubmit={_handleSubmit}
                loading={loading}
            />

            <ModalAction
                visibleData={props.level != 3 ? rightOption : false}
                onClose={() => { setRightOption(false) }}
                listAction={action}
                _handleSelectAction={handleSelectAction}
            />
        </div>
    );
};

export default TableFunction;

