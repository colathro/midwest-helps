import React, { useState } from 'react';
import { Button, Collapse, Typography } from 'antd';
import { GetStartedSection } from '../MaskRequestForm/GetStartedSection';
import { MaskSection } from '../MaskRequestForm/MaskSection';
import { DeliverySection } from '../MaskRequestForm/DeliverySection';
import './MaskRequestForm.scss';

const { Title } = Typography;

export const MaskRequestForm: React.FC = () => {
  const [activePanels, setActivePanels] = useState(['1']);
  const [disablePanels, setDisablePanels] = useState(['2', '3']);
  const [displaySubmitButton, setDisplaySubmitButton] = useState(false);
  const [maskFormCompleted, setMaskFormCompleted] = useState({
    getStarted: {},
    maskDetails: {},
    deliveryDetails: {}
  });

  const onSubmit = (maskRequest: any) => {
    //TODO
  };

  const setGetStartedObj = (getStartedObj: object) => {
    setMaskFormCompleted({
      getStarted: getStartedObj,
      maskDetails: maskFormCompleted.maskDetails,
      deliveryDetails: maskFormCompleted.deliveryDetails
    });
    setActivePanels(['1', '2']);
    setDisablePanels(['3']);
  };

  const setMaskDetailsObj = (maskDetailsObj: any) => {
    setMaskFormCompleted({
      getStarted: maskFormCompleted.getStarted,
      maskDetails: maskDetailsObj,
      deliveryDetails: maskFormCompleted.deliveryDetails
    });
    setActivePanels(['1', '2', '3']);
    setDisablePanels([]);
  };

  const setDeliveryDetailsObj = (deliveryDetailsObj: any) => {
    setMaskFormCompleted({
      getStarted: maskFormCompleted.getStarted,
      maskDetails: maskFormCompleted.maskDetails,
      deliveryDetails: deliveryDetailsObj
    });
    setDisplaySubmitButton(true);
  };

  const onChangeCollapse = (key: any) => {
    setActivePanels(key);
  };

  return (
    <>
      <Title level={2}>Request masks</Title>
      <Typography>
        These masks are not regulated by the FDA and are community-sourced. They
        may not provide protection against splashes and sprays.
      </Typography>
      <Collapse activeKey={activePanels} onChange={onChangeCollapse}>
        <Collapse.Panel
          header="1. Get started"
          key="1"
          showArrow={false}
          disabled={disablePanels.includes('1')}
        >
          <GetStartedSection onFinish={setGetStartedObj} />
        </Collapse.Panel>
        <Collapse.Panel
          header="2. Mask details"
          key="2"
          showArrow={false}
          disabled={disablePanels.includes('2')}
        >
          <MaskSection onFinish={setMaskDetailsObj} />
        </Collapse.Panel>
        <Collapse.Panel
          header="3. Delivery details"
          key="3"
          showArrow={false}
          disabled={disablePanels.includes('3')}
        >
          <DeliverySection onFinish={setDeliveryDetailsObj} />
        </Collapse.Panel>
      </Collapse>
      {displaySubmitButton && (
        <Button type="primary" onClick={() => onSubmit({})}>
          Submit
        </Button>
      )}
    </>
  );
};
