import React, { useState } from 'react';
import { get as _get, camelCase as _camelCase } from 'lodash';
import { Form, Button, Typography, Row, Col } from 'antd';
import { TextField } from '../../FormFields/TextField';
import {
  CheckboxItem,
  CheckboxGroup
} from '../../FormFields/CheckboxGroup/CheckboxGroup';
import {
  MASK_TYPE,
  MaskType,
  IMaskSection,
  IMaskDetails,
  IMaskInfo
} from '../../../types';
const { Text } = Typography;

export interface DonationSectionProps {
  onFinish: (maskRequest: IMaskInfo[]) => void;
}

export const DonationSection: React.FC<DonationSectionProps> = (props) => {
  const [displaySummary, setDisplaySummary] = useState(false);
  const [maskSection, setMaskSection] = useState({
    maskTypes: [] as string[],
    maskRequirements: '',
    fabricQnt: 0,
    faceShieldQnt: 0,
    earGuardsQnt: 0,
    scrubCapsQnt: 0,
    othersQnt: 0
  } as IMaskSection);

  const checkboxItems: CheckboxItem[] = Object.entries(MASK_TYPE).map(
    ([value, label]) => ({
      label,
      value,
      checked: maskSection.maskTypes.includes(value),
      displayFragmentOnChecked: (
        <TextField
          name={_camelCase(`${value}Qnt`)}
          placeHolder="0"
          type="string"
          required={true}
        />
      )
    })
  );

  const onFinish = (obj: object) => {
    setDisplaySummary(true);
    const maskSectionObj = obj as IMaskSection;
    setMaskSection(maskSectionObj);
    props.onFinish(processMaskSectionObj(maskSectionObj));
  };

  const processMaskSectionObj = (maskSectionObj: IMaskSection) => {
    return {
      requirements: maskSectionObj.maskRequirements,
      masks: processMaskInfo(maskSectionObj)
    } as IMaskDetails;
  };

  const processMaskInfo = (maskSectionObj: IMaskSection) => {
    return maskSectionObj.maskTypes.map((mt) => {
      return {
        type: mt,
        quantity: _get(maskSectionObj, _camelCase(`${mt}Qnt`), 0)
      } as IMaskInfo;
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
            <Text strong>What type of masks are you in need of?</Text>
            <br />
            {maskSection.maskTypes.map((mt, index) => (
              <Row key={index}>
                <Col span={12}>
                  <Text type="secondary">{MASK_TYPE[mt as MaskType]}</Text>
                </Col>
                <Col span={8}>
                  <Text type="secondary">
                    {`Quantity: ${_get(
                      maskSection,
                      _camelCase(`${mt}Qnt`),
                      0
                    )}`}
                  </Text>
                </Col>
              </Row>
            ))}
            <br />
            <Text strong>Mask requirements</Text>
            <br />
            {maskSection.maskRequirements ? (
              <Text type="secondary">{maskSection.maskRequirements}</Text>
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
