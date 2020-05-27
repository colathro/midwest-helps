import React from 'react';
import { Layout, Card, Row, Col } from 'antd';

import './ContributorCard.scss';

export interface ContributorCardProps {
  name: string;
  role: string;
  picture: string;
}

export const ContributorCard: React.FC<ContributorCardProps> = props => {
  return (
    <Layout className="ContributorCard">
      <Card bordered={false}>
        <Row justify="center">
          <Col>
            <img
              className="ContributorPicture"
              alt="Contributor."
              src={props.picture}
            />
          </Col>
        </Row>
        <Row justify="center">
          <Col id="ContributorName">{props.name}</Col>
        </Row>
        <Row justify="center">
          <Col id="ContributorRole">{props.role}</Col>
        </Row>
      </Card>
    </Layout>
  );
};
