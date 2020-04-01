import React from 'react';
import { Form, Input } from 'antd';

import '../FormFields.scss';

export interface TextFieldProps {
  name: string;
  title: string;
  type: TextFieldType;
  subTitle?: string;
  placeHolder?: string;
  required?: boolean;
  defaultValue?: string;
}

export type TextFieldType = 'name' | 'email' | 'phone' | 'url' | 'text';

export declare type RuleType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'regexp'
  | 'integer'
  | 'url'
  | 'email';

const { TextArea } = Input;

export const TextField: React.FC<TextFieldProps> = props => {
  let rules = [];

  if (props.type === 'email') {
    rules.push({
      type: 'email' as RuleType,
      message: 'The ' + props.title.toLowerCase() + 'input is not valid.'
    });
  } else if (props.type === 'url') {
    rules.push({
      type: 'url' as RuleType,
      message: 'The ' + props.title.toLowerCase() + 'input is not valid.'
    });
  } else if (props.type === 'phone') {
    rules.push({
      pattern: new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/),
      message: 'The ' + props.title.toLowerCase() + 'input is not valid.'
    });
  } else {
    rules.push({
      type: 'string' as RuleType,
      message: 'The ' + props.title.toLowerCase() + 'input is not valid.'
    });
  }

  rules.push({
    required: props.required,
    message: 'Please input your ' + props.title.toLowerCase()
  });

  const subTitle = props.subTitle ? (
    <p className="subtitle">{props.subTitle}</p>
  ) : (
    <></>
  );

  return (
    <span>
      <Form.Item
        name={props.name}
        label={props.title}
        rules={rules}
        className="hotdish-input"
      >
        {subTitle}
        {props.type === 'text' ? (
          <TextArea rows={5} placeholder={props.placeHolder} allowClear />
        ) : (
          <Input min={8} max={12} placeholder={props.placeHolder} allowClear />
        )}
      </Form.Item>
    </span>
  );
};
