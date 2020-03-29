import React from "react";
import { Form, Input } from "antd";

export interface TextFieldProps {
  name: string;
  title: string;
  type: TextFieldType;
  subTitle?: string;
  required?: boolean;
  titleInline?: boolean;
  subTileInline?: boolean;
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
    <Form.Item name={props.name} label={props.title} rules={rules}>
      <Input min={8} max={12} />
    </Form.Item>
  );
};
