import React from 'react';
import Faker from 'faker';
import { useHistory } from 'react-router-dom';
import { Row, Col, Typography, Layout, Button } from 'antd';
import {
  CompanyCardProps,
  CompanyCategory,
  CompanyInteraction,
  CompanyCard
} from '../CompanyCard/CompanyCard';

import './Home.scss';

const { Header, Content } = Layout;
const { Title } = Typography;

// TODO: Remove fake data
const companyCategories: CompanyCategory[] = [
  'brewery',
  'coffee',
  'entertainment',
  'grocery',
  'other',
  'religion',
  'restaurant',
  'retail',
  'wellness'
];

const companyInteractions: CompanyInteraction[] = [
  'appointment',
  'curbside',
  'delivery',
  'livestream',
  'takeout'
];

const getFakeInteractions = (numInteractions: number) => {
  // if longer than the length of options, make it be the length of the options
  numInteractions =
    numInteractions <= companyInteractions.length
      ? numInteractions
      : companyInteractions.length;

  const interactions: CompanyInteraction[] = [];
  const tempInteractions = [...companyInteractions];
  for (let i = 0; i < numInteractions; i++) {
    const interactionIndex = Faker.random.number(tempInteractions.length - 1);
    interactions.push(tempInteractions[interactionIndex]);
    tempInteractions.splice(interactionIndex, 1);
  }

  return interactions;
};

const companies: CompanyCardProps[] = [];
for (let i = 0; i < 10; i++) {
  companies.push({
    title: Faker.company.companyName(),
    category:
      companyCategories[Faker.random.number(companyCategories.length - 1)],
    lastUpdate: Faker.date.recent(),
    message: Faker.company.catchPhrase(),
    interactions: getFakeInteractions(
      Faker.random.number(companyInteractions.length)
    ),
    phone: Faker.random.boolean() ? Faker.phone.phoneNumber() : undefined,
    webUrl: Faker.random.boolean() ? Faker.internet.url() : undefined,
    giftCardUrl: Faker.random.boolean() ? Faker.internet.url() : undefined
  });
}
// End of data faking

export const Home: React.FC = () => {
  let history = useHistory();

  const gotoContact = () => {
    history.push('/contact');
  };
  const gotoList = () => {
    history.push('/list');
  };

  return (
    <div>
      <Header className="header-fixed">
        <Row>
          <Col span={18} offset={3}>
            <Title className="header-title" level={3}>
              Hotdish
            </Title>
            <div className="right-nav">
              <Button onClick={gotoContact} type="link" className="nav-link">
                Contact
              </Button>
              <Button onClick={gotoList} type="primary">
                List a business
              </Button>
            </div>
          </Col>
        </Row>
      </Header>
      <Content className="header-greeting">
        <Row justify="center">
          <Col span={18}>
            <Title level={1}>
              Support your community from where you're at.
            </Title>
            <Typography>
              The temporary shut down of Fargo/Moorhead businesses due to
              COVID-19 has many folks struggling. This site is meant to be a
              resource for the people of this city to dish up on the latest info
              and continue to support their favorite local spots.
            </Typography>
            <Typography>
              This information is crowdsourced, so please verify the accuracy
              independently. If you see a mistake or need to update a post,
              please contact us.
            </Typography>
          </Col>
        </Row>
      </Content>
      <Content>
        <Row justify="center">
          <Col span={12}>
            {companies.map((companyProps, index) => (
              <CompanyCard {...companyProps} key={index} />
            ))}
          </Col>
        </Row>
      </Content>
    </div>
  );
};
