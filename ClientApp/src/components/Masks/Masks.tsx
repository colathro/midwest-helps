import React from 'react';
import { useHistory } from 'react-router-dom';
import './Masks.scss';
import { Button } from 'antd';

export const Masks: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Button type="primary" onClick={() => history.push('/maskRequest')}>
        Request masks
      </Button>
    </>
  );
};
