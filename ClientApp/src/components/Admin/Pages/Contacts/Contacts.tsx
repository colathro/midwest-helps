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
      const auth = localStorage.getItem("user");

      let authObject = JSON.parse(auth!);

      const requestOptions = {
        method: "Get",
        headers: { Authorization: "Bearer " + authObject.token },
      };

      fetchUrl(`/api/contact`, requestOptions)
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
    const auth = localStorage.getItem("user");

      let authObject = JSON.parse(auth!);

      const requestOptions = {
        method: "Put",
        headers: { Authorization: "Bearer " + authObject.token },
      };
    fetch(`/api/contact?id=${id}`, requestOptions).then((response) => {
      if (response.status === 401){
        localStorage.removeItem('user');
        history.push(`/admin`);
      }
      refreshPage();
    });
  };

  const refreshPage = () => {
    window.location.reload(false);
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
                      <Button danger onClick={() => dismiss(item.id!)}>
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
