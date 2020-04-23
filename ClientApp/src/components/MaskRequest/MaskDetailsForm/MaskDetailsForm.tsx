import React from 'react';
import { Form, Button } from 'antd';
import { TextField } from '../../FormFields/TextField';
import {
  CheckboxItem,
  CheckboxGroup,
} from '../../FormFields/CheckboxGroup/CheckboxGroup';
import { MASKTYPE, MaskType } from '../../../types';

export interface MaskDetailsFormProps {
  onSubmit: (maskRequest: any) => void;
}

export const MaskDetailsForm: React.FC<MaskDetailsFormProps> = (props) => {
  const checkboxItems: CheckboxItem[] = [
    {
      label: MASKTYPE['Fabric'],
      value: 'Fabric' as MaskType,
      checked: false,
    },
    {
      label: MASKTYPE['FaceShield'],
      value: 'FaceShield' as MaskType,
      checked: false,
    },
    {
      label: MASKTYPE['EarGuards'],
      value: 'EarGuards' as MaskType,
      checked: false,
    },
    {
      label: MASKTYPE['ScrubCaps'],
      value: 'ScrubCaps' as MaskType,
      checked: false,
    },
    {
      label: MASKTYPE['Others'],
      value: 'Others' as MaskType,
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
      name="mask-request-form"
      onFinish={onFinish}
      scrollToFirstError
    >
      <CheckboxGroup
        name="maskFor"
        title="What type of masks are you in need of?"
        checkboxItems={checkboxItems}
      ></CheckboxGroup>
      <TextField
        name="maskRequirements"
        title="Mask requirements"
        type="text"
        placeHolder="Provide any details, instructions, or links for those making the masks"
      />
      <Form.Item>
        <Button
          className="mask-request-submit"
          type="primary"
          htmlType="submit"
        >
          Continue
        </Button>
      </Form.Item>
    </Form>
  );
};
