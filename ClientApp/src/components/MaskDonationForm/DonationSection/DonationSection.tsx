import React, { useState } from 'react';
import { get as _get, set as _set, camelCase as _camelCase } from 'lodash';
import { Form, Button, Typography, Row, Col, Layout } from 'antd';
import { TextField } from '../../FormFields/TextField';
import { MASK_TYPE, MaskType, IMaskSection, IMaskInfo } from '../../../types';
const { Text } = Typography;
const { Content } = Layout;

export interface DonationSectionProps {
  masksRequested: IMaskInfo[];
  onFinish: (maskRequest: IMaskInfo[]) => void;
}

export const DonationSection: React.FC<DonationSectionProps> = (props) => {
  const [displaySummary, setDisplaySummary] = useState(false);
  const [maskSection, setMaskSection] = useState({
    maskTypes: props.masksRequested.map((mr) => {
      return mr.type;
    }),
    maskRequirements: '',
    fabricQnt: 0,
    faceShieldQnt: 0,
    earGuardsQnt: 0,
    scrubCapsQnt: 0,
    othersQnt: 0
  } as IMaskSection);

  const onFinish = (obj: object) => {
    _set(
      obj,
      'maskTypes',
      props.masksRequested.map((mr) => {
        return mr.type;
      })
    );
    const maskSectionObj = obj as IMaskSection;
    setMaskSection(maskSectionObj);
    setDisplaySummary(true);
    props.onFinish(processMaskSectionObj(maskSectionObj));
  };

  const processMaskSectionObj = (maskSectionObj: IMaskSection) => {
    return processMaskInfo(maskSectionObj);
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
            {maskSection.maskTypes.map((mt, index) => (
              <Row key={index}>
                <Col span={2}>
                  <Text strong>
                    {_get(maskSection, _camelCase(`${mt}Qnt`), 0)}
                  </Text>
                </Col>
                <Col span={22}>
                  <Text type="secondary">{MASK_TYPE[mt as MaskType]}</Text>
                </Col>
              </Row>
            ))}
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
          <Text>How many masks are being donated?</Text>
          {props.masksRequested.map((mr, index) => (
            <TextField
              name={_camelCase(`${mr.type}Qnt`)}
              type="number"
              placeHolder={`${mr.quantity} - requested`}
              addonAfter={MASK_TYPE[mr.type]}
            />
          ))}
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
