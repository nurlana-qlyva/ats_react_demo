import {
    PieChartOutlined,
    CarOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
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

    return (
        <>
            <div className="flex justify-center w-full py-20" style={{ textAlign: "center" }}>
                <Link to="/">
                    <img src="/images/logo_white.png" alt="" className='sidebar-logo' />
                </Link>
            </div>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                items={items}
            />
        </>
    )
}

export default Sidebar
