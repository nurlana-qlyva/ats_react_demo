import { useState } from 'react'
import { DownOutlined, UserOutlined, IdcardOutlined, CarOutlined, ApartmentOutlined, ApiOutlined, BranchesOutlined, CreditCardOutlined, DatabaseOutlined, SolutionOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { PiGearSixBold } from 'react-icons/pi'
import { MdHealthAndSafety } from 'react-icons/md'
import { Button, Dropdown, Space } from 'antd'
import Ruhsat from './modals/Ruhsat'

const DetailInfo = ({ id }) => {
    const [selectedItem, setSelectedItem] = useState(null)

    const items = [
        {
            label: 'Ruhsat Bilgileri',
            key: '1',
            icon: <IdcardOutlined />,
        },
        {
            label: 'Teknik Bilgiler',
            key: '2',
            icon: <BranchesOutlined />,
        },
        {
            label: 'Araç Sürücüler',
            key: '3',
            icon: <UserOutlined />,
        },
        {
            label: 'Ekspertiz Bilgileri',
            key: '4',
            icon: <CarOutlined />,
        },
        {
            label: 'Üst Yapı Bilgileri',
            key: '5',
            icon: <ApartmentOutlined />,
        },
        {
            label: 'Aksesuarlar',
            key: '6',
            icon: <ApiOutlined />,
        },
        {
            label: 'Satınalma & Kiralama Bilgileri',
            key: '7',
            icon: <CreditCardOutlined />,
        },
        {
            label: 'Garanti Bilgileri',
            key: '8',
            icon: <MdHealthAndSafety />,
        },
        {
            label: 'Taşıt Kartı ve Yetki Bilgileri',
            key: '9',
            icon: <SolutionOutlined />,
        },
        {
            label: 'Kapasite Bilgileri',
            key: '10',
            icon: <DatabaseOutlined />,
        },
        {
            label: 'Lastik Bilgisi',
            key: '11',
            icon: <PiGearSixBold />,
        },
        {
            label: ' Araç Satış Bilgileri',
            key: '12',
            icon: <ShoppingCartOutlined />,
        },
    ]

    const menuProps = {
        items,
        onClick: e => setSelectedItem(e.key),
    }

    const renderModal = () => {
        switch (selectedItem) {
            case '1':
            return <Ruhsat visible={selectedItem === '1'} onClose={() => setSelectedItem(null)} id={id} />;
            // case '2':
            // // return <TeknikModal visible={selectedItem === '2'} onClose={() => setSelectedItem(null)} id={id} />;
            // case '3':
            // // return <DriversModal visible={selectedItem === '3'} onClose={() => setSelectedItem(null)} id={id} />;
            // default:
            //     return null;
        }
    }

    return (
        <>
            <Dropdown menu={menuProps}>
                <Button className="detail-info">
                    <Space>
                        Detay Bilgileri
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
            {selectedItem && renderModal()}
        </>
    )
}

export default DetailInfo
