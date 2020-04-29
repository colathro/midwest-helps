import React from 'react';
import { Form, Select } from 'antd';

import '../FormFields.scss';
import { LabeledValue } from 'antd/lib/select';

export interface SelectFieldProps {
  name: string;
  title?: string;
  items: LabeledValue[];
  placeHolder?: string;
  required?: boolean;
  defaultValue?: string;
  allowSearch?: boolean;
}

const { Option } = Select;

export const SelectField: React.FC<SelectFieldProps> = (props) => {
  return (
    <Form.Item
      name={props.name}
      label={props.title}
      rules={[
        {
          required: props.required,
          message:
            'Please, select ' +
            (props.title ? props.title.toLowerCase() : 'one of the options')
        }
      ]}
      className="hotdish-input"
    >
      <Select
        placeholder={props.placeHolder}
        defaultValue={props.defaultValue}
        allowClear
        showSearch={props.allowSearch}
        filterOption={props.allowSearch}
        optionFilterProp={props.allowSearch ? 'children' : ''}
      >
        {props.items.map((item, index) => (
          <Option key={index} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};
