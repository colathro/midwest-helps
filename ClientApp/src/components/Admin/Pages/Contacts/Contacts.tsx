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

import './Contacts.scss';

const useQuery = () => new URLSearchParams(useLocation().search);
const { Title } = Typography;

interface Contact {
  name: string;
  email: string;
  message: string;
  [key: string]: any;
}

export const Contacts: React.FC = () => {
  const history = useHistory();
  const query = useQuery();
  const key = query.get('key');

  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const getContacts = () => {
    if (loading) {
      fetchUrl(`/api/contact?key=${key}`)
        .then((data) => {
          setAllContacts(data);
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
    fetch(`/api/contact/?key=${key}&id=${id}`, requestOptions).then(() => {
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
    <Layout id="contactadmin">
      <Title level={2} className="">
        Messages From Users:
      </Title>
      <Row justify="center">
        <Col md={16} sm={18} xs={24}>
          <List
            itemLayout="horizontal"
            dataSource={allContacts}
            renderItem={(item) => (
              <List.Item>
                <Layout>
                  <Descriptions title={item.name}>
                    <Descriptions.Item label={'Email'}>
                      {item.email}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Message'}>
                      {item.message}
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
