import React, { useState } from 'react';
import { Form, Button, Typography, Row, Col } from 'antd';
import { TextField } from '../../FormFields/TextField';
import { RadioGroup, RadioItem } from '../../FormFields/RadioGroup/RadioGroup';
import { MaskFor, MASK_FOR, IRecipientSection } from '../../../types';

const { Text } = Typography;

export interface RecipientSectionProps {
  onFinish: (maskRequest: object) => void;
}

export const RecipientSection: React.FC<RecipientSectionProps> = (props) => {
  const [displaySummary, setDisplaySummary] = useState(false);
  const [getStarted, setGetStarted] = useState({
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

  const onFinish = (maskRequest: object) => {
    setDisplaySummary(true);
    setGetStarted(maskRequest as IRecipientSection);
    props.onFinish(maskRequest);
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
              {MASK_FOR[getStarted.maskFor as MaskFor]}
            </Text>
            <br />
            <br />
            <Text strong>{getStarted.name}</Text>
            <br />
            {getStarted.company && (
              <>
                <Text type="secondary">{getStarted.company}</Text>
                <br />
              </>
            )}
            <Text type="secondary">{getStarted.email}</Text>
            <br />
            <Text type="secondary">{getStarted.phone}</Text>
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
            type="name"
            placeHolder="Name"
            required={true}
          />
          <TextField
            name="company"
            type="name"
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
