import React from 'react';
import { Form, Button } from 'antd';
import { TextField } from '../FormFields/TextField';
import './MaskRequestForm.scss';

export interface MaskRequestFormProps {
  onSubmit: (maskRequest: any) => void;
}

export const MaskRequestForm: React.FC<MaskRequestFormProps> = (props) => {
  const onFinish = (business: any) => {
    props.onSubmit(business);
  };

  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      name="create-business-form"
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
        <Button className="business-submit" type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};
