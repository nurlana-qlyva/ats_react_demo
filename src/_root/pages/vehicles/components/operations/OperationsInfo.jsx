import { Button, Dropdown, Space } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { FaWrench, FaGear, FaBuildingShield, FaTruckFast } from "react-icons/fa6";
import { FaFire, FaWallet, FaCarCrash } from "react-icons/fa";
import { MdFormatListBulleted, MdHealthAndSafety, MdSettingsInputComponent } from "react-icons/md";
import { useState } from "react";
import YakitModal from "./components/yakit/YakitModal";

const OperationsInfo = ({ id }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleMenuClick = (e) => {
        setSelectedItem(e.key);
    };

    const items = [
        {
            label: 'Bakımlar',
            key: '1',
            icon: <FaWrench className="text-info" />,
        },
        {
            label: 'Yakıtlar',
            key: '2',
            icon: <FaFire className="text-info" />,
        },
        {
            label: 'Görevler',
            key: '3',
            icon: <MdFormatListBulleted className="text-info" />,
        },
        {
            label: 'Harcamalar',
            key: '4',
            icon: <FaWallet className="text-info" />,
        },
        {
            label: 'Kazalar',
            key: '5',
            icon: <FaCarCrash className="text-info" />,
        },
        {
            label: 'Cezalar',
            key: '6',
            icon: <FaBuildingShield className="text-info" />,
        },
        {
            label: 'Sigortalar',
            key: '7',
            icon: <MdHealthAndSafety className="text-info" />,
        },
        {
            label: 'Lastikler',
            key: '8',
            icon: <FaGear className="text-info" />,
        },
        {
            label: 'KM Takibi',
            key: '9',
            icon: <FaTruckFast className="text-info" />,
        },
        {
            label: 'Parçalar',
            key: '10',
            icon: <MdSettingsInputComponent className="text-info" />,
        }
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const handleModalClose = () => {
        setSelectedItem(null);
    };

    const renderModal = () => {
        switch (selectedItem) {
            case '2':
                return <YakitModal visible={selectedItem === '2'} onClose={handleModalClose} id={id} />;
            default:
                return null;
        }
    };

    return (
        <>
            <Dropdown menu={menuProps}>
                <Button className="operations-btn">
                    <Space>
                        İşlemler
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
            {selectedItem && renderModal()}
        </>
    )
}

export default OperationsInfo
