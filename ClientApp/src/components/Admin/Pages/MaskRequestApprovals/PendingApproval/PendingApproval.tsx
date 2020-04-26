import React from 'react';
import { Card } from 'antd';
import { Business } from '../../../../../types';

import './PendingApproval.scss';

export const PendingApproval: React.FC<Business> = (props) => (
  <Card title={props.name} extra={<div>test</div>}></Card>
);
