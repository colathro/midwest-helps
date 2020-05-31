import React from "react";
import { Button, Row, Col, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { NavBar } from "../NavBar";

import "./About.scss";

const { Title } = Typography;

export const About: React.FC = () => {
  const history = useHistory();

  const goHome = () => {
    history.push("/");
  };

  return (
    <NavBar>
      <Row justify="center" id="about-page">
        <Col xl={18} lg={18} md={20} sm={22} xs={24}>
          <Title level={2}>About the project</Title>
          <Typography className="text">
            <p>
              Midwest Helps was launched by area web designers and arts
              organizations dedicated to filling a community needs for
              protective equipment during the Covid-19 crisis. The site,
              midwesthelps.com, is a virtual bulletin board where users can both
              submit and fulfill requests. Midwest Helps is focused on Personal
              Protective Equipment (PPE) needed by essential businesses
              including non-profits and state run organizations.
            </p>
            <p>
              The website is designed as a bulletin board for organizations to
              request cloth face masks, face shields, ear guards, and scrub
              caps. Volunteers, who have been so helpful in offering their time
              and talents throughout the crisis, can now easily find a central
              hub of requests and needs. Midwest Helps is designed to connect
              those with great need and those in their community who can help.
            </p>
            <p>
              Midwest Helps is currently focused on mask making but is designed
              to adapt and evolve as community needs change and shift.
            </p>
          </Typography>
        </Col>
      </Row>
    </NavBar>
  );
};
