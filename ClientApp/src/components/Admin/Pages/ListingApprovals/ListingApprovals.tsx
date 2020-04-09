import React, {
  useState,
  useEffect,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import { Layout, PageHeader, Tabs, Button, Modal, List, Row, Col } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { PendingApproval } from './PendingApproval';
import { Business, BUSINESS_CATEGORY_STRINGS } from '../../../../types';

import './ListingApprovals.scss';

const useQuery = () => new URLSearchParams(useLocation().search);

export const ListingApprovals: React.FC = () => {
  let history = useHistory();
  const query = useQuery();
  const [allApprovals, setAllApprovals] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  let key = query.get('key');

  const goAdmin = () => {
    history.push(`/admin?key=${key}`);
  };

  function error() {
    Modal.error({
      title: 'Error fetching pending approvals',
      content: 'something broke, bother colton',
      onOk: () => goAdmin(),
    });
  }

  function getPendingApprovals() {
    if (loading) {
      fetchUrl(`api/listing/approvals/get/${key}`)
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
        <Col>
          <List
            itemLayout="horizontal"
            dataSource={allApprovals}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.name}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
                <div>test</div>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Layout>
  );
};
