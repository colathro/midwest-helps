import React from "react";
import { Button, Row, Col, Typography, Anchor, BackTop, Alert } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { NavBar } from "../NavBar";
import { DonationInfo } from "./components/DonationInfo";

import "./Resources.scss";

const { Title } = Typography;
const { Link } = Anchor;

export const Resources: React.FC = () => {
  const history = useHistory();

  const goHome = () => {
    history.push("/");
  };

  return (
    <NavBar>
      <BackTop />
      <Row justify="center" id="resources">
        <Col xl={18} lg={18} md={20} sm={22} xs={24}>
          <Anchor affix={false}>
            <Link href="/resources#donation-info" title="Donation Info" />
            <Link href="#components-anchor-demo-static" title="Static demo" />
            <Link href="#API" title="API">
              <Link href="#Anchor-Props" title="Anchor Props" />
              <Link href="#Link-Props" title="Link Props" />
            </Link>
          </Anchor>
          <DonationInfo></DonationInfo>
        </Col>
      </Row>
    </NavBar>
  );
};
