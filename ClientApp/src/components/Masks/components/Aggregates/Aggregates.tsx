import React, { useState, useEffect } from 'react';
import { Statistic, Layout, Row, Col } from 'antd';

import './Aggregates.scss';

export const Aggregates: React.FC = () => {
  const [aggregateRequests, setAllAggregateRequests] = useState<number>();
  const [aggregateDonations, setAllAggregateDonations] = useState<number>();
  const [loading, setLoading] = useState(true);

  const getMaskRequestAggregate = () => {
    if (loading) {
      const requestOptions = {
        method: 'Get'
      };

      fetchUrl(`/api/maskrequest/total`, requestOptions).then((data) => {
        setAllAggregateRequests(+data.requested);
        setAllAggregateDonations(+data.donated);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    getMaskRequestAggregate();
  }, []);

  const fetchUrl = async (url: string, requestOptions: any) => {
    const response = await fetch(url, requestOptions);
    return await response.json();
  };

  return (
    <Layout id="aggregates">
      <Row>
        <Col>
          <Statistic title="Total Requested Units" value={aggregateRequests} />
        </Col>
        <Col offset={1}>
          <Statistic title="Total Donated Units" value={aggregateDonations} />
        </Col>
      </Row>
    </Layout>
  );
};
