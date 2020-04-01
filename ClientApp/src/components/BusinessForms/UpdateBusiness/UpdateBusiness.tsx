import React, { useState, useEffect } from 'react';
import { Typography, Modal, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { BuildBusinessForm } from '../BuildBusinessForm/BuildBusinessForm';

export interface UpdateBusinessProps {
  businessId: string;
  displayUpdate: boolean;
}

export const UpdateBusiness: React.FC<UpdateBusinessProps> = props => {
  let history = useHistory();

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = (business: any) => {
    setLoading(true);

    const postRequest = {
      Id: business.id,
      BusinessName: business.name,
      BusinessType: business.category,
      Website: business.website,
      Hours: business.hours,
      PhoneNumber: business.phone.replace(/\D/g, ''),
      FacebookdUrl: business.facebookUrl,
      InstagramUrl: business.instagramUrl,
      LiveStreamUrl: business.liveStreamUrl,
      OrderUrl: business.orderUrl,
      MessageToCustomer: business.message,
      CurbSide: business.checkboxGroupProductChannel.includes('Curb-side'),
      TakeOut: business.checkboxGroupProductChannel.includes('Take-out'),
      DriveThru: business.checkboxGroupProductChannel.includes('Drive-thru'),
      Delivery: business.checkboxGroupProductChannel.includes('Delivery'),
      LiveStream: business.checkboxGroupProductChannel.includes('Live-stream'),
      AppointmentOnly: business.checkboxGroupProductChannel.includes(
        'By appointment only'
      ),
      UberEats: business.checkboxGroupAppDelivery.includes('Uber Eats'),
      Grubhub: business.checkboxGroupAppDelivery.includes('GrubHub'),
      DoorDash: business.checkboxGroupAppDelivery.includes('Door Dash'),
      Postmates: business.checkboxGroupAppDelivery.includes('Postmates'),
      FoodDudes: business.checkboxGroupAppDelivery.includes('Food Dudes'),
      BiteSquad: business.checkboxGroupAppDelivery.includes('Bite Squad'),
      GiftCardUrl: business.giftCardUrl
    };

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
      setVisible(props.displayUpdate);
    } else {
      error();
    }
  }

  const goHome = () => {
    history.push('/');
  };

  fetchUrl('/api/listing/get/1');

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
        isUpdate={true}
        onSubmit={handleOk}
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
