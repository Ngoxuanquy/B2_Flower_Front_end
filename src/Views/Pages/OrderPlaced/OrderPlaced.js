import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './OrderPlaced.module.scss';
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { Call_Post_Api } from '../../../Components/CallApi/CallApis';
import Cookies from 'js-cookie';
import { Table } from 'antd';

function OrderPlaced() {
    const cx = classNames.bind(styles);
    const [defau, setDefau] = useState('1'); // Change to string
    const [apiDonDaDats, setApiDonDaDat] = useState();
    const handleTab = (key) => {
        console.log(key);
    };

    const hanldeDonDaDat = () => {
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const cleanedJwtString = token?.replace(/"/g, '');
        const cleanId = id?.replace(/"/g, '');
        Call_Post_Api(
            null,
            cleanedJwtString,
            cleanId,
            `/transaction/getFullUseId/${cleanId}`,
        )
            .then((data) => {
                console.log(data);
                setApiDonDaDat(data.metadata);
            })
            .catch((err) => console.log({ err }));
    };

    useEffect(() => {
        hanldeDonDaDat();
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'product_name',
            showSorterTooltip: {
                target: 'full-header',
            },
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Jim',
                    value: 'Jim',
                },
                {
                    text: 'Submenu',
                    value: 'Submenu',
                    children: [
                        {
                            text: 'Green',
                            value: 'Green',
                        },
                        {
                            text: 'Black',
                            value: 'Black',
                        },
                    ],
                },
            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
        },
        {
            title: 'product_quantity',
            dataIndex: 'product_quantity',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'product_thumb',
            dataIndex: 'product_thumb',
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div className={cx('container_')}>
            <div>
                <Tabs
                    defaultActiveKey={defau}
                    centered
                    onChange={handleTab}
                    tabBarStyle={{
                        color: 'pink',
                        marginRight: '70px',
                        display: 'flex',
                    }}
                    tabPosition="top" // Change this to "top" or "bottom" for horizontal tabs
                >
                    <Tabs.TabPane
                        tab={
                            <Link
                                style={{
                                    color: '#292929',
                                }}
                                // to="/"
                                onClick={() => hanldeDonDaDat()}
                            >
                                Đơn đã đặt
                            </Link>
                        }
                        key="1" // Ensure each tab has a unique key
                    />
                    <Tabs.TabPane
                        tab={
                            <Link
                                style={{
                                    color: '#292929',
                                }}
                                // to="/"
                            >
                                Đang được giao
                            </Link>
                        }
                        key="2" // Ensure each tab has a unique key
                    />
                    <Tabs.TabPane
                        tab={
                            <Link
                                style={{
                                    color: '#292929',
                                }}
                                // to="/"
                            >
                                Đơn đã nhận
                            </Link>
                        }
                        key="3" // Ensure each tab has a unique key
                    />
                </Tabs>
            </div>

            <div>
                {apiDonDaDats?.map((apiDonDaDat) => (
                    <div>
                        <div>{apiDonDaDat.createdOn}</div>
                        <div>
                            {apiDonDaDat?.transaction_products?.map((item) => (
                                <div>
                                    <Table
                                        columns={columns}
                                        dataSource={
                                            apiDonDaDat?.transaction_products
                                        }
                                        onChange={onChange}
                                        showSorterTooltip={{
                                            target: 'sorter-icon',
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderPlaced;
