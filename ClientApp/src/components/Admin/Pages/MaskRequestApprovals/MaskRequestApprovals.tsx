import React, {
  useState,
  useEffect,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import { Layout, Descriptions, Button, Modal, List, Row, Col } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { PendingApproval } from './PendingApproval';
import { MaskRequest } from '../../../../types';

import './MaskRequestApprovals.scss';

const useQuery = () => new URLSearchParams(useLocation().search);

export const MaskRequestApprovals: React.FC = () => {
  let history = useHistory();
  const query = useQuery();
  const [allApprovals, setAllApprovals] = useState<MaskRequest[]>([]);
  const [loading, setLoading] = useState(true);

  let key = query.get('key');

  const goAdmin = () => {
    history.push(`/admin?key=${key}`);
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  function error() {
    Modal.error({
      title: 'Error fetching pending approvals',
      content: 'something broke, bother colton',
      onOk: () => refreshPage(),
    });
  }

  function approved() {
    Modal.success({
      content: 'Successfully Approved.',
      onOk: () => refreshPage(),
    });
  }

  function denied() {
    Modal.success({
      content: 'Successfully Denied.',
      onOk: () => refreshPage(),
    });
  }

  function approve(id: any) {
    const requestOptions = {
      method: 'POST',
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
      .catch(function () {
        error();
      });
  }

  function deny(id: any) {
    const requestOptions = {
      method: 'POST',
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
      .catch(function () {
        error();
      });
  }

  function getPendingApprovals() {
    if (loading) {
      fetchUrl(`api/maskrequest/approvals/get/${key}`)
        .then((data) => {
          setAllApprovals(data);
          setLoading(false);
        })
        .catch(function () {
          error();
        });
    }
  }

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
                    <Descriptions.Item label="PartitionKey">
                      {item.partitionKey}
                    </Descriptions.Item>
                    <Descriptions.Item label="CreateOn">
                      {item.createdOn}
                    </Descriptions.Item>
                  </Descriptions>
                  <Row>
                    <Col span={8}>
                      <Button type="primary" onClick={() => approve(item.id)}>
                        Approve
                      </Button>
                    </Col>
                    <Col span={8} offset={8}>
                      <Button
                        type="primary"
                        danger
                        onClick={() => deny(item.id)}
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
