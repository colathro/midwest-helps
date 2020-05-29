import React from "react";
import { Row, Col, Typography } from "antd";
import { NavBar } from "../NavBar";

import "./Folks.scss";
import { ContributorCards } from "./components/ContributorCards";

const { Title } = Typography;

export const Folks: React.FC = () => {
  return (
    <NavBar>
      <Row justify="center" id="folks-page">
        <Col xl={18} lg={18} md={20} sm={22} xs={24}>
          <Title level={4} className="title">
            <span className="made-by">Made by these </span>{" "}
            <span className="cool-folks">community-minded folks</span> 💛
          </Title>
          <ContributorCards></ContributorCards>
        </Col>
      </Row>
    </NavBar>
  );
};
