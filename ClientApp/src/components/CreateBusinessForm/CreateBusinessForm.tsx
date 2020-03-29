import React from 'react';
import { Form, Button } from 'antd';
import { TextField } from '../FormFields/TextField';
import { CheckboxGroup } from '../FormFields/CheckboxGroup';
import { SelectField } from '../FormFields/SelectField';

const checkboxProductChannelItems = [
  { name: 'Curb-side' },
  { name: 'Take-out' },
  { name: 'Drive-thru' },
  { name: 'Delivery' },
  { name: 'Live-stream' },
  { name: 'By appointment only' }
];

const checkboxAppDeliveryItems = [
  { name: 'Uber Eats' },
  { name: 'GrubHub' },
  { name: 'Door Dash' },
  { name: 'Postmates' },
  { name: 'Food Dudes' },
  { name: 'Bite Squad' }
];

const categories = [
  { name: '🎨 — Art & Culture', value: 1 },
  { name: '🍸 — Bar & Brewery', value: 2 },
  { name: '💈 — Beauty', value: 3 },
  { name: '☕ — Coffee', value: 4 },
  { name: '🎸 — Entertainment', value: 5 },
  { name: '🛒 — Grocery', value: 6 },
  { name: '🙏 — Religion & Spiritual', value: 7 },
  { name: '🍔 — Restaurant', value: 8 },
  { name: '👕 — Retail', value: 9 },
  { name: '🧡 — Wellness', value: 10 },
  { name: '📦 — Other', value: 11 }
];

export const CreateBusinessForm: React.FC = props => {
  const onFinish = (business: any) => {
    console.log('Success:', business);

    const postRequest = {
      BusinessName: business.name,
      BusinessType: 1,
      PhoneNumber: business.phone,
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
      BiteSquad: business.checkboxGroupAppDelivery.includes('Bite Squad')
    };

    createBusiness(postRequest);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

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
        window.location.href = window.location.origin;
      });
  }

  return (
    <Form
      layout="vertical"
      name="create-business-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
    >
      <SelectField
        name="category"
        title="Business category"
        items={categories}
        placeHolder="Select a category for your business"
        required={true}
      ></SelectField>
      <TextField
        name="name"
        title="Business name"
        type="name"
        placeHolder="Enter the name of your business"
        required={true}
      />
      <TextField
        name="phone"
        title="Phone"
        type="phone"
        placeHolder="701-555-1234"
        required={false}
      />
      <TextField
        name="liveStreamUrl"
        title="Live stream link"
        type="url"
        placeHolder="https://youtube.com"
        required={false}
      />
      <TextField
        name="orderUrl"
        title="Order link"
        type="url"
        placeHolder="https://businessname.com/order"
        required={false}
      />
      <TextField
        name="message"
        title="Message to customers"
        type="text"
        subTitle="Give details like hours and how customers can get your product or service."
        placeHolder="Provide details like hours and any special instructions you want customers to know about"
        required={true}
      />
      <CheckboxGroup
        name="checkboxGroupProductChannel"
        title="How can customers recieve your product or service?"
        checkboxItems={checkboxProductChannelItems}
      />
      <CheckboxGroup
        name="checkboxGroupAppDelivery"
        title="Do you used app based delivery?"
        checkboxItems={checkboxAppDeliveryItems}
      />
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
