import React from 'react';
import { Button, Typography, Row, Col } from 'antd';

const { Text, Title } = Typography;

export interface BeforeStartSectionProps {
  onFinish: () => void;
}

export const BeforeStartSection: React.FC<BeforeStartSectionProps> = (
  props
) => {
  const onContinueClick = () => {
    props.onFinish();
  };

  return (
    <>
      <Row>
        <Col span={22}>
          <Title level={2}>Who are the masks for?</Title>
          <br />
          <Text type="secondary">Testing 1</Text>
          <br />
          <br />
          <Text strong>Testing 2</Text>
          <br />
        </Col>
        <Col span={2}>
          <Button type="link" onClick={() => onContinueClick()}>
            Continue
          </Button>
        </Col>
      </Row>
    </>
  );
};
