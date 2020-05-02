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
  const [checkedItems, setCheckedItems] = useState([] as boolean[]);

  const onChange = (item: CheckboxItem, index: number) => {
    if (item.onChange) {
      item.onChange();
    }

    if (checkedItems.length === 0) {
      props.checkboxItems.map((i) => {
        checkedItems.push(false);
      });
    }

    checkedItems[index] = !checkedItems[index];
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
          <Row>
            <>
              <Col key={index} span={checkedItems[index] ? 10 : 24}>
                <Checkbox
                  value={item.value}
                  defaultChecked={item.checked}
                  onChange={() => {
                    onChange(item, index);
                  }}
                >
                  {item.label}
                </Checkbox>
              </Col>
              <Col span={6} offset={4}>
                {checkedItems[index] && item.displayFragmentOnChecked}
              </Col>
            </>
          </Row>
        ))}
      </Checkbox.Group>
    </Form.Item>
  );
};
