import React from 'react';
import { Form, Radio } from 'antd';

import '../FormFields.scss';

export interface RadioGroupProps {
  name: string;
  title: string;
  radioItems: RadioItem[];
  defaultValue?: number;
  subTitle?: string;
  required?: boolean;
}

export interface RadioItem {
  label: string;
  value: string;
  checked: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  return (
    <Form.Item name={props.name} label={props.title} className="hotdish-input">
      <Radio.Group>
        {props.radioItems.map((item, index) => (
          <Radio key={index} value={item.value} defaultChecked={item.checked}>
            {item.label}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};
