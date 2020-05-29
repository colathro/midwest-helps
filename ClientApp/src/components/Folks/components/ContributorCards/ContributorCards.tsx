import React from "react";
import { Layout, Row, Col } from "antd";
import { ContributorCard } from "./ContributorCard";

import "./ContributorCards.scss";

export const ContributorCards: React.FC = () => {
  return (
    <Layout>
      <Row gutter={[16, 16]} justify="space-around" align="middle">
        <Col xs={{ span: 8 }} md={{ span: 6 }} className="ContributorCardCol">
          <ContributorCard
            name={"Jordan Nelson"}
            role={"Designer"}
            picture={"/images/contributors/jordan.jpg"}
          ></ContributorCard>
        </Col>
        <Col xs={{ span: 8 }} md={{ span: 6 }} className="ContributorCardCol">
          <ContributorCard
            name={"Josie Perhus"}
            role={"Visionary"}
            picture={"/images/contributors/josie.jpg"}
          ></ContributorCard>
        </Col>
        <Col xs={{ span: 8 }} md={{ span: 6 }} className="ContributorCardCol">
          <ContributorCard
            name={"Daniel Dantas"}
            role={"Developer"}
            picture={"/images/contributors/daniel.jpg"}
          ></ContributorCard>
        </Col>
        <Col xs={{ span: 8 }} md={{ span: 6 }} className="ContributorCardCol">
          <ContributorCard
            name={"Louie Bertoncin"}
            role={"Developer"}
            picture={"/images/contributors/louie.jpg"}
          ></ContributorCard>
        </Col>
        <Col xs={{ span: 8 }} md={{ span: 6 }} className="ContributorCardCol">
          <ContributorCard
            name={"Caleb Niemann"}
            role={"Developer"}
            picture={"/images/contributors/caleb.jpg"}
          ></ContributorCard>
        </Col>
        <Col xs={{ span: 8 }} md={{ span: 6 }} className="ContributorCardCol">
          <ContributorCard
            name={"Tyler Gefroh"}
            role={"Visionary"}
            picture={"/images/contributors/tyler.jfif"}
          ></ContributorCard>
        </Col>
        <Col xs={{ span: 8 }} md={{ span: 6 }} className="ContributorCardCol">
          <ContributorCard
            name={"Rachel DeHoogh"}
            role={"Visionary"}
            picture={"/images/contributors/rachel.jpeg"}
          ></ContributorCard>
        </Col>
        <Col xs={{ span: 8 }} md={{ span: 6 }} className="ContributorCardCol">
          <ContributorCard
            name={"William DeHoogh"}
            role={"Visionary"}
            picture={"/images/contributors/william.jpg"}
          ></ContributorCard>
        </Col>
        <Col xs={{ span: 8 }} md={{ span: 6 }} className="ContributorCardCol">
          <ContributorCard
            name={"Emily Skoglund"}
            role={"Designer"}
            picture={"/images/contributors/emily.jpg"}
          ></ContributorCard>
        </Col>
        <Col xs={{ span: 8 }} md={{ span: 6 }} className="ContributorCardCol">
          <ContributorCard
            name={"Anthony Faris"}
            role={"Visionary"}
            picture={"/images/contributors/anthony.jpg"}
          ></ContributorCard>
        </Col>
        <Col xs={{ span: 8 }} md={{ span: 6 }} className="ContributorCardCol">
          <ContributorCard
            name={"Ann Arbor Miller"}
            role={"Visionary"}
            picture={"/images/contributors/ann.jpg"}
          ></ContributorCard>
        </Col>
      </Row>
    </Layout>
  );
};
