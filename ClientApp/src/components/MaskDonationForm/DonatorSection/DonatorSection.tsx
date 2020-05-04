import React, { useState } from 'react';
import { get as _get, camelCase as _camelCase } from 'lodash';
import { Form, Button, Typography, Row, Col } from 'antd';
import { TextField } from '../../FormFields/TextField';
import { RadioGroup, RadioItem } from '../../FormFields/RadioGroup/RadioGroup';
import {
  MaskFor,
  MASK_FOR,
  IRecipient,
  IDonator,
  BestContactType,
  BEST_CONTACT_TYPE
} from '../../../types';

const { Text } = Typography;

export interface DonatorSectionProps {
  onFinish: (donator: IDonator) => void;
}

export const DonatorSection: React.FC<DonatorSectionProps> = (props) => {
  const [displaySummary, setDisplaySummary] = useState(false);
  const [donatorSection, setDonatorSection] = useState<IDonator>({
    bestContactType: 'Email',
    name: '',
    company: '',
    email: '',
    phone: ''
  });

  const radioItems: RadioItem[] = Object.entries(BEST_CONTACT_TYPE).map(
    ([value, label]) => ({
      label,
      value,
      checked: false
    })
  );

  const onFinish = (obj: object) => {
    setDisplaySummary(true);
    const recipientSectionObj = obj as IDonator;
    setDonatorSection(recipientSectionObj);
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
              {
                BEST_CONTACT_TYPE[
                  donatorSection.bestContactType as BestContactType
                ]
              }
            </Text>
            <br />
            <br />
            <Text strong>{donatorSection.name}</Text>
            <br />
            {donatorSection.company && (
              <>
                <Text type="secondary">{donatorSection.company}</Text>
                <br />
              </>
            )}
            <Text type="secondary">{donatorSection.email}</Text>
            <br />
            <Text type="secondary">{donatorSection.phone}</Text>
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
            name="bestContactType"
            title="What is the best way to reach you?"
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
