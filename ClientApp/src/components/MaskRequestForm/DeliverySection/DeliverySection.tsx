import React, { useState } from 'react';
import { Form, Button, Row, Col, Typography } from 'antd';
import { TextField } from '../../FormFields/TextField';
import {
  CheckboxItem,
  CheckboxGroup
} from '../../FormFields/CheckboxGroup/CheckboxGroup';
import {
  RECEIVE_MASK_CHANNEL,
  ReceiveMaskChannel,
  IDeliverySection
} from '../../../types';
import {
  AddressSection,
  addressSummary
} from '../../FormFields/AddressSection';

const { Title, Text } = Typography;

export interface DeliverySectionProps {
  onFinish: (maskRequest: object) => void;
}

export const DeliverySection: React.FC<DeliverySectionProps> = (props) => {
  const [dropOffAddresssVisible, setDropOffAddresssVisible] = useState(false);
  const [mailAddresssVisible, setMailAddresssVisible] = useState(false);
  const [displaySummary, setDisplaySummary] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    receiveMaskChannel: [] as string[],
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
    mailZipCode: ''
  });

  const checkboxItems: CheckboxItem[] = Object.entries(
    RECEIVE_MASK_CHANNEL
  ).map(([value, label]) => ({
    label,
    value,
    checked: false,
    onChange:
      label === RECEIVE_MASK_CHANNEL.DropOff
        ? () => {
            setDropOffAddresssVisible(!dropOffAddresssVisible);
          }
        : () => {
            setMailAddresssVisible(!mailAddresssVisible);
          }
  }));

  const onFinish = (deliveryDetailsObj: object) => {
    setDisplaySummary(true);
    setDeliveryDetails(deliveryDetailsObj as IDeliverySection);
    props.onFinish(deliveryDetailsObj);
  };

  const onEditClick = () => {
    setDisplaySummary(false);
  };

  const summary = () => {
    return (
      <>
        <Row>
          <Col span={22}>
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
              addressSummary(
                'Drop-off address',
                deliveryDetails.dropOffAddress1,
                deliveryDetails.dropOffAddress2,
                deliveryDetails.dropOffCity,
                deliveryDetails.dropOffState,
                deliveryDetails.dropOffZipCode
              )}
            {mailAddresssVisible &&
              addressSummary(
                'Mail address',
                deliveryDetails.mailAddress1,
                deliveryDetails.mailAddress2,
                deliveryDetails.mailCity,
                deliveryDetails.mailState,
                deliveryDetails.mailZipCode
              )}
            <Text strong>Delivery notes</Text>
            <br />
            {deliveryDetails.deliveryNotes ? (
              <Text type="secondary">{deliveryDetails.deliveryNotes}</Text>
            ) : (
              <Text type="secondary">None</Text>
            )}
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
            required={true}
          />
          {dropOffAddresssVisible && (
            <AddressSection label="Drop-off address" name="dropOff" />
          )}
          {mailAddresssVisible && (
            <AddressSection label="Mail address" name="mail" />
          )}
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
