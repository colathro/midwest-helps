import React, { useState, useEffect } from "react";
import { Layout, Descriptions, Button, Modal, List, Row, Col } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import { IMaskRequest } from "../../../../types";

import { ExclamationCircleOutlined } from "@ant-design/icons";

import "./MaskRequestRemovals.scss";

const useQuery = () => new URLSearchParams(useLocation().search);

export const MaskRequestRemovals: React.FC = () => {
  const history = useHistory();

  const [allApprovals, setAllApprovals] = useState<IMaskRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshPage = () => {
    window.location.reload(false);
  };

  const error = () => {
    Modal.error({
      title: "Error fetching pending approvals",
      content: "something broke, bother colton",
      onOk: () => refreshPage(),
    });
  };

  const success = () => {
    Modal.success({
      content: "Successfully Removed.",
      onOk: () => refreshPage(),
    });
  };

  const yousure = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this mask request?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      cancelText: "No",
      onOk() {
        remove(id);
      },
      onCancel() {},
    });
  };

  const remove = (id: string) => {
    const auth = localStorage.getItem("user");

    let authObject = JSON.parse(auth!);

    const requestOptions = {
      method: "DELETE",
      headers: { Authorization: "Bearer " + authObject.token },
    };

    fetch(`/api/maskrequest/${id}`, requestOptions)
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem("user");
          history.push(`/admin`);
        }
        return response;
      })
      .then((data) => {
        if (data.ok) {
          success();
        } else {
          error();
        }
      })
      .catch(error);
  };

  const getPendingApprovals = () => {
    if (loading) {
      const auth = localStorage.getItem("user");

      let authObject = JSON.parse(auth!);

      const requestOptions = {
        method: "GET",
        headers: { Authorization: "Bearer " + authObject.token },
      };

      fetchUrl(`api/maskrequest/`, requestOptions)
        .then((data) => {
          setAllApprovals(data);
          setLoading(false);
        })
        .catch(error);
    }
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
    getPendingApprovals();
  });

  return (
    <Layout id="listingapprovals">
      <Row justify="center">
        <Col md={16} sm={18} xs={24}>
          <br />
          <List
            itemLayout="horizontal"
            dataSource={allApprovals}
            renderItem={(item) => (
              <List.Item>
                <Layout className="approval-item">
                  <Descriptions bordered title="Delivery Contact">
                    <Descriptions.Item span={3} label="Company">
                      {item.recipient.company}
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Name">
                      {item.recipient.name}
                      {item.recipient.phone}
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Email">
                      {item.recipient.email}
                    </Descriptions.Item>
                  </Descriptions>
                  <Descriptions bordered title="Mask Information">
                    <Descriptions.Item span={3} label="Masks For">
                      {item.recipient.maskFor}
                    </Descriptions.Item>
                    {item.maskDetails.masks.map((mask) => {
                      return (
                        <Descriptions.Item span={3} label="Mask Type Request">
                          {mask.type} - Quantitity: {mask.quantity}
                        </Descriptions.Item>
                      );
                    })}
                    <Descriptions.Item span={3} label="Mask Requirements">
                      {item.maskDetails.requirements}
                    </Descriptions.Item>
                  </Descriptions>
                  {item.delivery.addresses.map((address, index) => {
                    return (
                      <Descriptions bordered title={"Address " + (index + 1)}>
                        <Descriptions.Item span={3} label="How Received">
                          {address.type}
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="Delivery Notes">
                          {item.delivery.notes}
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="Address Line 1">
                          {address.address1}
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="Address Line 2">
                          {address.address2}
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="City">
                          {address.city}
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="State">
                          {address.state}
                        </Descriptions.Item>
                        <Descriptions.Item span={3} label="Zipcode">
                          {address.zipCode}
                        </Descriptions.Item>
                      </Descriptions>
                    );
                  })}
                  <Row className="approval-buttons">
                    <Col span={8}>
                      <Button danger onClick={() => yousure(item.id!)}>
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </Layout>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Layout>
  );
};
