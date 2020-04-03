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

  const handleCancel = () => {
    // if user close modal make sure to return the original business received from parent
    props.bussinessCardCallback(props.business);
    setVisible(false);
  };

  const updateBusiness = (business: any) => {
    business.id = props.business.id;
    business.category = props.business.category;
    business.name = props.business.name;

    const putRequest: Business = {
      id: props.business.id,
      name: props.business.name,
      category: props.business.category,
      hours: business.hours || 'None',
      phoneNumber: business.phoneNumber || '',
      website: business.website || '',
      message: business.message || '',
      facebookUrl: business.facebookUrl || '',
      instagramUrl: business.instagramUrl || '',
      liveStreamUrl: business.liveStreamUrl || '',
      orderUrl: business.orderUrl || '',
      giftCardUrl: business.giftCardUrl || '',
      interactions: business.interactions || [],
      deliveryApps: business.deliveryApps || []
    };

    put('/api/listing/' + business.id, putRequest);
  };

  function success() {
    Modal.success({
      content: 'Your business was submitted successfully.',
      onOk: () => goHome(),
      onCancel: () => goHome()
    });
  }

  function error() {
    Modal.error({
      title: 'Oops',
      content: 'There was a problem updating your business. Try again later.',
      onOk: () => goHome(),
      onCancel: () => goHome()
    });
  }

  async function put(url: string, body: Business) {
    const requestOptions = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    const response = await fetch(url, requestOptions);
    setVisible(false);
    if (response.ok) {
      success();
    } else {
      error();
    }
    props.bussinessCardCallback(props.business);
  }

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
        onSubmit={updateBusiness}
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
