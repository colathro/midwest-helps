import React from 'react';
import { Form, Modal, Button, Row, Col, Typography, Layout } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { TextField } from '../FormFields/TextField';
import { ContributorCards } from './ContributorCards';

import './Contact.scss';

const { Title } = Typography;

export const Contact: React.FC = () => {
  let history = useHistory();

  const onFinish = (values: any) => {
    console.log(values);
    sendMessage(values);
  };

  function success() {
    Modal.success({
      content: 'Your message was sent successfully.',
      onOk: () => goHome()
    });
  }

  function error() {
    Modal.error({
      title: 'Oops',
      content: 'There was a problem sending your message. Try again later.',
      onOk: () => goHome()
    });
  }

  function sendMessage(data: any) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch('/api/contact/', requestOptions)
      .then(response => response)
      .then(data => {
        console.log('RESPONSE', data);
        if (data.ok) {
          success();
        } else {
          error();
        }
      })
      .catch(function() {
        error();
      });
  }

  const goHome = () => {
    history.push('/');
  };

  return (
    <Layout id="contact-page">
      <Row justify="center">
        <Col xl={10} lg={12} md={16} sm={18} xs={22}>
          <Button
            className="back-link"
            type="link"
            icon={<LeftOutlined />}
            onClick={goHome}
          >
            Back
          </Button>
        </Col>
      </Row>
      <Row justify="center">
        <Col xl={10} lg={12} md={16} sm={18} xs={22}>
          <Title level={2}>Contact</Title>
          <Typography>
            If you — as a patron or as a business owner — see a mistake, want to
            revise something for accuracy's sake, or anything else want to see
            any other COVID-19 related information, please drop us a quick note
            below. We'll get back to you as soon as possible.
          </Typography>
          <Form name="contact" onFinish={onFinish}>
            <TextField
              name="name"
              title="Name"
              type="name"
              placeHolder="John Doe"
              required={true}
            />
            <TextField
              name="email"
              title="Email"
              type="email"
              placeHolder="johndoe@gmail.com"
              required={true}
            />
            <TextField
              name="message"
              title="Message"
              type="text"
              placeHolder="Please tell us how we can help you"
              required={true}
            />
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row justify="center">
        <Col xl={10} lg={12} md={16} sm={18} xs={22}>
          <ContributorCards></ContributorCards>
        </Col>
      </Row>
    </Layout>
  );
};
