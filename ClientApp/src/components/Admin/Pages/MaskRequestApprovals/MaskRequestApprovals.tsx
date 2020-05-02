import React, { useState, useEffect } from 'react';
import { Layout, Descriptions, Button, Modal, List, Row, Col } from 'antd';
import { useLocation } from 'react-router-dom';
import { IMaskRequest } from '../../../../types';

import './MaskRequestApprovals.scss';

const useQuery = () => new URLSearchParams(useLocation().search);

export const MaskRequestApprovals: React.FC = () => {
  // const history = useHistory();
  const query = useQuery();
  const [allApprovals, setAllApprovals] = useState<IMaskRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const key = query.get('key');

  // const goAdmin = () => {
  //   history.push(`/admin?key=${key}`);
  // };

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
    const requestOptions = {
      method: 'POST'
    };
    fetch(`/api/maskrequest/approvals/approve/${key}/${id}`, requestOptions)
      .then((response) => response)
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
    const requestOptions = {
      method: 'POST'
    };
    fetch(`/api/maskrequest/approvals/approve/${key}/${id}`, requestOptions)
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
      fetchUrl(`api/maskrequest/approvals/get/${key}`)
        .then((data) => {
          setAllApprovals(data);
          setLoading(false);
        })
        .catch(error);
    }
  };

  const fetchUrl = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
  };

  useEffect(() => {
    getPendingApprovals();
  });

  return (
    <Layout id="listingapprovals">
      <Row justify="center">
        <Col md={16} sm={18} xs={24}>
          <List
            itemLayout="horizontal"
            dataSource={allApprovals}
            renderItem={(item) => (
              <List.Item>
                <Layout>
                  <Descriptions title={item.id}>
                    <Descriptions.Item label="Id">{item.id}</Descriptions.Item>
                    <Descriptions.Item label="CreateOn">
                      {item.createdOn}
                    </Descriptions.Item>
                  </Descriptions>
                  <Row>
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
