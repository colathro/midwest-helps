import React from 'react';
import { Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { BuildBusinessForm } from '../BuildBusinessForm/BuildBusinessForm';
import { Business } from '../../../types';

export const CreateBusiness: React.FC = (props) => {
  let history = useHistory();

  const createBusiness = (business: any) => {
    const postRequest: Business = {
      name: business.name,
      category: business.category,
      hours: business.hours || 'None',
      phoneNumber: business.phoneNumber
        ? business.phoneNumber.replace(/\D/g, '')
        : '',
      website: business.website || '',
      message: business.message || '',
      facebookUrl: business.facebookUrl || '',
      instagramUrl: business.instagramUrl || '',
      liveStreamUrl: business.liveStreamUrl || '',
      orderUrl: business.orderUrl || '',
      giftCardUrl: business.giftCardUrl || '',
      interactions: business.interactions || [],
      deliveryApps: business.deliveryApps || [],
    };

    post('/api/listing', postRequest);
  };

  function success() {
    Modal.success({
      content: 'Your business was submitted successfully.',
      onOk: () => goHome(),
    });
  }

  function error() {
    Modal.error({
      title: 'Oops',
      content: 'There was a problem submitting your business. Try again later.',
      onOk: () => goHome(),
    });
  }

  async function post(url: string, data: any) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, requestOptions);
    if (response.ok) {
      success();
    } else {
      error();
    }
  }

  const goHome = () => {
    history.push('/');
  };

  return (
    <BuildBusinessForm
      onSubmit={createBusiness}
      displayBusinessType={true}
      displayBusinessName={true}
      displayHours={true}
      displayPhoneNumber={true}
      displayUrls={true}
      displayMessage={true}
      displayProductChannel={true}
      displayAppDeliveryItems={true}
      displayGiftCardUrl={true}
    ></BuildBusinessForm>
  );
};
