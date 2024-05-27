import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import {
    PieChartOutlined,
    CarOutlined,
    FastForwardOutlined
} from '@ant-design/icons'
import { FaGears } from 'react-icons/fa6'

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
    },
    {
        key: '15',
        icon: <FastForwardOutlined />,
        label: (
            <Link to={'/hizli-km-guncelleme'}>Hızlı Km Güncelleme</Link>
        ),
    },
    {
        key: '16',
        icon: <FaGears />,
        label: 'Sistem Ayarları',
        children: [
            {
                key: '17',
                label: (
                    <Link to={'/ayarlar'}>Ayarlar</Link>
                ),
            },
            {
                key: '18',
                label: (
                    <Link to={`/kullanici-tanimlari`}>Kullanıcı Tanımları</Link>
                ),
            },
            {
                key: '19',
                label: (
                    <Link to={`/kullanici-tanimlari`}>Doküman Yöneticisi</Link>

                ),
            }
        ],
    },
];

const Sidebar = () => {
    return (
        <>
            <div className="flex justify-center w-full py-20 text-center">
                <Link to="/">
                    <img src="/images/logo_white.png" alt="ats logo" className='sidebar-logo' />
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
