import React, { useState } from 'react';
import { get as _get, camelCase as _camelCase } from 'lodash';
import { Form, Button, Row, Col, Typography } from 'antd';
import { TextField } from '../../FormFields/TextField';
import {
  CheckboxItem,
  CheckboxGroup
} from '../../FormFields/CheckboxGroup/CheckboxGroup';
import {
  RECEIVE_MASK_CHANNEL,
  ReceiveMaskChannel,
  IDeliverySection,
  IAddress,
  IDelivery
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
  const [deliverySection, setDeliverySection] = useState({
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

  const onFinish = (obj: object) => {
    setDisplaySummary(true);
    const deliverySectionObj = obj as IDeliverySection;
    setDeliverySection(deliverySectionObj);
    props.onFinish(processDeliverySectionObj(deliverySectionObj));
  };

  const processDeliverySectionObj = (deliverySectionObj: IDeliverySection) => {
    return {
      addresses: processAddressInfo(deliverySectionObj),
      notes: deliverySectionObj.deliveryNotes
    } as IDelivery;
  };

  const processAddressInfo = (deliverySectionObj: IDeliverySection) => {
    return deliverySectionObj.receiveMaskChannel.map((rmc) => {
      return {
        type: rmc,
        address1: _get(deliverySectionObj, _camelCase(`${rmc}Address1`), ''),
        address2: _get(deliverySectionObj, _camelCase(`${rmc}Address2`), ''),
        city: _get(deliverySectionObj, _camelCase(`${rmc}City`), ''),
        state: _get(deliverySectionObj, _camelCase(`${rmc}State`), ''),
        zipCode: _get(deliverySectionObj, _camelCase(`${rmc}ZipCode`), '')
      } as IAddress;
    });
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
            {deliverySection.receiveMaskChannel.map((rmc, index) => (
              <Row key={index}>
                <Text type="secondary">
                  {RECEIVE_MASK_CHANNEL[rmc as ReceiveMaskChannel]}
                </Text>
                <br />
              </Row>
            ))}
            <br />
            {dropOffAddresssVisible &&
              addressSummary(
                'Drop-off address',
                deliverySection.dropOffAddress1,
                deliverySection.dropOffAddress2,
                deliverySection.dropOffCity,
                deliverySection.dropOffState,
                deliverySection.dropOffZipCode
              )}
            {mailAddresssVisible &&
              addressSummary(
                'Mail address',
                deliverySection.mailAddress1,
                deliverySection.mailAddress2,
                deliverySection.mailCity,
                deliverySection.mailState,
                deliverySection.mailZipCode
              )}
            <Text strong>Delivery notes</Text>
            <br />
            {deliverySection.deliveryNotes ? (
              <Text type="secondary">{deliverySection.deliveryNotes}</Text>
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
