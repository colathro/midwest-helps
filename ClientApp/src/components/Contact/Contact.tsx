import React from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import './Contact.scss';

const { Title } = Typography;

export const Contact: React.FC = () => {
  let history = useHistory();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const goHome = () => {
    history.push('/');
  };

  return (
    <Row justify="center" id="contact-page">
      <Col xl={10} lg={12} md={16} sm={18} xs={22}>
        <Button
          className="back-link"
          type="link"
          icon={<LeftOutlined />}
          onClick={goHome}
        >
          Back
        </Button>
        <Title level={2}>Contact</Title>
        <Typography>
          If you — as a patron or as a business owner — see a mistake, want to
          revise something for accuracy's sake, or anything else want to see any
          other COVID-19 related information, please drop us a quick note below.
          We'll get back to you as soon as possible.
        </Typography>
        <Form name="contact" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please don't forget your name!" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Give us your email so we can get back to you!'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Message" name="message">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
