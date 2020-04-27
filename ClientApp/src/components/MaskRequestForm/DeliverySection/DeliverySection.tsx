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
  IDeliverySection,
  IStates
} from '../../../types';
import { SelectField } from '../../FormFields/SelectField';
import UsaStates from 'usa-states';

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

  const usStates: UsaStates = new UsaStates();
  const stateList = usStates.states.map((item: IStates) => {
    return {
      label: item.name,
      value: item.abbreviation
    };
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

  const buildAddressForm = (name: string, label: string) => {
    return (
      <>
        <Title level={4}>{label}</Title>
        <TextField
          name={name + 'Address1'}
          type="string"
          placeHolder="Address 1"
          required={true}
        />
        <TextField
          name={name + 'Address2'}
          type="string"
          placeHolder="Address 2 (optional)"
        />
        <TextField
          name={name + 'City'}
          type="string"
          placeHolder="City"
          required={true}
        />
        <Row gutter={8}>
          <Col span={12}>
            <SelectField
              name={name + 'State'}
              items={stateList}
              placeHolder="State"
              required={true}
              allowSearch={true}
            />
          </Col>
          <Col span={12}>
            <TextField
              name={name + 'ZipCode'}
              type="zipCode"
              placeHolder="Zip code"
              required={true}
            />
          </Col>
        </Row>
      </>
    );
  };

  const onFinish = (deliveryDetailsObj: object) => {
    setDisplaySummary(true);
    setDeliveryDetails(deliveryDetailsObj as IDeliverySection);
    props.onFinish(deliveryDetailsObj);
  };

  const onEditClick = () => {
    setDisplaySummary(false);
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
