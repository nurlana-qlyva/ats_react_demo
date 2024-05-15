import {
    HomeOutlined,
    AntDesignOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import { Input, Avatar, Button, Layout } from 'antd';

const { Header } = Layout;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const HeaderComp = ({ collapsed, colorBgContainer, setCollapsed }) => {
    return (
        <Header
            style={{
                padding: 0,
                background: colorBgContainer,
            }}
        >
            <div className="flex justify-between align-center gap-1 header">
                <div className='flex gap-1 justify-between align-baseline'>
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
                <div className='flex gap-1 justify-between align-center'>
                    <Input
                        className='search-input'
                        style={{width: "200px"}}
                        placeholder="Arama"
                        allowClear
                    />
                    <Avatar
                        style={{ width: "40px", height: "40px" }}
                        icon={<AntDesignOutlined />}
                    />
                </div>
            </div>
        </Header>
    )
}

export default HeaderComp
