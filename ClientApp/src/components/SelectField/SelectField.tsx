import React from "react";
import { Form, Typography, Select } from "antd";
const { Option } = Select;

export interface SelectFieldProps {
  name: string;
  title: string;
  items: SelectItem[];
  placeHolder?: string;
  required?: boolean;
}

export interface SelectItem {
  name: string;
  value: number;
}

export const SelectField: React.FC<SelectFieldProps> = props => {
  return (
    <Form.Item
      name={props.name}
      label={props.title}
      rules={[{ required: true }]}
    >
      <Select placeholder={props.placeHolder} allowClear>
        {props.items.map((item, index) => (
          <Option key={index} value={item.value}>
            {item.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};
