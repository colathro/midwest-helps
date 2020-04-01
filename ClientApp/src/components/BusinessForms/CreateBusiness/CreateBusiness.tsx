import React from 'react';
import { Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { BuildBusinessForm } from '../BuildBusinessForm/BuildBusinessForm';

export const CreateBusiness: React.FC = props => {
  let history = useHistory();

  const onFinish = (business: any) => {
    console.log('Success:', business);

    const postRequest = {
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

    createBusiness(postRequest);
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
      content: 'There was a problem submitting your business. Try again later.',
      onOk: () => goHome()
    });
  }

  function createBusiness(data: any) {
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

  const goHome = () => {
    history.push('/');
  };

  return (
    <BuildBusinessForm
      onSubmit={onFinish}
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
