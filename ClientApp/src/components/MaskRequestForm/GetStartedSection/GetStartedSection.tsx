import React from 'react';
import { Form, Button } from 'antd';
import { TextField } from '../../FormFields/TextField';
import { RadioGroup } from '../../FormFields/RadioGroup/RadioGroup';
import { MASKFOR, GetStartedSectionFields } from '../../../types';

export interface GetStartedSectionProps {
  onSubmit: (maskRequest: GetStartedSectionSubmitValues) => void;
}

export type GetStartedSectionSubmitValues = {
  [name in keyof GetStartedSectionFields]: string;
};

export const GetStartedSection: React.FC<GetStartedSectionProps> = (props) => (
  <Form
    layout="vertical"
    name="get-started-form"
    onFinish={(values) =>
      props.onSubmit(values as GetStartedSectionSubmitValues)
    }
    scrollToFirstError
  >
    <RadioGroup
      name="maskFor"
      title="Who are the masks for?"
      radioItems={Object.entries(MASKFOR).map(([value, label]) => ({
        label,
        value,
        checked: false
      }))}
    ></RadioGroup>
    <TextField name="name" type="name" placeHolder="Name" required={true} />
    <TextField name="company" type="name" placeHolder="Company" />
    <TextField name="email" type="email" placeHolder="Email" required={true} />
    <TextField
      name="phoneNumber"
      type="phone"
      placeHolder="Phone number"
      required={true}
    />
    <Form.Item>
      <Button className="get-started-submit" type="primary" htmlType="submit">
        Continue
      </Button>
    </Form.Item>
  </Form>
);
