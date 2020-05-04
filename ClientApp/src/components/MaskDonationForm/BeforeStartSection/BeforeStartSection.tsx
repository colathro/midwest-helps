import React, { useState } from 'react';
import { Button, Typography, Row, Col } from 'antd';

const { Text, Title } = Typography;

export interface BeforeStartSectionProps {
  onFinish: () => void;
}

export const BeforeStartSection: React.FC<BeforeStartSectionProps> = (
  props
) => {
  const [displayContinueButton, setDisplayContinueButton] = useState(true);
  const onContinueClick = () => {
    setDisplayContinueButton(false);
    props.onFinish();
  };

  return (
    <>
      <Row gutter={[8, 48]}>
        <Col span={1}>✔</Col>
        <Col span={22} offset={1}>
          <Text strong>Make sure your masks are clean</Text>
        </Col>
      </Row>
      <Row gutter={[8, 48]}>
        <Col span={1}>✔</Col>
        <Col span={22} offset={1}>
          <Text strong>
            Make sure you masks match the requirements for this medical provider
          </Text>
        </Col>
      </Row>
      {displayContinueButton && (
        <Row>
          <Button type="primary" onClick={() => onContinueClick()}>
            Continue
          </Button>
        </Row>
      )}
    </>
  );
};
