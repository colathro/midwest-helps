import React from 'react';
import { Form, Select } from 'antd';

import '../FormFields.scss';
import { LabeledValue } from 'antd/lib/select';

export interface SelectFieldProps {
  name: string;
  title: string;
  items: LabeledValue[];
  placeHolder?: string;
  required?: boolean;
  defaultValue?: LabeledValue;
}

const { Option } = Select;

export const SelectField: React.FC<SelectFieldProps> = props => {
  return (
    <Form.Item
      name={props.name}
      label={props.title}
      rules={[
        {
          required: props.required,
          message: 'Please input your ' + props.title.toLowerCase()
        }
      ]}
      className="hotdish-input"
    >
      <Select placeholder={props.placeHolder} allowClear>
        {props.items.map((item, index) => (
          <Option key={index} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};
