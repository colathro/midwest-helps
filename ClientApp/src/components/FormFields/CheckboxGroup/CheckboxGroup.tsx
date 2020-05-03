import React, { ReactFragment } from 'react';
import { Form, Checkbox, Row, Col } from 'antd';

import '../FormFields.scss';
import { useState } from 'react';

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
  onChange?: () => void;
  displayFragmentOnChecked?: ReactFragment;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const [checkedItems, setCheckedItems] = useState(
    props.checkboxItems.map((i) => {
      return i.checked;
    })
  );

  const onChange = (checked: boolean, item: CheckboxItem, index: number) => {
    if (item.onChange) {
      item.onChange();
    }

    checkedItems[index] = checked;
    setCheckedItems([...checkedItems]);
  };

  const rules = [];
  if (props.required) {
    rules.push({
      required: true,
      message: 'Please, select at least one of the options'
    });
  }
  return (
    <Form.Item
      name={props.name}
      label={props.title}
      rules={rules}
      className="hotdish-input"
    >
      <Checkbox.Group>
        {props.checkboxItems.map((item, index) => (
          <Row key={index}>
            <Col
              span={
                checkedItems[index] && item.displayFragmentOnChecked ? 12 : 24
              }
            >
              <Checkbox
                value={item.value}
                defaultChecked={item.checked}
                onChange={(e) => {
                  onChange(e.target.checked, item, index);
                }}
              >
                {item.label}
              </Checkbox>
            </Col>
            <Col span={6} offset={4}>
              {checkedItems[index] && item.displayFragmentOnChecked}
            </Col>
          </Row>
        ))}
      </Checkbox.Group>
    </Form.Item>
  );
};
