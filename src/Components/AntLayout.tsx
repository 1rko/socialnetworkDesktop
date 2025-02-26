import React, {lazy} from 'react';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {Col, MenuProps, Row} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';

// @ts-ignore
import {withSuspense} from 'src/HOC/withSuspense';
import {Link, Navigate, Route, Routes} from 'react-router-dom';
import DialogsContainer from "./Content/Dialogs/DialogsContainer";
import ProfileContainer from './Content/Profile/ProfileContainer';
import {User} from './Content/Users/UsersContainer';
import {Login} from "./Login/Login";
import Auth from "./Auth/Auth";
import GithubUsers from "./GithubUsers/GithubUsers";
import YandexMap from './YandexMap/YandexMap';

const {Header, Content, Footer, Sider} = Layout;

const Messages = lazy(() => import('./Content/Messages/Messages'));
const SuspendedMessages = withSuspense(Messages)    //создаем компонент, который потом отрисуем в компоненте Content

const ChatPage = lazy(() => import('./Content/ChatPage/ChatPage'));
const SuspendedChatPage = withSuspense(ChatPage)    //создаем компонент, который потом отрисуем в компоненте Content

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,

            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    },
);

const items3 = [
    {
        label: 'Profile',
        //path: '/profile/',
        key: 'profile/',
        icon: <UserOutlined/>,
        children: [
            {
                label: <Link to="profile">
                    Profile
                </Link>,
                //path:'/profile/',
                key: 'profile',
            }
        ]
    },
    {
        label: <Link to="users">
            Users
        </Link>,
        //path:'/users/',
        key: 'users',
    },
    {
        label: <Link to="messages">
            Messages - тестовая страница для фото
        </Link>,
        //path:'/messages/',
        key: 'messages',
    },
    {
        label: <Link to="dialogs">
            Dialogs
        </Link>,
        //path:'/dialogs/',
        key: 'dialogs',
    },
    {
        label: <Link to="antLayout">
            AntLayout
        </Link>,
        //path:'/antLayout/',
        key: 'antLayout',
    },
    {
        label: <Link to="chatPage">
            ChatPage
        </Link>,
        //path:'/chatPage/',
        key: 'chatPage',
    },
    {
        label: <Link to="githubUsers">
            GithubUsers
        </Link>,
        //path:'/chatPage/',
        key: 'githubUsers',
    },
    {
        label: <Link to="yandexMap">
            YandexMap
        </Link>,
        //path:'/chatPage/',
        key: 'yandexMap',
    }
]                       //Menu Items

const AntLayout: React.FC = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{display: 'grid', alignItems: 'center'}}>
                <Row>
                    <Col span={16}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            items={items3}
                            style={{flex: 1, minWidth: 0}}
                        />

                    </Col>
                    <Col span={8} style={{
                        display: 'flex',
                        justifyContent: 'right',
                        height: '30px',
                        color: 'whitesmoke',
                        alignItems: "baseline"
                    }}>
                        <Auth/>
                    </Col>
                </Row>
            </Header>
            <Content style={{padding: '0 48px'}}>
                {/* <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>*/}
                <Layout
                    style={{padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG}}
                >
                    <Sider style={{background: colorBgContainer}} width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%'}}
                            items={items3}
                        />
                    </Sider>
                    <Content style={{padding: '0 24px', minHeight: '77vh'}}>
                        <Routes>
                            <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                            <Route path="/messages/*" element={<SuspendedMessages/>}/>
                            <Route path="/profile/">
                                <Route path=":userId" element={<ProfileContainer/>}/>
                                <Route path="" element={<ProfileContainer/>}/>
                            </Route>
                            <Route path="/users/*" element={<User title="Все пользователи"/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/antLayout" element={<AntLayout/>}/>
                            <Route path="/chatPage" element={<SuspendedChatPage/>}/>
                            <Route path="/githubUsers" element={<GithubUsers/>}/>
                            <Route path="/yandexMap" element={<YandexMap/>}/>

                            <Route path="*" element={<Navigate to="/users"/>}/>
                        </Routes>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                SocialNetwork ©{new Date().getFullYear()} Created by Irko
            </Footer>
        </Layout>
    );
};

export default AntLayout;