import React from "react";
import { CreateBusiness } from "../BusinessForms/CreateBusiness";
import { Row, Col, Layout, Typography, Button } from "antd";
import { useHistory } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

import "./List.scss";

const { Title } = Typography;
const { Content } = Layout;

export const List: React.FC = props => {
  let history = useHistory();

  const goHome = () => {
    history.push("/");
  };

  return (
    <Content>
      <Row justify="center" id="list-page">
        <Col xl={10} lg={12} md={16} sm={18} xs={22}>
          <Button
            className="back-link"
            type="link"
            icon={<LeftOutlined />}
            onClick={goHome}
          >
            Back
          </Button>
          <Title level={2}>Business information</Title>
          <CreateBusiness />
        </Col>
      </Row>
    </Content>
  );
};
