import React from 'react';
import { Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import {
  BuildBusinessForm,
  BusinessFormSubmitValues
} from '../BuildBusinessForm/BuildBusinessForm';
import {
  Business,
  BusinessCategory,
  BusinessHours,
  BusinessInteraction,
  BusinessDeliveryApp
} from '../../../types';

export const CreateBusiness: React.FC = () => {
  const history = useHistory();

  const createBusiness = (business: BusinessFormSubmitValues) => {
    const postRequest: Business = {
      name: business.name,
      category: business.category as BusinessCategory,
      hours: (business.hours || 'None') as BusinessHours,
      phoneNumber: business.phoneNumber
        ? business.phoneNumber.replace(/\D/g, '')
        : '',
      website: business.website || '',
      message: business.message || '',
      liveStreamUrl: business.liveStreamUrl || '',
      orderUrl: business.orderUrl || '',
      giftCardUrl: business.giftCardUrl || '',
      interactions: (business.interactions || []) as BusinessInteraction[],
      deliveryApps: (business.deliveryApps || []) as BusinessDeliveryApp[]
    };

    post('/api/listing', postRequest);
  };

  const success = () => {
    Modal.success({
      content: 'Your business was submitted successfully.',
      onOk: () => goHome()
    });
  };

  const error = () => {
    Modal.error({
      title: 'Oops',
      content: 'There was a problem submitting your business. Try again later.',
      onOk: () => goHome()
    });
  };

  const post = async (url: string, data: Business) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const response = await fetch(url, requestOptions);
    if (response.ok) {
      success();
    } else {
      error();
    }
  };

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
