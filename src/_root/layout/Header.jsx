import PropTypes from 'prop-types';
import { Input, Avatar, Button, Layout } from 'antd'
import {
    HomeOutlined,
    AntDesignOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons'

const { Header } = Layout

const HeaderComp = ({ collapsed, colorBgContainer, setCollapsed }) => {
    return (
        <Header
            style={{
                padding: 0,
                background: colorBgContainer,
            }}
        >
            <div className="flex justify-between align-center gap-1 header">
                <div className="flex gap-1 justify-between align-baseline">
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <HomeOutlined />
                </div>
                <div className="flex gap-1 justify-between align-center">
                    <Input
                        className="search-input"
                        placeholder="Arama"
                        allowClear
                    />
                    <Avatar
                        className="header-avatar"
                        icon={<AntDesignOutlined />}
                    />
                </div>
            </div>
        </Header>
    )
}

HeaderComp.propTypes = {
    collapsed: PropTypes.bool,
    colorBgContainer: PropTypes.string,
    setCollapsed: PropTypes.func,
}


export default HeaderComp
