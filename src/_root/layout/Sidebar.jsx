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
                key: '3',
                label: (
                    <Link to={'/araclar'}>Araçlar</Link>
                ),
            },
            {
                key: '4',
                label: (
                    <Link to={'/yakit'}>Yakıt İşlemleri</Link>
                )
            },
            {
                key: '5',
                label: 'Servis İşlemleri',
            },
            {
                key: '6',
                label: 'Görevler',
            },
            {
                key: '7',
                label: 'Sigortalar',
            },
            {
                key: '8',
                label: 'Harcamalar',
            },
            {
                key: '9',
                label: 'Kazalar',
            },
            {
                key: '10',
                label: 'Cezalar',
            },
            {
                key: '11',
                label: 'Lokasyonlar',
            },
        ],
    },
    {
        key: '12',
        icon: <CarOutlined />,
        label: 'Malzeme Depo',
        children: [
            {
                key: '13',
                label: (
                    <Link to={'/malzeme-tanimlari'}>Malzeme Tanımları</Link>
                ),
            },
            {
                key: '14',
                label: (
                    <Link to={''}>Malzeme Giriş Fişleri</Link>
                )
            },
            {
                key: '15',
                label: <Link to={''}>Malzeme Çıkış Fişleri</Link>,
            },
            {
                key: '16',
                label: <Link to={''}>Depo Transferleri</Link>,
            },
            {
                key: '17',
                label: <Link to={''}>Malzeme Talepleri</Link>,
            },
            {
                key: '18',
                label: <Link to={''}>Malzeme Hareketleri</Link>,
            },
        ],
    },
    {
        key: '19',
        icon: <FastForwardOutlined />,
        label: (
            <Link to={'/hizli-km-guncelleme'}>Hızlı Km Güncelleme</Link>
        ),
    },
    {
        key: '20',
        icon: <FaGears />,
        label: 'Sistem Ayarları',
        children: [
            {
                key: '21',
                label: (
                    <Link to={'/ayarlar'}>Ayarlar</Link>
                ),
            },
            {
                key: '22',
                label: (
                    <Link to={`/kullanici-tanimlari`}>Kullanıcı Tanımları</Link>
                ),
            },
            {
                key: '23',
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
