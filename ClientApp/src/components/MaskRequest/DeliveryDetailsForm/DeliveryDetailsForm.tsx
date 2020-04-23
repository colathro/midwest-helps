import React from 'react';
import { Form, Button } from 'antd';
import { TextField } from '../../FormFields/TextField';

export interface DeliveryDetailsFormProps {
  onSubmit: (maskRequest: any) => void;
}

export const DeliveryDetailsForm: React.FC<DeliveryDetailsFormProps> = (
  props
) => {
  const onFinish = (maskRequest: any) => {
    props.onSubmit(maskRequest);
  };

  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      name="mask-request-form"
      onFinish={onFinish}
      scrollToFirstError
    >
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
        <Button
          className="mask-request-submit"
          type="primary"
          htmlType="submit"
        >
          Review
        </Button>
      </Form.Item>
    </Form>
  );
};
