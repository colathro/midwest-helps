import React, { useState, useEffect } from 'react';
import { Typography, Modal, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { BuildBusinessForm } from '../BuildBusinessForm/BuildBusinessForm';
import { Business } from '../../../types';

export interface UpdateBusinessProps {
  businessId: string;
  displayUpdate: boolean;
}

export const UpdateBusiness: React.FC<UpdateBusinessProps> = props => {
  let history = useHistory();

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  let business: Business | null = null;

  useEffect(() => {
    setVisible(props.displayUpdate);
    fetchUrl('/api/listing/get/' + props.businessId);
  }, [props.displayUpdate]);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = (business: any) => {
    setLoading(true);

    const postRequest = {};

    updateBusiness(postRequest);
    setLoading(false);
    setVisible(false);
  };

  function success() {
    Modal.success({
      content: 'Your business was submitted successfully.',
      onOk: () => goHome()
    });
  }

  function error() {
    Modal.error({
      title: 'Oops',
      content: 'There was a problem updating your business. Try again later.',
      onOk: () => goHome()
    });
  }

  function updateBusiness(data: any) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch('/api/listing/', requestOptions)
      .then(response => response)
      .then(data => {
        console.log('RESPONSE', data);
        if (data.ok) {
          success();
        } else {
          error();
        }
      })
      .catch(function() {
        error();
      });
  }

  async function fetchUrl(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      business = data;
    } else {
      error();
    }
  }

  const goHome = () => {
    history.push('/');
  };

  return (
    <Modal
      visible={visible}
      title="Update Business"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          Submit
        </Button>
      ]}
    >
      <BuildBusinessForm
        onSubmit={handleOk}
        businessModel={business}
        displayHours={true}
        displayPhoneNumber={true}
        displayUrls={true}
        displayMessage={true}
        displayProductChannel={true}
        displayAppDeliveryItems={true}
        displayGiftCardUrl={true}
      />
    </Modal>
  );
};
