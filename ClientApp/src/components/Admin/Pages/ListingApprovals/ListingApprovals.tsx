import React, { useState, useEffect } from 'react';
import { Layout, Descriptions, Button, Modal, List, Row, Col } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { Business } from '../../../../types';

import './ListingApprovals.scss';

const useQuery = () => new URLSearchParams(useLocation().search);

export const ListingApprovals: React.FC = () => {
  const history = useHistory();
  const query = useQuery();
  const [allApprovals, setAllApprovals] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  const key = query.get('key');

  const goAdmin = () => {
    history.push(`/admin?key=${key}`);
  };

  const error = () => {
    Modal.error({
      title: 'Error fetching pending approvals',
      content: 'something broke, bother colton',
      onOk: () => goAdmin()
    });
  };

  const approved = () => {
    Modal.success({
      content: 'Successfully Approved.',
      onOk: () => goAdmin()
    });
  };

  const denied = () => {
    Modal.success({
      content: 'Successfully Denied.',
      onOk: () => goAdmin()
    });
  };

  const compare = (current: any, original: any) => {
    Modal.info({
      content: (
        <Layout>
          <Row>
            <Col span={12}>
              <List>
                {Object.keys(current).map((thing, index) => (
                  <List.Item>{current[thing]}</List.Item>
                ))}
              </List>
            </Col>
            <Col span={12}>
              <List>
                {Object.keys(original).map((thing, index) => (
                  <List.Item>{original[thing]}</List.Item>
                ))}
              </List>
            </Col>
          </Row>
        </Layout>
      ),
      width: 1200
    });
  };

  const approve = (id: string) => {
    const requestOptions = {
      method: 'POST'
    };
    fetch(`/api/listing/approvals/approve/${key}/${id}`, requestOptions)
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
    fetch(`/api/listing/approvals/approve/${key}/${id}`, requestOptions)
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
      fetchUrl(`api/listing/approvals/get/${key}`)
        .then((data) => {
          setAllApprovals(data);
          setLoading(false);
        })
        .catch(error);
    }
  };

  const getPendingApproval = async (id: any) => {
    var record;
    await fetchUrl(`api/listing/approvals/get/approval/${key}?id=${id}`).then(
      (data) => {
        record = data;
      }
    );

    return record;
  };

  const getListing = async (id: any) => {
    var record;
    await fetchUrl(`api/listing/get/${id}`).then((data) => {
      record = data;
    });

    return record;
  };

  const compareRecords = async (current: string, original: string) => {
    var proposedListing = await getPendingApproval(current);
    var oldListing = await getListing(original);

    compare(proposedListing, oldListing);
  };

  const fetchUrl = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
  };

  useEffect(() => {
    getPendingApprovals();
  }, []);

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
                  <Descriptions title={item.name}>
                    {Object.keys(item).map((thing, index) => (
                      <Descriptions.Item label={thing}>
                        {item[thing]}
                      </Descriptions.Item>
                    ))}
                  </Descriptions>
                  <Row>
                    <Col span={4}>
                      <Button type="primary" onClick={() => approve(item.id!)}>
                        Approve
                      </Button>
                    </Col>
                    <Col span={4}>
                      <Button
                        type="primary"
                        danger
                        onClick={() => deny(item.id!)}
                      >
                        Deny
                      </Button>
                    </Col>
                    <Col span={4}>
                      <Button
                        type="primary"
                        onClick={() =>
                          compareRecords(item.id!, item.originalId)
                        }
                      >
                        Compare
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
