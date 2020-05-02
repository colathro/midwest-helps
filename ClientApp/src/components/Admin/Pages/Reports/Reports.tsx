import React, { useState, useEffect } from 'react';
import {
  Layout,
  List,
  Modal,
  Descriptions,
  Row,
  Col,
  Button,
  Typography
} from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { REPORT_TYPES } from '../../../../types';

import './Reports.scss';

const useQuery = () => new URLSearchParams(useLocation().search);
const { Title } = Typography;

interface Report {
  id: string;
  business: string;
  createdOn: string;
  reportType: number;
  [key: string]: any;
}

export const Reports: React.FC = () => {
  const history = useHistory();
  const query = useQuery();
  const key = query.get('key');

  const [allReports, setAllReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const getContacts = () => {
    if (loading) {
      fetchUrl(`/api/report?key=${key}`)
        .then((data) => {
          setAllReports(data);
          setLoading(false);
        })
        .catch(error);
    }
  };

  const error = () => {
    Modal.error({
      title: 'Error fetching pending approvals',
      content: 'something broke, bother colton',
      onOk: () => refreshPage()
    });
  };

  const dismiss = (id: string) => {
    const requestOptions = {
      method: 'PUT'
    };
    fetch(`/api/report/?key=${key}&id=${id}`, requestOptions).then(() => {
      refreshPage();
    });
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  const fetchUrl = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <Layout id="reportadmin">
      <Title level={2} className="">
        Reports From Users:
      </Title>
      <Row justify="center">
        <Col md={16} sm={18} xs={24}>
          <List
            itemLayout="horizontal"
            dataSource={allReports}
            renderItem={(item) => (
              <List.Item>
                <Layout>
                  <Descriptions title={item.name}>
                    <Descriptions.Item label={'Post ID'}>
                      {item.id}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Report Type'}>
                      {item.reportType}
                    </Descriptions.Item>
                  </Descriptions>
                  <Row>
                    <Col span={4}>
                      <Button type="danger" onClick={() => dismiss(item.id!)}>
                        Dismiss
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