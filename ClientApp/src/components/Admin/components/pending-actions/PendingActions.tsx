import React, { useState, useEffect } from "react";
import { Layout, Modal, Button, Typography, Statistic, Row, Col } from "antd";
import { useLocation, useHistory } from "react-router-dom";

import "./PendingActions.scss";

const useQuery = () => new URLSearchParams(useLocation().search);

const { Title } = Typography;

type ActionCounts = {
  contacts: number;
  reports: number;
  maskRequestApprovals: number;
};

export const PendingActions: React.FC = () => {
  const history = useHistory();
  const [pendingActions, setAllPendingActions] = useState<ActionCounts>();
  const [loading, setLoading] = useState(true);

  const getPendingActions = () => {
    if (loading) {
      const auth = localStorage.getItem("user");

      let authObject = JSON.parse(auth!);

      const requestOptions = {
        method: "Get",
        headers: { Authorization: "Bearer " + authObject.token },
      };

      fetchUrl(`/api/pendingaction`, requestOptions)
        .then((data) => {
          setAllPendingActions(data);
          setLoading(false);
        })
        .catch(error);
    }
  };

  const error = () => {
    Modal.error({
      title: "Error fetching pending actions",
      content: "something broke, bother colton",
      onOk: () => refreshPage(),
    });
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  const fetchUrl = async (url: string, requestOptions: any) => {
    const response = await fetch(url, requestOptions);

    if (response.status === 401) {
      localStorage.removeItem("user");

      history.push(`/admin`);
    }
    return await response.json();
  };

  useEffect(() => {
    getPendingActions();
  }, []);

  return (
    <Layout>
      <Row justify="center">
        <Col>
          <Title level={4}>Pending Admin Actions:</Title>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Statistic
            title="Mask Requests Pending"
            value={pendingActions?.maskRequestApprovals}
          ></Statistic>
        </Col>
        <Col offset={1}>
          <Statistic
            title="Contacts Pending Acknowledgement"
            value={pendingActions?.contacts}
          ></Statistic>
        </Col>
        <Col offset={1}>
          <Statistic
            title="Reports Pending Acknowledgement"
            value={pendingActions?.reports}
          ></Statistic>
        </Col>
      </Row>
    </Layout>
  );
};
