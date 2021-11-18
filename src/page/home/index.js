import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ENDPOINT } from '../../config/end_point';
import { useDispatch } from 'react-redux';
import { requestLogout } from '../../app_state/login';

import * as services from './services';

const Page = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [listApp, setListApp] = useState([]);
    const [listAllApp, setListAllApp] = useState([]);

    useEffect(() => {
        _requestInit()
    }, []);

    const _requestInit = async () => {
        services.getUser()
            .then(({ data }) => {
                setListApp(data)
            })
        services.getApplication()
            .then(({ data }) => {
                setListAllApp(data)
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', color: '#fff',
        alignItems: 'flex-start', alignContent: 'flex-start' }}>
            {
                listAllApp.map(app => {
                    return (
                        <div
                            onClick={() => history.push(`/${map_link[app.name]}`)}
                            style={{
                                display: 'flex', flexDirection: 'column',
                                justifyContent: 'center', alignItems: 'center', padding: 40
                            }}>
                            <img style={{ height: 100, width: 100, opacity: listApp.includes(app.name) ? 1 : 0.5, }} src={`${ENDPOINT.BASE}/application/${app.name}.png`} />
                            <span style={{ marginTop: 6 }}> {app.title}</span>
                        </div>
                    )
                })
            }

            <div style={{ position: 'fixed', bottom: 5, right: 15, opacity: 0.8 }}>
                <span style={{ fontSize: 12, fontStyle: 'italic' }}>Powered by <Link to='/about'>Rostek</Link></span>
            </div>
        </div>

    )
}

const map_link = {
    application: 'welcome',

    employees: 'account',

    sales: 'sales',

    purchase: 'purchase',

    outsource: 'outsource',

    inventory: 'inventory',

    plm: 'plm',

    manufacture: 'manufacture',

    quality: 'quality',

    realtime: 'realtime',

    maintenance: 'maintenance',

    setting: 'setting',

    task: 'task'
}

export default Page;