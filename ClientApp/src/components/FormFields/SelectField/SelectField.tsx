import React from "react";
import { Form, Select } from "antd";

import "../FormFields.scss";

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

const { Option } = Select;

export const SelectField: React.FC<SelectFieldProps> = props => {
  return (
    <Form.Item
      name={props.name}
      label={props.title}
      rules={[
        {
          required: props.required,
          message: "Please input your " + props.title.toLowerCase()
        }
      ]}
      className="hotdish-input"
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
