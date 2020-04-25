import React, { useState } from 'react';
import { Form, Button, Row, Col, Typography } from 'antd';
import { TextField } from '../../FormFields/TextField';
import {
  CheckboxItem,
  CheckboxGroup,
} from '../../FormFields/CheckboxGroup/CheckboxGroup';
import { RECEIVE_MASK_CHANNEL, ReceiveMaskChannel } from '../../../types';

const { Title, Text } = Typography;

export interface DeliveryDetailsFormProps {
  onFinish: (maskRequest: any) => void;
}

export const DeliveryDetailsForm: React.FC<DeliveryDetailsFormProps> = (
  props
) => {
  const [dropOffAddresssVisible, setDropOffAddresssVisible] = useState(false);
  const [mailAddresssVisible, setMailAddresssVisible] = useState(false);
  const [displaySummary, setDisplaySummary] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    receiveMaskChannel: [],
    deliveryNotes: '',
    dropOffAddress1: '',
    dropOffAddress2: '',
    dropOffCity: '',
    dropOffState: '',
    dropOffZipCode: '',
    mailAddress1: '',
    mailAddress2: '',
    mailCity: '',
    mailState: '',
    mailZipCode: '',
  });

  const checkboxItems: CheckboxItem[] = [
    {
      label: RECEIVE_MASK_CHANNEL['DropOff'],
      value: 'DropOff',
      checked: false,
      onChange: () => {
        setDropOffAddresssVisible(!dropOffAddresssVisible);
      },
    },
    {
      label: RECEIVE_MASK_CHANNEL['Mail'],
      value: 'Mail',
      checked: false,
      onChange: () => {
        setMailAddresssVisible(!mailAddresssVisible);
      },
    },
  ];

  const buildAddressForm = (name: string, label: string) => {
    return (
      <>
        <Title level={4}>{label}</Title>
        <TextField
          name={name + 'Address1'}
          type="name"
          placeHolder="Address 1"
          required={true}
        />
        <TextField
          name={name + 'Address2'}
          type="name"
          placeHolder="Address 2 (optional)"
        />
        <TextField
          name={name + 'City'}
          type="name"
          placeHolder="City"
          required={true}
        />
        <Row gutter={8}>
          <Col span={12}>
            <TextField
              name={name + 'State'}
              type="name"
              placeHolder="State"
              required={true}
            />
          </Col>
          <Col span={12}>
            <TextField
              name={name + 'ZipCode'}
              type="name"
              placeHolder="Zip code"
              required={true}
            />
          </Col>
        </Row>
      </>
    );
  };

  const onFinish = (deliveryDetailsObj: any) => {
    setDisplaySummary(true);
    setDeliveryDetails(deliveryDetailsObj);
    props.onFinish(deliveryDetailsObj);
  };

  const summaryAddress = (
    title: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    zipCode: string
  ) => {
    return (
      <>
        <Text strong>{title}</Text>
        <br />
        <Text type="secondary">{address1}</Text>
        <br />
        {address2 && (
          <>
            <Text type="secondary">{address2}</Text>
            <br />
          </>
        )}
        <Text type="secondary">
          {city}, {state}
        </Text>
        <br />
        <Text type="secondary">{zipCode}</Text>
        <br />
        <br />
      </>
    );
  };

  const summary = () => {
    return (
      <>
        <Text strong>How do you want to receive masks?</Text>
        <br />
        {deliveryDetails.receiveMaskChannel.map((rmc) => (
          <>
            <Text type="secondary">
              {RECEIVE_MASK_CHANNEL[rmc as ReceiveMaskChannel]}
            </Text>
            <br />
          </>
        ))}
        <br />
        {dropOffAddresssVisible &&
          summaryAddress(
            'Drop-off address',
            deliveryDetails.dropOffAddress1,
            deliveryDetails.dropOffAddress2,
            deliveryDetails.dropOffCity,
            deliveryDetails.dropOffState,
            deliveryDetails.dropOffZipCode
          )}
        {mailAddresssVisible &&
          summaryAddress(
            'Mail address',
            deliveryDetails.mailAddress1,
            deliveryDetails.mailAddress2,
            deliveryDetails.mailCity,
            deliveryDetails.mailState,
            deliveryDetails.mailZipCode
          )}
        <Text strong>Delivery notes</Text>
        <br />
        <Text type="secondary">{deliveryDetails.deliveryNotes}</Text>
      </>
    );
  };

  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      name="delivery-details-form"
      onFinish={onFinish}
      scrollToFirstError
    >
      {displaySummary ? (
        summary()
      ) : (
        <>
          <CheckboxGroup
            name="receiveMaskChannel"
            title="How do you want to receive masks?"
            checkboxItems={checkboxItems}
          />
          {dropOffAddresssVisible &&
            buildAddressForm('dropOff', 'Drop-off address')}
          {mailAddresssVisible && buildAddressForm('mail', 'Mail address')}
          <Title level={4}>Delivery notes</Title>
          <TextField
            name="deliveryNotes"
            type="text"
            placeHolder="Provide any details or instructions for the individuals that are dropping off your masks"
          />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Review
            </Button>
          </Form.Item>
        </>
      )}
    </Form>
  );
};
