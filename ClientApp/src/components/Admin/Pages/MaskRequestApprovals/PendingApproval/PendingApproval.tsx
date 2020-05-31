import React from 'react';
import { Card } from 'antd';

import './PendingApproval.scss';

export interface PendingApprovalProps {
  name: string;
}

export const PendingApproval: React.FC<PendingApprovalProps> = (props) => (
  <Card title={props.name} extra={<div>test</div>}></Card>
);
