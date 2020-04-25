import React from 'react';
import { Form, Button } from 'antd';
import { TextField } from '../../FormFields/TextField';
import { DeliverySectionFields } from '../../../types';

export interface DeliverySectionProps {
  onSubmit: (maskRequest: DeliverySectionSubmitValues) => void;
}

export type DeliverySectionSubmitValues = {
  [name in keyof DeliverySectionFields]: string;
};

export const DeliverySection: React.FC<DeliverySectionProps> = (props) => (
  <Form
    layout="vertical"
    name="mask-request-form"
    onFinish={(values) => props.onSubmit(values as DeliverySectionSubmitValues)}
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
      <Button className="mask-request-submit" type="primary" htmlType="submit">
        Review
      </Button>
    </Form.Item>
  </Form>
);
