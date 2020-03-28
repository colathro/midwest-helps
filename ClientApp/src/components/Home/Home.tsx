import React, { FunctionComponent } from 'react';
import { Row, Col, Typography, Layout, PageHeader } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

export const Home: FunctionComponent = () =>
    <div>
        <Header className="header-layout header-no-padding">
            <Row>
                <Col span={18} offset={3}>
                    <Title className="title header-title-margin" level={3}>Hotdish</Title>
                </Col>
            </Row>
        </Header>
        <Content className="greetings-content-layout layout-purple-background">
            <Row>
                <Col span={18} offset={3}>
                    <Content className="content-layout">
                        <Title className="title" level={1}>Support your community from where you're at.</Title>
                        <Title className="title" level={4}>
                            The temporary shut down of Fargo/Moorhead businesses due to COVID-19 has many folks struggling. This site is meant to be a resource for the people of this city to dish up on the latest info and continue to support their favorite local spots.
                        </Title>
                    </Content>
                </Col>
            </Row>
        </Content>
        <Content className="content-layout-main">
            <Layout className="layout-white-background">
                <Content className="content-home"></Content>
            </Layout>
            </Content>
        <Footer className="footer-layout">🧡 Made by Jordan, Michael, Tyler, Josie, Daniel, Louie, and Colton 💌 Hello@getthehotdish.com</Footer>
    </div>;
