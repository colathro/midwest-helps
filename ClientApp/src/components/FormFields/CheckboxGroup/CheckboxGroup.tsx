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
  name: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = props => {
  return (
    <Form.Item name={props.name} label={props.title} className="hotdish-input">
      <Checkbox.Group>
        <Row>
          {props.checkboxItems.map((item, index) => (
            <Col key={index} span={16}>
              <Checkbox value={item.name}>{item.name}</Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </Form.Item>
  );
};