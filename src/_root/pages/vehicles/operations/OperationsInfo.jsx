import { useState } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { Button, Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { FaWrench, FaGear, FaBuildingShield, FaTruckFast } from 'react-icons/fa6'
import { FaFire, FaWallet, FaCarCrash } from 'react-icons/fa'
import { MdFormatListBulleted, MdHealthAndSafety, MdSettingsInputComponent } from 'react-icons/md'
import Yakit from './yakit/Yakit'
import Bakim from './bakim/Bakim'

const OperationsInfo = ({ ids, t }) => {
    const [selectedItem, setSelectedItem] = useState(null)

    const handleMenuClick = (e) => {
        setSelectedItem(e.key)
    }

    const items = [
        {
            label: t('bakimlar'),
            key: '1',
            icon: <FaWrench className="text-info" />,
        },
        {
            label: t('yakitlar'),
            key: '2',
            icon: <FaFire className="text-info" />,
        },
        {
            label: t('gorevler'),
            key: '3',
            icon: <MdFormatListBulleted className="text-info" />,
        },
        {
            label: t('harcamalar'),
            key: '4',
            icon: <FaWallet className="text-info" />,
        },
        {
            label: t('kazalar'),
            key: '5',
            icon: <FaCarCrash className="text-info" />,
        },
        {
            label: t('cezalar'),
            key: '6',
            icon: <FaBuildingShield className="text-info" />,
        },
        {
            label: t('sigortalar'),
            key: '7',
            icon: <MdHealthAndSafety className="text-info" />,
        },
        {
            label: t('lastikler'),
            key: '8',
            icon: <FaGear className="text-info" />,
        },
        {
            label: t('kmTakibi'),
            key: '9',
            icon: <FaTruckFast className="text-info" />,
        },
        {
            label: t('parcalar'),
            key: '10',
            icon: <MdSettingsInputComponent className="text-info" />,
        }
    ]

    const menuProps = {
        items,
        onClick: handleMenuClick,
    }

    const renderModal = () => {
        switch (selectedItem) {
            case '1':
                return <Bakim visible={selectedItem === '1'} onClose={() => setSelectedItem(null)} ids={ids} />;
            case '2':
                return <Yakit visible={selectedItem === '2'} onClose={() => setSelectedItem(null)} ids={ids} />;
            default:
                return null;
        }
    }

    return (
        <>
            <Dropdown menu={menuProps}>
                <Button className="btn operations-btn">
                    <Space>
                        {t("islemler")}
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
            {selectedItem && renderModal()}
        </>
    )
}

OperationsInfo.propTypes = {
    ids: PropTypes.array
}

export default withNamespaces()(OperationsInfo)
