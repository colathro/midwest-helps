import React from 'react';
import { Form, Radio, Row, Col } from 'antd';

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
  let rules = [];

  if (props.required) {
    rules.push({
      required: true,
      message: 'Please, select one of the options',
    });
  }

  return (
    <Form.Item
      name={props.name}
      label={props.title}
      rules={rules}
      className="hotdish-input"
    >
      <Radio.Group>
        <Row>
          {props.radioItems.map((item, index) => (
            <Col key={index} span={16}>
              <Radio value={item.value} defaultChecked={item.checked}>
                {item.label}
              </Radio>
            </Col>
          ))}
        </Row>
      </Radio.Group>
    </Form.Item>
  );
};
