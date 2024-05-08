import {
    HomeOutlined,
    DownOutlined,
    AntDesignOutlined
} from '@ant-design/icons';
import { Dropdown, Space, Input, Avatar } from 'antd';
import { Link } from 'react-router-dom';

const { Search } = Input;

const items = [
    {
        label: <a href="https://www.antgroup.com">1st menu item</a>,
        key: '0',
    },
    {
        label: <a href="https://www.aliyun.com">2nd menu item</a>,
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
];

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Header = () => {
    return (
        <div className="header">
            <div className='flex gap-4'>
                <HomeOutlined />
                <Dropdown
                    menu={{
                        items,
                    }}
                    trigger={['click']}
                >
                    <Link onClick={(e) => e.preventDefault()}>
                        <Space>
                            Click me
                            <DownOutlined />
                        </Space>
                    </Link>
                </Dropdown>
            </div>
            <div className='flex align-center gap-4'>
                <Input
                    className='search-input'
                    placeholder="Arama"
                    allowClear
                    onSearch={onSearch}
                />
                <Avatar
                    style={{width: "60px", height: "40px"}}
                    icon={<AntDesignOutlined />}
                />
            </div>
        </div>
    )
}

export default Header
