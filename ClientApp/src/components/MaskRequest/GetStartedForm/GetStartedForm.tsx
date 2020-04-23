import React from 'react';
import { Form, Button } from 'antd';
import { TextField } from '../../FormFields/TextField';
import { RadioGroup, RadioItem } from '../../FormFields/RadioGroup/RadioGroup';
import { MaskFor, MASKFOR } from '../../../types';

export interface GetStartedFormProps {
  onSubmit: (maskRequest: any) => void;
}

export const GetStartedForm: React.FC<GetStartedFormProps> = (props) => {
  const radioItems: RadioItem[] = [
    {
      label: MASKFOR['MedicalFacility'],
      value: 'MedicalFacility' as MaskFor,
      checked: false,
    },
    {
      label: MASKFOR['NonProfit'],
      value: 'NonProfit' as MaskFor,
      checked: false,
    },
    {
      label: MASKFOR['EssentialWorker'],
      value: 'EssentialWorker' as MaskFor,
      checked: false,
    },
    {
      label: MASKFOR['Myself'],
      value: 'Myself' as MaskFor,
      checked: false,
    },
  ];

  const onFinish = (maskRequest: any) => {
    props.onSubmit(maskRequest);
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
      <RadioGroup
        name="maskFor"
        title="Who are the masks for?"
        radioItems={radioItems}
      ></RadioGroup>
      <TextField name="name" title="Name" type="name" required={true} />
      <TextField name="email" title="Email" type="email" required={true} />
      <TextField name="company" title="Company" type="name" required={true} />
      <TextField
        name="phoneNumber"
        title="Phone"
        type="phone"
        placeHolder="701-123-4567"
        required={false}
      />
      <Form.Item>
        <Button className="get-started-submit" type="primary" htmlType="submit">
          Continue
        </Button>
      </Form.Item>
    </Form>
  );
};
