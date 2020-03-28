import React from 'react';
import { Form, Input } from 'antd';


export interface TextFieldProps {
  title: string;
  type: TextFieldType;
  subTitle?: string;
  required?: boolean;
  tileInline?: boolean;
  subTileInline?: boolean;
}

export type TextFieldType =
  | 'name'
  | 'email'
  | 'phone'
  | 'website';

export declare type RuleType = 
| 'string' 
| 'number' 
| 'boolean' 
| 'method' 
| 'regexp' 
| 'integer' 
| 'float' 
| 'object' 
| 'enum' 
| 'date' 
| 'url' 
| 'hex' 
| 'email';

export const TextField: React.FC<TextFieldProps> = props => {
  let rulesType : RuleType = 'string';

  if (props.type == 'email'){
    rulesType = 'email';
  } else if (props.type == 'website') {
    rulesType = 'url';
  } else if (props.type == 'phone') {
    rulesType = 'number';
  }

  return (
    <Form.Item
        name={props.type}
        label={props.title}
        rules={[
          {
            type: rulesType,
            message: 'The input is not valid ' + props.title,
          },
          {
            required: props.required,
            message: 'Please input your ' + props.title,
          },
        ]}
      >
      <Input />
    </Form.Item>
  );
};
