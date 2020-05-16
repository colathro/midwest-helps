import React, { useState } from 'react';
import { Button, Row, Col, Typography, Spin } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory, RouteComponentProps } from 'react-router-dom';

import './Contact.scss';

const { Title } = Typography;

export const DonationStatus: React.FC<RouteComponentProps> = (props) => {
  const history = useHistory();
  const params = new URLSearchParams(props.location.search);
  const status = params.get('status') || '';
  const id = params.get('id') || '';
  const [message, setMessage] = useState(
    <Spin className="companies-loading" size="large" tip="Loading..." />
  );

  const receivedMessage = () => {
    return (
      <>
        <Title level={2}>Thank you!</Title>
        <Typography>
          We appreciate you confirming your donation has been received.
        </Typography>
      </>
    );
  };

  const noStatusProvidedMessage = () => {
    return (
      <>
        <Title level={2}>Sorry!</Title>
        <Typography>
          No status was provided. No action can be taken here.
        </Typography>
      </>
    );
  };

  const statusDoesNotExistentMessage = () => {
    return (
      <>
        <Title level={2}>Sorry!</Title>
        <Typography>
          The status provided does not exists. No action can be taken here.
        </Typography>
      </>
    );
  };

  const errorProcessingRequestMessage = () => {
    return (
      <>
        <Title level={2}>Sorry!</Title>
        <Typography>
          There was an error processing your request. Try again later.
        </Typography>
      </>
    );
  };

  const getMessage = () => {
    switch (status) {
      case '':
        return noStatusProvidedMessage();
      case 'Received':
        return receivedMessage();
      default:
        return statusDoesNotExistentMessage();
    }
  };

  const fetchUrl = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
  };

  fetchUrl(`/api/maskDonation/updateStatus/${status}/${id}`)
    .then((response) => {
      if (response.ok) {
        setMessage(getMessage());
      } else {
        setMessage(errorProcessingRequestMessage());
      }
    })
    .catch(() => {
      setMessage(errorProcessingRequestMessage());
    });

  const goHome = () => {
    history.push('/');
  };

  return (
    <Row justify="center" id="donation-status-page">
      <Col xl={10} lg={12} md={16} sm={18} xs={22}>
        <Button
          className="back-link"
          type="link"
          icon={<LeftOutlined />}
          onClick={goHome}
        >
          Back
        </Button>
        {message}
      </Col>
    </Row>
  );
};
