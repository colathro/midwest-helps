import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Typography, Spin } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import './DonationStatus.scss';
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
        <Row justify="center">
          <Title level={2}>Thank you!</Title>
        </Row>
        <Row justify="center">
          <Typography>
            We appreciate you confirming your donation has been received.
          </Typography>
        </Row>
      </>
    );
  };

  const noStatusProvidedMessage = () => {
    return (
      <>
        <Row justify="center">
          <Title level={2}>Sorry!</Title>
        </Row>
        <Row justify="center">
          <Typography>
            No status provided. No action can be taken here.
          </Typography>
        </Row>
      </>
    );
  };

  const statusDoesNotExistentMessage = () => {
    return (
      <>
        <Row justify="center">
          <Title level={2}>Sorry!</Title>
        </Row>
        <Row justify="center">
          <Typography>
            The status provided does not exists. No action can be taken here.
          </Typography>
        </Row>
      </>
    );
  };

  const errorProcessingRequestMessage = () => {
    return (
      <>
        <Row justify="center">
          <Title level={2}>Sorry!</Title>
        </Row>
        <Row justify="center">
          <Typography>
            There was an error processing your request. Try again later.
          </Typography>
        </Row>
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

  useEffect(() => {
    fetch(`/api/maskDonation/updateStatus/${status}/${id}`, {
      method: 'POST'
    })
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
  }, []);

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
