import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Typography, Layout, Button, Spin, Input, Alert } from "antd";
import { CompanyCard } from "../CompanyCard";

import "./Home.scss";

const { Search } = Input;
const { Header, Content } = Layout;
const { Title } = Typography;

export const Home: React.FC = () => {
  let history = useHistory();

  const [allBusiness, setAllBusiness] = useState<any[]>([]);
  const [businesslist, setBusinesslist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchUrl(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      const processedData = processResponseData(data);
      setAllBusiness(processedData);
      setBusinesslist(processedData);
      setLoading(false);
      setError(false);
    } else {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    fetchUrl("/api/listing/page/1");
  }, []);

  function processResponseData(data: any[]) {
    const categories = [
      { name: "brewery", value: 0 },
      { name: "coffee", value: 1 },
      { name: "entertainment", value: 2 },
      { name: "grocery", value: 3 },
      { name: "religion", value: 4 },
      { name: "restaurant", value: 5 },
      { name: "retail", value: 6 },
      { name: "wellness", value: 7 },
      { name: "other", value: 8 },
      { name: "art", value: 9 },
      { name: "beauty", value: 10 }
    ];

    const processedData = data.map((business, index) => {
      const companyInteraction: any[] = [];

      if (business.appointmentOnly) {
        companyInteraction.push("appointment");
      }
      if (business.curbSide) {
        companyInteraction.push("curbSide");
      }
      if (business.delivery) {
        companyInteraction.push("delivery");
      }
      if (business.liveStream) {
        companyInteraction.push("liveStream");
      }
      if (business.takeOut) {
        companyInteraction.push("takeOut");
      }
      if (business.driveThru) {
        companyInteraction.push("driveThru");
      }

      const category = categories.find(
        category => category.value === business.businessType
      );

      return {
        businessName: business.businessName,
        businessCategory: category?.name,
        hours: business.hours,
        phoneNumber: business.phoneNumber,
        website: business.website,
        messageToCustomer: business.messageToCustomer,
        giftCardUrl: business.giftCardUrl,
        interactions: companyInteraction
      };
    });

    return processedData;
  }

  const onSearch = (value: string) => {
    if (value) {
      setBusinesslist(
        allBusiness.filter(business =>
          business.businessName.toLowerCase().includes(value)
        )
      );
    } else {
      setBusinesslist(allBusiness);
    }
  };

  const gotoContact = () => {
    history.push("/contact");
  };
  const gotoList = () => {
    history.push("/list");
  };

  return (
    <div>
      <Header className="header-fixed">
        <Row justify="center">
          <Col xl={18} lg={18} md={20} sm={22} xs={24}>
            <Title level={3}>Hotdish</Title>
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
          <Col xl={16} lg={16} md={18} sm={20} xs={22}>
            <Title level={1}>
              Support your community from where you're at.
            </Title>
            <Typography>
              The temporary shut down of Fargo/Moorhead businesses due to
              COVID-19 has many folks struggling. This site is meant to be a
              resource for the people of this city to dish up on the latest info
              and continue to support their favorite local spots.
            </Typography>
            <br />
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
          {loading ? (
            <Spin size="large" tip="Loading..." />
          ) : (
            <Col xl={12} lg={14} md={16} sm={18} xs={24}>
              <Search
                placeholder="input search text"
                onSearch={value => onSearch(value)}
                enterButton
              />
              {!error &&
                businesslist.map((companyProps, index) => (
                  <CompanyCard {...companyProps} key={index} />
                ))}
              {error && (
                <Alert
                  message="Somethign went wrong"
                  description="There was an error loading the page. Refresh the browser and try it again. If the error persists contact the admin."
                  type="error"
                />
              )}
            </Col>
          )}
        </Row>
      </Content>
    </div>
  );
};
