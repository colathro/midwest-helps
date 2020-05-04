import React from 'react';
import { Row, Col, Layout, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

import './MaskRequest.scss';
import { MaskRequestForm } from './MaskRequestForm';

const { Content } = Layout;

export const MaskRequest: React.FC = () => {
  const history = useHistory();

  const gotoMasks = () => {
    history.push('/masks');
  };

  return (
    <Content>
      <Row justify="center" id="list-page">
        <Col xl={10} lg={12} md={16} sm={18} xs={22}>
          <Button
            className="back-link"
            type="link"
            icon={<LeftOutlined />}
            onClick={gotoMasks}
          >
            Back
          </Button>
          <MaskRequestForm />
        </Col>
      </Row>
    </Content>
  );
};
