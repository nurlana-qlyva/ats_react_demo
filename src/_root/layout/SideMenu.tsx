import { Link } from 'react-router-dom';
// component
import { PanelMenu } from 'primereact/panelmenu';
// icons
import { FaChartBar, FaCar, FaChevronRight } from 'react-icons/fa';

const SideMenu = () => {
    const itemRenderer = (item, options) => (
        <Link to={item.url} onClick={options.onClick}>
            <div className="link">
                <span>{item.icon}</span>
                <span >{item.label}</span>
            </div>
            {!!item.items && <span><FaChevronRight /></span>}
        </Link>
    );

    const items = [
        {
            label: 'Dashboard',
            icon: <FaChartBar />,
            url: '/',
            template: itemRenderer,
        },
        {
            label: 'Araç Yönetimi',
            icon: <FaCar />,
            template: itemRenderer,
            items: [
                {
                    label: 'Araçlar',
                    icon: '',
                    url: '/araclar',
                    template: itemRenderer
                },
                {
                    label: 'Yakıt İşlemleri',
                    icon: '',
                    url: '/yakit-islemleri',
                    template: itemRenderer
                },
                {
                    label: 'Servis İşlemleri',
                    icon: '',
                    url: '/servis-islemleri',
                    template: itemRenderer
                },
                {
                    label: 'Görevler',
                    icon: '',
                    url: '/gorevler',
                    template: itemRenderer
                },
                {
                    label: 'Sigortalar',
                    icon: '',
                    url: '/sigortalar',
                    template: itemRenderer
                },
                {
                    label: 'Harcamalar',
                    icon: '',
                    url: '/harcamalar',
                    template: itemRenderer
                },
                {
                    label: 'Kazalar',
                    icon: '',
                    url: '/kazalar',
                    template: itemRenderer
                },
                {
                    label: 'Cezalar',
                    icon: '',
                    url: '/cezalar',
                    template: itemRenderer
                },
                {
                    label: 'Lokasyonlar',
                    icon: '',
                    url: '/lokasyonlar',
                    template: itemRenderer
                },
            ]
        },
    ];

    return (
        <div className='sidebar'>
            <img src="assets/images/logo_white.png" alt="" />
            <div className='panel'>
                <PanelMenu model={items} className="w-full" />
            </div>
        </div>
    )
}

export default SideMenu
