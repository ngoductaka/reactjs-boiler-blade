import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, InputNumber, Select } from 'antd';
import { get } from 'lodash';


export const RenderForm = ({ jsonFrom, disabled = [], _handleChange = () => { } }) => {
    return (
        <div> {
            jsonFrom.map((item, index) => {
                if (item.type === 'number') {
                    return (
                        <Form.Item
                            key={String(index)}
                            name={item.name}
                            label={item.label}
                            rules={item.rules}
                            style={item.hidden ? { display: 'none' } : { margin: '8px 15px' }}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    )
                }
                if (item.type === 'password') {
                    return (
                        <Form.Item
                            key={String(index)}
                            name={item.name}
                            label={item.label}
                            rules={item.rules}
                            style={item.hidden ? { display: 'none' } : { margin: '8px 15px' }}
                        >
                            <Input.Password style={{ width: '100%' }} />
                        </Form.Item>
                    )
                }
                if (item.type === 'select') {
                    return (
                        <Form.Item
                            key={String(index)}
                            name={item.name}
                            label={item.label}
                            rules={item.rules}
                            style={item.hidden ? { display: 'none' } : { margin: '8px 15px' }}
                        >
                            <Select
                                showSearch
                                allowClear
                                {...(item.isMul ? { mode: 'multiple' } : {})}
                                placeholder={item.placeholder || ''}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={val => _handleChange(item.name, val)}
                            >
                                {
                                    get(item, 'data', [])
                                        .map((item) => <Select.Option key={item.id} value={item.id}>{item.name || item.id}</Select.Option>)
                                }
                            </Select>
                        </Form.Item>
                    )
                }
                return (
                    <Form.Item
                        key={String(index)}
                        name={item.name}
                        label={item.label}
                        rules={item.rules}
                        style={item.hidden ? { display: 'none' } : { margin: '8px 15px' }}
                    >
                        <Input disabled={disabled.includes(item.name)} />
                    </Form.Item>
                )
            })
        }
        </div>)

}
