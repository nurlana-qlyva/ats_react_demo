import { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import HeaderComp from './layout/Header';
import FooterComp from './layout/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import { getItemWithExpiration } from '../utils/expireToken';
const { Sider, Content } = Layout;

const RootLayout = () => {

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate()

    useEffect(() => {
        const token = getItemWithExpiration("token")

        if (!token) {
            navigate('/login')
        }
    }, [])

    return (
        <Layout style={{ height: "100vh", overflow: "hidden" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Sidebar />
            </Sider>
            <Layout>
                <HeaderComp colorBgContainer={colorBgContainer} setCollapsed={setCollapsed} collapsed={collapsed} />
                <Content
                    style={{
                        padding: 20,
                        minHeight: 280,
                        overflow: "auto"
                    }}
                >
                    <Outlet />
                </Content>
                <FooterComp />
            </Layout>
        </Layout>
    )
}

export default RootLayout
