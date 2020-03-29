import React from "react";
import { Form, Input, Typography } from "antd";
const { Title, Text } = Typography;
const { TextArea } = Input;

export interface TextFieldProps {
  name: string;
  title: string;
  type: TextFieldType;
  subTitle?: string;
  placeHolder?: string;
  required?: boolean;
}

export type TextFieldType = "name" | "email" | "phone" | "url" | "text";

export declare type RuleType =
  | "string"
  | "number"
  | "boolean"
  | "method"
  | "regexp"
  | "integer"
  | "float"
  | "object"
  | "enum"
  | "date"
  | "url"
  | "hex"
  | "email";

export const TextField: React.FC<TextFieldProps> = props => {
  let rules = [];

  if (props.type === "email") {
    rules.push({
      type: "email" as RuleType,
      message: "The input is not valid " + props.title
    });
  } else if (props.type === "url") {
    rules.push({
      type: "url" as RuleType,
      message: "The input is not valid " + props.title
    });
  } else if (props.type === "phone") {
    rules.push({
      type: "regexp" as RuleType,
      pattern: new RegExp("^[0-9]*$"),
      message: "The input is not valid " + props.title
    });
  } else {
    rules.push({
      type: "string" as RuleType,
      message: "The input is not valid " + props.title
    });
  }

  rules.push({
    required: props.required,
    message: "Please input your " + props.title
  });

  return (
    <span>
      <Form.Item name={props.name} label={props.title} rules={rules}>
        {props.type === "text" ? (
          <TextArea rows={5} placeholder={props.placeHolder} />
        ) : (
          <Input min={8} max={12} placeholder={props.placeHolder} />
        )}
      </Form.Item>
    </span>
  );
};
