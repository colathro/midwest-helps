import React from "react";
import { CreateBusinessForm } from "../CreateBusinessForm";
import { Row, Col, Layout } from "antd";
const { Content } = Layout;

export const List: React.FC = props => {
  return (
    <Content>
      <Row justify="center">
        <Col span={8}>
          <CreateBusinessForm />
        </Col>
      </Row>
    </Content>
  );
};
