import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Typography, Layout, Button } from "antd";

import "./NavBar.scss";

const { Header, Content } = Layout;
const { Title } = Typography;

export const NavBar: React.FC = (props) => {
  const history = useHistory();

  const gotoHome = () => {
    history.push("/");
    window.location.reload(false);
  };

  return (
    <Row justify="center">
      <Col xl={14} lg={18} md={20} sm={22} xs={24}>
        <Header className="header-fixed">
          <Title id="title-button" level={4}>
            <a onClick={gotoHome}>Midwest Helps</a>
          </Title>
          <div className="right-nav">
            <Button
              onClick={() => history.push("/resources")}
              type="link"
              className="nav-link"
            >
              Resources
            </Button>
            <Button
              onClick={() => history.push("/contact")}
              type="link"
              className="nav-link"
            >
              Contact
            </Button>
          </div>
        </Header>
        <Content>{props.children}</Content>
      </Col>
    </Row>
  );
};
