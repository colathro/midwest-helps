import React from 'react';
import { Layout, Typography, Row, Col } from 'antd';

import './Home.scss';

const { Title } = Typography;

export const Home: React.FC = () => {
  return (
    <Layout id="adminhome" style={{ textAlign: 'left' }}>
      <Row justify="center">
        <Col span={16}>
          <Title>Welcome to the Midwest Helps Admin Portal!</Title>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={{ span: 8 }} md={{ span: 8 }}>
          <p>
            We appreciate your assistance in managing and maintaining the
            platform. With the menus on the left hand side you'll be able to
            approve/deny new posts and edits to existing posts. You'll also have
            the ability to delete postings that are no longer needed.
          </p>
          <p>
            The development of the website is ongoing, and we expect you and
            other users to occationally see issues. Our code is completely
            open-sourced and is available here:{' '}
            <a href="https://github.com/colathro/getthehotdish" target="_blank">
              GitHub
            </a>
          </p>
          <p>
            We'd love to hear your ideas about things we can add to the
            platform! Please reachout to any of the developers from the contact
            page!
          </p>
        </Col>
        <Col xs={{ span: 8 }} md={{ span: 8 }} style={{ textAlign: 'center' }}>
          <img
            src="/images/avatars/doctor-woman.svg"
            style={{ maxHeight: '400px' }}
          ></img>
        </Col>
      </Row>
    </Layout>
  );
};
