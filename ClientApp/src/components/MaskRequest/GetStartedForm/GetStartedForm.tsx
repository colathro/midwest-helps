import React, { useState } from 'react';
import { Form, Button, Typography } from 'antd';
import { TextField } from '../../FormFields/TextField';
import { RadioGroup, RadioItem } from '../../FormFields/RadioGroup/RadioGroup';
import { MaskFor, MASK_FOR } from '../../../types';

const { Text } = Typography;

export interface GetStartedFormProps {
  onFinish: (maskRequest: any) => void;
}

export const GetStartedForm: React.FC<GetStartedFormProps> = (props) => {
  const [displaySummary, setDisplaySummary] = useState(false);
  const [getStarted, setGetStarted] = useState({
    maskFor: '',
    name: '',
    company: '',
    email: '',
    phone: '',
  });
  const radioItems: RadioItem[] = [
    {
      label: MASK_FOR['MedicalFacility'],
      value: 'MedicalFacility',
      checked: false,
    },
    {
      label: MASK_FOR['NonProfit'],
      value: 'NonProfit',
      checked: false,
    },
    {
      label: MASK_FOR['EssentialWorker'],
      value: 'EssentialWorker',
      checked: false,
    },
    {
      label: MASK_FOR['Myself'],
      value: 'Myself',
      checked: false,
    },
  ];

  const onFinish = (maskRequest: any) => {
    setDisplaySummary(true);
    setGetStarted(maskRequest);
    props.onFinish(maskRequest);
  };

  const summary = () => {
    return (
      <>
        <Text strong>Who are the masks for?</Text>
        <br />
        <Text type="secondary">{MASK_FOR[getStarted.maskFor as MaskFor]}</Text>
        <br />
        <br />
        <Text strong>{getStarted.name}</Text>
        <br />
        <Text type="secondary">{getStarted.company}</Text>
        <br />
        <Text type="secondary">{getStarted.email}</Text>
        <br />
        <Text type="secondary">{getStarted.phone}</Text>
      </>
    );
  };

  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      name="get-started-form"
      onFinish={onFinish}
      scrollToFirstError
    >
      {displaySummary ? (
        summary()
      ) : (
        <>
          <RadioGroup
            name="maskFor"
            title="Who are the masks for?"
            radioItems={radioItems}
          ></RadioGroup>
          <TextField
            name="name"
            type="name"
            placeHolder="Name"
            required={true}
          />
          <TextField name="company" type="name" placeHolder="Company" />
          <TextField
            name="email"
            type="email"
            placeHolder="Email"
            required={true}
          />
          <TextField
            name="phone"
            type="phone"
            placeHolder="Phone number"
            required={true}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Continue
            </Button>
          </Form.Item>
        </>
      )}
    </Form>
  );
};
