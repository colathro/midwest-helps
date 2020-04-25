import React from 'react';
import { Form, Button, Collapse } from 'antd';
import { GetStartedForm } from '../GetStartedForm/GetStartedForm';
import { MaskDetailsForm } from '../MaskDetailsForm/MaskDetailsForm';
import { DeliveryDetailsForm } from '../DeliveryDetailsForm/DeliveryDetailsForm';
import './MaskRequestForm.scss';

export interface MaskRequestFormProps {
  onSubmit: (maskRequest: any) => void;
}

export const MaskRequestForm: React.FC<MaskRequestFormProps> = (props) => {
  const onFinish = (maskRequest: any) => {
    props.onSubmit(maskRequest);
  };

  const [form] = Form.useForm();

  return (
    <>
      <Collapse>
        <Collapse.Panel header="1. Get started" key="1">
          <GetStartedForm onSubmit={() => {}}></GetStartedForm>
        </Collapse.Panel>
        <Collapse.Panel header="2. Mask details" key="2">
          <MaskDetailsForm onSubmit={() => {}}></MaskDetailsForm>
        </Collapse.Panel>
        <Collapse.Panel header="3. Delivery details" key="3">
          <DeliveryDetailsForm onSubmit={() => {}}></DeliveryDetailsForm>
        </Collapse.Panel>
      </Collapse>
      <Button className="mask-request-submit" type="primary" htmlType="submit">
        Submit
      </Button>
    </>
  );
};
