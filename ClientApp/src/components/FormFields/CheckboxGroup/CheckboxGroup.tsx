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

export const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  // const defaultValues: string[] = props.checkboxItems
  //   .filter((c) => c.checked)
  //   .map((c) => {
  //     return c.value;
  //   });

  return (
    <Form.Item name={props.name} label={props.title} className="hotdish-input">
      <Checkbox.Group>
        <Row>
          {props.checkboxItems.map((item, index) => (
            <Col key={index} span={16}>
              <Checkbox value={item.value} defaultChecked={item.checked}>
                {item.label}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </Form.Item>
  );
};
