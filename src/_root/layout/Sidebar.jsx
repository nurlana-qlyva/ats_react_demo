import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import {
    PieChartOutlined,
    CarOutlined,
    FastForwardOutlined
} from '@ant-design/icons'
import { FaGears } from 'react-icons/fa6'
import { t } from 'i18next';

const items = [
    {
        key: 1,
        icon: <PieChartOutlined />,
        label: (
            <Link to={'/'}>{t("dashboard")}</Link>
        ),
    },
    {
        key: 2,
        icon: <CarOutlined />,
        label: 'Araç Yönetimi',
        children: [
            {
                key: 3,
                label: (
                    <Link to={'/araclar'}>{t("araclar")}</Link>
                ),
            },
            {
                key: 4,
                label: (
                    <Link to={'/yakit-islemleri'}>{t("yakitIslemleri")}</Link>
                )
            },
            {
                key: 5,
                label: <Link to={'/servis-islemleri'}>{t("servisIslemleri")}</Link>,
            },
            {
                key: 6,
                label: <Link to={'/gorevler'}>{t("gorevler")}</Link>,
            },
            {
                key: 7,
                label: <Link to={'/sigortalar'}>{t("sigortalar")}</Link>,
            },
            {
                key: 8,
                label: <Link to={'/harcamalar'}>{t("harcamalar")}</Link>,
            },
            {
                key: 9,
                label: <Link to={'/kazalar'}>{t("kazalar")}</Link>,
            },
            {
                key: 10,
                label: <Link to={'/cezalar'}>{t("cezalar")}</Link>,
            },
            {
                key: 11,
                label: <Link to={'/lokasyonlar'}>{t("lokasyonlar")}</Link>,
            },
        ],
    },
    {
        key: 12,
        icon: <CarOutlined />,
        label: t("malzemeDepo"),
        children: [
            {
                key: 13,
                label: (
                    <Link to={'/malzeme-tanimlari'}>{t("malzemeTanimlari")}</Link>
                ),
            },
            {
                key: 14,
                label: (
                    <Link to={'giris-fisleri'}>{t("girisFisleri")}</Link>
                )
            },
            {
                key: 15,
                label: <Link to={'cikis-fisleri'}>{t("cikisFisleri")}</Link>,
            },
            {
                key: 16,
                label: <Link to={'transferler'}>{t("transferler")}</Link>,
            },
            {
                key: 17,
                label: <Link to={'talepler'}>{t("talepler")}</Link>,
            },
            {
                key: 18,
                label: <Link to={'hareketler'}>{t("hareketler")}</Link>,
            },
        ],
    },
    {
        key: 19,
        icon: <FastForwardOutlined />,
        label: (
            <Link to={'/hizli-km-guncelleme'}>{t("hizliKmGuncelleme")}</Link>
        ),
    },
    {
        key: 20,
        icon: <FaGears />,
        label: 'Sistem Ayarları',
        children: [
            {
                key: 21,
                label: (
                    <Link to={'/ayarlar'}>{t("ayarlar")}</Link>
                ),
            },
            {
                key: 22,
                label: (
                    <Link to={`/kullanici-tanimlari`}>{t("kullaniciTanimlari")}</Link>
                ),
            },
            {
                key: 23,
                label: (
                    <Link to={`/kullanici-tanimlari`}>{t("dokumanYoneticisi")}</Link>

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
