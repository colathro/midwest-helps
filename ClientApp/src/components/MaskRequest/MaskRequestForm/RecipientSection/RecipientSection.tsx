import React, { useState } from 'react';
import { get as _get, camelCase as _camelCase } from 'lodash';
import { Form, Button, Typography, Row, Col } from 'antd';
import { TextField } from '../../../FormFields/TextField';
import {
  RadioGroup,
  RadioItem
} from '../../../FormFields/RadioGroup/RadioGroup';
import { MaskFor, MASK_FOR, IRecipient } from '../../../../types';

const { Text } = Typography;

export interface RecipientSectionProps {
  onFinish: (maskRequest: IRecipient) => void;
}

export const RecipientSection: React.FC<RecipientSectionProps> = (props) => {
  const [displaySummary, setDisplaySummary] = useState(false);
  const [recipientSection, setRecipientSection] = useState({
    maskFor: '',
    name: '',
    company: '',
    email: '',
    phone: ''
  });

  const radioItems: RadioItem[] = Object.entries(MASK_FOR).map(
    ([value, label]) => ({
      label,
      value,
      checked: false
    })
  );

  const onFinish = (obj: object) => {
    setDisplaySummary(true);
    const recipientSectionObj = obj as IRecipient;
    setRecipientSection(recipientSectionObj);
    props.onFinish(recipientSectionObj);
  };

  const onEditClick = () => {
    setDisplaySummary(false);
  };

  const summary = () => {
    return (
      <>
        <Row>
          <Col span={22}>
            <Text strong>Who are the masks for?</Text>
            <br />
            <Text type="secondary">
              {MASK_FOR[recipientSection.maskFor as MaskFor]}
            </Text>
            <br />
            <br />
            <Text strong>{recipientSection.name}</Text>
            <br />
            {recipientSection.company && (
              <>
                <Text type="secondary">{recipientSection.company}</Text>
                <br />
              </>
            )}
            <Text type="secondary">{recipientSection.email}</Text>
            <br />
            <Text type="secondary">{recipientSection.phone}</Text>
          </Col>
          <Col span={2}>
            <Button type="link" onClick={() => onEditClick()}>
              Edit
            </Button>
          </Col>
        </Row>
      </>
    );
  };

  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      name="recipient-form"
      onFinish={onFinish}
      scrollToFirstError
    >
      {displaySummary ? (
        summary()
      ) : (
        <>
          <RadioGroup
            name="maskFor"
            title="Who are the masks for?"
            radioItems={radioItems}
            required={true}
          />
          <TextField
            name="name"
            type="string"
            placeHolder="Name"
            required={true}
          />
          <TextField
            name="company"
            type="string"
            placeHolder="Company (optional)"
          />
          <TextField
            name="email"
            type="email"
            placeHolder="Email"
            required={true}
          />
          <TextField
            name="phone"
            type="phone"
            placeHolder="Phone number"
            required={true}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Continue
            </Button>
          </Form.Item>
        </>
      )}
    </Form>
  );
};
