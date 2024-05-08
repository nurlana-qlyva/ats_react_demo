import { useState } from 'react';
import {
    PieChartOutlined,
    CarOutlined
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { Link } from 'react-router-dom';

const items = [
    {
        key: '1',
        icon: <PieChartOutlined />,
        label: (
            <Link to={'/'}>Dashboard</Link>
        ),
    },
    {
        key: '2',
        icon: <CarOutlined />,
        label: 'Araç Yönetimi',
        children: [
            {
                key: '5',
                label: (
                    <Link to={'/araclar'}>Araçlar</Link>
                ),
            },
            {
                key: '6',
                label: 'Yakıt İşlemleri',
            },
            {
                key: '7',
                label: 'Servis İşlemleri',
            },
            {
                key: '9',
                label: 'Görevler',
            },
            {
                key: '10',
                label: 'Sigortalar',
            },
            {
                key: '11',
                label: 'Harcamalar',
            },
            {
                key: '12',
                label: 'Kazalar',
            },
            {
                key: '13',
                label: 'Cezalar',
            },
            {
                key: '14',
                label: 'Lokasyonlar',
            },
        ],
    }
];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div
            className='sidebar w-full h-full'
        >
            <div className="flex justify-center w-full py-20">
                <Link to="/">
                    <img src="/images/logo_white.png" alt="" className='sidebar-logo' />
                </Link>
            </div>

            {/* <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{
                    marginBottom: 16,
                }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button> */}
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
            />
        </div>
    )
}

export default Sidebar
