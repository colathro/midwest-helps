import React from "react";
import { useHistory, Switch, Route, useLocation } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Modal,
} from "antd";

import "./Login.scss";

const { Title } = Typography;

export const Login: React.FC = () => {
  const history = useHistory();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values: any) => {
    login(values.username, values.password);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const error = () => {
    Modal.error({
      title: "Login Failed",
      content: "if you are sure your password is right, bother colton",
    });
  };

  const gotoRegister = () => {
    history.push("/admin/register");
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  const login = (username: string, password: string) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    return fetchUrl("api/users/authenticate", requestOptions)
      .then((user) => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("user", JSON.stringify(user));
        }
        refreshPage();
      })
      .catch(error);
  };

  const fetchUrl = async (url: string, requestOptions: any) => {
    const response = await fetch(url, requestOptions);
    return await response.json();
  };

  return (
    <Layout id="login">
      <Row justify="center">
        <Col span={12}>
          <Title>Login:</Title>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={12}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <span>{"           "}</span>
              <Button type="primary" onClick={gotoRegister}>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};
