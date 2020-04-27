import React from 'react';
import { Typography, Row, Col } from 'antd';
import '../FormFields.scss';
import { TextField } from '../TextField';
import { SelectField } from '../SelectField';
import { IStateResult } from 'usa-states';

const { Title, Text } = Typography;

export interface AddressSectionProps {
  label: string;
  name: string;
}

export const addressSummary = (
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

export const AddressSection: React.FC<AddressSectionProps> = (props) => {
  const UsaStates = require('usa-states').UsaStates;
  const usStates = new UsaStates();
  const stateList = usStates.states.map((item: IStateResult) => {
    return {
      label: item.name,
      value: item.abbreviation
    };
  });
  return (
    <>
      <Title level={4}>{props.label}</Title>
      <TextField
        name={props.name + 'Address1'}
        type="string"
        placeHolder="Address 1"
        required={true}
      />
      <TextField
        name={props.name + 'Address2'}
        type="string"
        placeHolder="Address 2 (optional)"
      />
      <TextField
        name={props.name + 'City'}
        type="string"
        placeHolder="City"
        required={true}
      />
      <Row gutter={8}>
        <Col span={12}>
          <SelectField
            name={props.name + 'State'}
            items={stateList}
            placeHolder="State"
            required={true}
            allowSearch={true}
          />
        </Col>
        <Col span={12}>
          <TextField
            name={props.name + 'ZipCode'}
            type="zipCode"
            placeHolder="Zip code"
            required={true}
          />
        </Col>
      </Row>
    </>
  );
};
