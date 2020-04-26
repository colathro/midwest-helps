import React, { useState } from 'react';
import { Form, Button, Typography, Row, Col } from 'antd';
import { TextField } from '../../FormFields/TextField';
import {
  CheckboxItem,
  CheckboxGroup
} from '../../FormFields/CheckboxGroup/CheckboxGroup';
import { MASK_TYPE, MaskType } from '../../../types';
const { Text } = Typography;

export interface MaskSectionProps {
  onFinish: (maskRequest: any) => void;
}

export const MaskSection: React.FC<MaskSectionProps> = (props) => {
  const [displaySummary, setDisplaySummary] = useState(false);
  const [maskDetails, setMaskDetails] = useState({
    maskType: [],
    maskRequirements: ''
  });

  const checkboxItems: CheckboxItem[] = [
    {
      label: MASK_TYPE['Fabric'],
      value: 'Fabric',
      checked: false
    },
    {
      label: MASK_TYPE['FaceShield'],
      value: 'FaceShield',
      checked: false
    },
    {
      label: MASK_TYPE['EarGuards'],
      value: 'EarGuards',
      checked: false
    },
    {
      label: MASK_TYPE['ScrubCaps'],
      value: 'ScrubCaps',
      checked: false
    },
    {
      label: MASK_TYPE['Others'],
      value: 'Others',
      checked: false
    }
  ];

  const onFinish = (maskDetailsObj: any) => {
    setDisplaySummary(true);
    setMaskDetails(maskDetailsObj);
    props.onFinish(maskDetailsObj);
  };

  const onEditClick = () => {
    setDisplaySummary(false);
  };

  const summary = () => {
    return (
      <>
        <Row>
          <Col span={22}>
            <Text strong>What type of masks are you in need of?</Text>
            <br />
            {maskDetails.maskType.map((mt) => (
              <>
                <Text type="secondary">{MASK_TYPE[mt as MaskType]}</Text>
                <br />
              </>
            ))}
            <br />
            <Text strong>Mask requirements</Text>
            <br />
            {maskDetails.maskRequirements ? (
              <Text type="secondary">{maskDetails.maskRequirements}</Text>
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
      name="mask-details-form"
      onFinish={onFinish}
      scrollToFirstError
    >
      {displaySummary ? (
        summary()
      ) : (
        <>
          <CheckboxGroup
            name="maskType"
            title="What type of masks are you in need of?"
            checkboxItems={checkboxItems}
            required={true}
          ></CheckboxGroup>
          <TextField
            name="maskRequirements"
            title="Mask requirements"
            type="text"
            placeHolder="Provide any details, instructions, or links for those making the masks"
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
