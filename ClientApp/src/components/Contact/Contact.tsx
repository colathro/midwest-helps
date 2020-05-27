import React from "react";
import { Form, Modal, Button, Row, Col, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { TextField } from "../FormFields/TextField";

import "./Contact.scss";
import { ContactFields } from "../../types";
import { NavBar } from "../NavBar";

const { Title } = Typography;

type ContactFormSubmitValues = { [name in keyof ContactFields]: string };

export const Contact: React.FC = () => {
  const history = useHistory();

  const success = () => {
    Modal.success({
      content: "Your message was sent successfully.",
      onOk: () => goHome(),
    });
  };

  const error = () => {
    Modal.error({
      title: "Oops",
      content: "There was a problem sending your message. Try again later.",
      onOk: () => goHome(),
    });
  };

  const sendMessage = (data: ContactFormSubmitValues) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("/api/contact/", requestOptions)
      .then((response) => response)
      .then((responseData) => {
        if (responseData.ok) {
          success();
        } else {
          error();
        }
      })
      .catch(error);
  };

  const goHome = () => {
    history.push("/");
  };

  const goFolks = () => {
    history.push("/folks");
  };

  return (
    <NavBar>
      <Row justify="center" id="contact-page">
        <Col xl={10} lg={12} md={16} sm={18} xs={22}>
          <Title level={2}>Contact</Title>
          <Typography>
            If you — as a patron or as a business owner — see a mistake, want to
            revise something for accuracy's sake, or anything else want to see
            any other COVID-19 related information, please drop us a quick note
            below. We'll get back to you as soon as possible.
          </Typography>
          <Form
            name="contact"
            onFinish={(values) =>
              sendMessage(values as ContactFormSubmitValues)
            }
          >
            <TextField
              name="name"
              title="Name"
              type="string"
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
              <Button
                className="contact-submit"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Typography className="title">
            <span className="made-by">Made by these </span>{" "}
            <span className="cool-folks" onClick={goFolks}>
              cool folks
            </span>{" "}
            💛
          </Typography>
        </Col>
      </Row>
    </NavBar>
  );
};
