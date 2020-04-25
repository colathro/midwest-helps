import React from 'react';
import { Form, Button } from 'antd';
import { TextField } from '../../FormFields/TextField';
import { CheckboxGroup } from '../../FormFields/CheckboxGroup/CheckboxGroup';
import { MASKTYPE, MaskSectionFields } from '../../../types';

export interface MaskSectionProps {
  onSubmit: (maskRequest: MaskSectionSubmitValues) => void;
}

export type MaskSectionSubmitValues = {
  [name in keyof MaskSectionFields]: string;
};

export const MaskSection: React.FC<MaskSectionProps> = (props) => (
  <Form
    layout="vertical"
    name="mask-request-form"
    onFinish={(values) => props.onSubmit(values as MaskSectionSubmitValues)}
    scrollToFirstError
  >
    <CheckboxGroup
      name="maskFor"
      title="What type of masks are you in need of?"
      checkboxItems={Object.entries(MASKTYPE).map(([value, label]) => ({
        label,
        value,
        checked: false
      }))}
    ></CheckboxGroup>
    <TextField
      name="maskRequirements"
      title="Mask requirements"
      type="text"
      placeHolder="Provide any details, instructions, or links for those making the masks"
    />
    <Form.Item>
      <Button className="mask-request-submit" type="primary" htmlType="submit">
        Continue
      </Button>
    </Form.Item>
  </Form>
);
