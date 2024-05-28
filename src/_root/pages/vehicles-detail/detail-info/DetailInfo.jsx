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
            icon: <IdcardOutlined className="text-info" />,
        },
        {
            label: 'Teknik Bilgiler',
            key: '2',
            icon: <BranchesOutlined className="text-info" />,
        },
        {
            label: 'Araç Sürücüler',
            key: '3',
            icon: <UserOutlined className="text-info" />,
        },
        {
            label: 'Ekspertiz Bilgileri',
            key: '4',
            icon: <CarOutlined className="text-info" />,
        },
        {
            label: 'Üst Yapı Bilgileri',
            key: '5',
            icon: <ApartmentOutlined className="text-info" />,
        },
        {
            label: 'Aksesuarlar',
            key: '6',
            icon: <ApiOutlined className="text-info" />,
        },
        {
            label: 'Satınalma & Kiralama Bilgileri',
            key: '7',
            icon: <CreditCardOutlined className="text-info" />,
        },
        {
            label: 'Garanti Bilgileri',
            key: '8',
            icon: <MdHealthAndSafety className="text-info" />,
        },
        {
            label: 'Taşıt Kartı ve Yetki Bilgileri',
            key: '9',
            icon: <SolutionOutlined className="text-info" />,
        },
        {
            label: 'Kapasite Bilgileri',
            key: '10',
            icon: <DatabaseOutlined className="text-info" />,
        },
        {
            label: 'Lastik Bilgisi',
            key: '11',
            icon: <PiGearSixBold className="text-info" />,
        },
        {
            label: ' Araç Satış Bilgileri',
            key: '12',
            icon: <ShoppingCartOutlined className="text-info" />,
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
