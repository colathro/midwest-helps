import React from "react";
import { CreateBusinessForm } from "../CreateBusinessForm";
import { Row, Col, Layout, Typography } from "antd";

const { Title } = Typography;
const { Content } = Layout;

export const List: React.FC = props => {
  return (
    <Content>
      <Row justify="center">
        <Col span={8}>
          <Title level={2}>Business information</Title>
          <CreateBusinessForm />
        </Col>
      </Row>
    </Content>
  );
};
