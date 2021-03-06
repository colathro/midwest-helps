import React from 'react';
import { Form, Input } from 'antd';

import '../FormFields.scss';

export interface TextFieldProps {
  name: string;
  title?: string;
  type: TextFieldType;
  subTitle?: string;
  placeHolder?: string;
  required?: boolean;
  defaultValue?: string;
  addonAfter?: string;
}

export type TextFieldType =
  | 'string'
  | 'email'
  | 'number'
  | 'phone'
  | 'url'
  | 'zipCode'
  | 'text';

export declare type RuleType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'regexp'
  | 'integer'
  | 'url'
  | 'email';

const { TextArea } = Input;

export const TextField: React.FC<TextFieldProps> = (props) => {
  const rules = [];

  if (props.type === 'email') {
    rules.push({
      type: 'email' as RuleType,
      message:
        'The ' +
        (props.title ? props.title?.toLowerCase() : 'email') +
        ' input is not valid.'
    });
  } else if (props.type === 'url') {
    rules.push({
      type: 'url' as RuleType,
      message:
        'The ' +
        (props.title ? props.title?.toLowerCase() : 'url') +
        ' input is not valid.'
    });
  } else if (props.type === 'phone') {
    rules.push({
      pattern: new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/),
      message:
        'The ' +
        (props.title ? props.title?.toLowerCase() : 'phone') +
        ' input is not valid.'
    });
  } else if (props.type === 'zipCode') {
    rules.push({
      pattern: new RegExp(/(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/),
      message:
        'The ' +
        (props.title ? props.title?.toLowerCase() : 'zip code') +
        ' input is not valid.'
    });
  } else if (props.type === 'number') {
    rules.push({
      pattern: new RegExp(/^\d+$/),
      message:
        'The ' +
        (props.title ? props.title?.toLowerCase() : 'number') +
        ' input is not valid.'
    });
  } else {
    rules.push({
      type: 'string' as RuleType,
      message:
        'The ' +
        (props.title ? props.title?.toLowerCase() : 'field') +
        ' input is not valid.'
    });
  }

  rules.push({
    required: props.required,
    message: 'Field must be filled'
  });

  return (
    <span>
      <Form.Item
        name={props.name}
        label={props.title}
        rules={rules}
        className="hotdish-input"
      >
        {props.type === 'text' ? (
          <TextArea
            rows={5}
            placeholder={props.placeHolder}
            allowClear
            defaultValue={props.defaultValue}
          />
        ) : (
          <Input
            min={8}
            max={12}
            placeholder={props.placeHolder}
            allowClear
            defaultValue={props.defaultValue}
            addonAfter={props.addonAfter}
          />
        )}
      </Form.Item>
    </span>
  );
};
