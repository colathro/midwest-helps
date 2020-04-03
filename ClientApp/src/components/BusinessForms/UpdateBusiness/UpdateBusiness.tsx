import React, { useState, useEffect } from 'react';
import { Typography, Modal, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { BuildBusinessForm } from '../BuildBusinessForm/BuildBusinessForm';
import { Business } from '../../../types';

export interface UpdateBusinessProps {
  business: Business;
  bussinessCardCallback: (business: Business) => void;
}

export const UpdateBusiness: React.FC<UpdateBusinessProps> = props => {
  let history = useHistory();

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  // const [business, setBusiness] = useState(null);

  // if (visible && !business) {
  //   fetchUrl('/api/listing/get/' + props.businessId);
  // }

  const handleCancel = () => {
    // if user close modal make sure to return the original business received from parent
    props.bussinessCardCallback(props.business);
    setVisible(false);
  };

  const handleOk = (business: any) => {
    // if user click on ok, call update API
    setLoading(true);

    const postRequest = {};

    // updateBusiness('/api/listing/', postRequest);
    setLoading(false);
    setVisible(false);
    success();
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

  async function updateBusiness(url: string, body: any) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    if (response.ok) {
      props.bussinessCardCallback(data);
    } else {
      error();
    }
  }

  // async function fetchUrl(url: string) {
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   if (response.ok) {
  //     setBusiness(data);
  //   } else {
  //     error();
  //   }
  // }

  const goHome = () => {
    history.push('/');
  };

  return (
    <Modal
      visible={visible}
      title="Update Business"
      onCancel={handleCancel}
      footer={null}
    >
      <BuildBusinessForm
        onSubmit={handleOk}
        businessModel={props.business}
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
