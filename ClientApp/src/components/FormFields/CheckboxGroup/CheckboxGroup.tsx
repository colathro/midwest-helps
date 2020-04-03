import React from 'react';
import { Form, Checkbox, Row, Col } from 'antd';

import '../FormFields.scss';

export interface CheckboxGroupProps {
  name: string;
  title: string;
  checkboxItems: CheckboxItem[];
  subTitle?: string;
  required?: boolean;
}

export interface CheckboxItem {
  label: string;
  value: string;
  checked: boolean;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = props => {
  return (
    <Form.Item name={props.name} label={props.title} className="hotdish-input">
      <Col span={8}>
        <Checkbox.Group
          options={props.checkboxItems}
          defaultValue={props.checkboxItems
            .filter(c => c.checked)
            .map(c => {
              return c.value;
            })}
        />
      </Col>
    </Form.Item>
  );
};
