import React, { useState, useEffect } from 'react';
import { Layout, Descriptions, Button, Modal, List, Row, Col } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import { IMaskRequest } from '../../../../types';

import './MaskRequestApprovals.scss';

const useQuery = () => new URLSearchParams(useLocation().search);

export const MaskRequestApprovals: React.FC = () => {
  const history = useHistory();

  const [allApprovals, setAllApprovals] = useState<IMaskRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshPage = () => {
    window.location.reload(false);
  };

  const error = () => {
    Modal.error({
      title: 'Error fetching pending approvals',
      content: 'something broke, bother colton',
      onOk: () => refreshPage()
    });
  };

  const approved = () => {
    Modal.success({
      content: 'Successfully Approved.',
      onOk: () => refreshPage()
    });
  };

  const denied = () => {
    Modal.success({
      content: 'Successfully Denied.',
      onOk: () => refreshPage()
    });
  };

  const approve = (id: string) => {
    const auth = localStorage.getItem("user");

      let authObject = JSON.parse(auth!);

      const requestOptions = {
        method: "POST",
        headers: { Authorization: "Bearer " + authObject.token },
      };
    fetch(`/api/maskrequest/approvals/approve/${id}`, requestOptions)
      .then((response) => {    
        if (response.status === 401){
        localStorage.removeItem('user');
        history.push(`/admin`);
      } return response;})
      .then((data) => {
        if (data.ok) {
          approved();
        } else {
          error();
        }
      })
      .catch(error);
  };

  const deny = (id: string) => {
    const auth = localStorage.getItem("user");

      let authObject = JSON.parse(auth!);

      const requestOptions = {
        method: "POST",
        headers: { Authorization: "Bearer " + authObject.token },
      };
    fetch(`/api/maskrequest/approvals/deny/${id}`, requestOptions)
      .then((response) => response)
      .then((data) => {
        if (data.ok) {
          denied();
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

      fetchUrl(`api/maskrequest/approvals/get`, requestOptions)
        .then((data) => {
          setAllApprovals(data);
          setLoading(false);
        })
        .catch(error);
    }
  };

  const fetchUrl = async (url: string, requestOptions: any) => {
    const response = await fetch(url, requestOptions);
    if (response.status === 401){
      localStorage.removeItem('user');
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
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Phone">
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
                  <Descriptions bordered title="Address">
                    <Descriptions.Item span={3} label="How Received">
                      {item.delivery.addresses[0].type}
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Delivery Notes">
                      {item.delivery.notes}
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Address Line 1">
                      {item.delivery.addresses[0].address1}
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Address Line 2">
                      {item.delivery.addresses[0].address2}
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="City">
                      {item.delivery.addresses[0].city}
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="State">
                      {item.delivery.addresses[0].state}
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Zipcode">
                      {item.delivery.addresses[0].zipCode}
                    </Descriptions.Item>
                  </Descriptions>
                  <Row className="approval-buttons">
                    <Col span={8}>
                      <Button type="primary" onClick={() => approve(item.id!)}>
                        Approve
                      </Button>
                    </Col>
                    <Col span={8} offset={8}>
                      <Button
                        type="primary"
                        danger
                        onClick={() => deny(item.id!)}
                      >
                        Deny
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
