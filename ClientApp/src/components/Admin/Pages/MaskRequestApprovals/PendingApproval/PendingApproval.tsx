import React, { useState, useEffect } from 'react';
import { Card, Button, Dropdown, Menu, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { Business, BUSINESS_CATEGORY_STRINGS } from '../../../../../types';

import './PendingApproval.scss';

export const PendingApproval: React.FC<Business> = (props) => {
  const [business, setBusiness] = useState(props);

  return <Card title={business.name} extra={<div>test</div>}></Card>;
};
