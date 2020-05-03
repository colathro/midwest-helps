import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Collapse, Typography, Modal } from 'antd';
import { RecipientSection } from './RecipientSection';
import { MaskSection } from './MaskSection';
import { DeliverySection } from './DeliverySection';
import './MaskRequestForm.scss';
import { MASK_REQUEST_SECTION, IMaskRequest } from '../../types';

const { Title } = Typography;

export const MaskRequestForm: React.FC = () => {
  const [activePanels, setActivePanels] = useState([
    MASK_REQUEST_SECTION.Recipient.value
  ]);
  const [disablePanels, setDisablePanels] = useState([
    MASK_REQUEST_SECTION.Mask.value,
    MASK_REQUEST_SECTION.Delivery.value
  ]);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [maskFormCompleted, setMaskFormCompleted] = useState({
    recipient: {},
    maskDetails: {},
    delivery: {}
  });

  const history = useHistory();

  const onSubmit = () => {
    post('/api/maskRequest', maskFormCompleted as IMaskRequest);
  };

  const post = async (url: string, data: IMaskRequest) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const response = await fetch(url, requestOptions);
    if (response.ok) {
      success();
    } else {
      error();
    }
  };

  const success = () => {
    Modal.success({
      content: 'Your request was submitted successfully.',
      onOk: () => goToMasks()
    });
  };

  const error = () => {
    Modal.error({
      title: 'Oops',
      content: 'There was a problem submitting your request. Try again later.'
    });
  };

  const goToMasks = () => {
    history.push('/masks');
  };

  const setRecipientObj = (recipientObj: object) => {
    setMaskFormCompleted({
      recipient: recipientObj,
      maskDetails: maskFormCompleted.maskDetails,
      delivery: maskFormCompleted.delivery
    });
    // if user has not gone through all sections set active and disabled sections
    if (!allowSubmit) {
      setActivePanels([
        MASK_REQUEST_SECTION.Recipient.value,
        MASK_REQUEST_SECTION.Mask.value
      ]);
      setDisablePanels([MASK_REQUEST_SECTION.Delivery.value]);
    }
  };

  const setMaskDetailsObj = (maskObj: object) => {
    setMaskFormCompleted({
      recipient: maskFormCompleted.recipient,
      maskDetails: maskObj,
      delivery: maskFormCompleted.delivery
    });
    // if user has not gone through all sections set active and disabled sections
    if (!allowSubmit) {
      setActivePanels([
        MASK_REQUEST_SECTION.Recipient.value,
        MASK_REQUEST_SECTION.Mask.value,
        MASK_REQUEST_SECTION.Delivery.value
      ]);
      setDisablePanels([]);
    }
  };

  const setDeliveryDetailsObj = (deliverObj: object) => {
    setMaskFormCompleted({
      recipient: maskFormCompleted.recipient,
      maskDetails: maskFormCompleted.maskDetails,
      delivery: deliverObj
    });
    // once user has set the delivery details user should be able to submit the request
    setAllowSubmit(true);
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
          header={MASK_REQUEST_SECTION.Recipient.label}
          key={MASK_REQUEST_SECTION.Recipient.value}
          showArrow={false}
          disabled={disablePanels.includes(
            MASK_REQUEST_SECTION.Recipient.value
          )}
        >
          <RecipientSection onFinish={setRecipientObj} />
        </Collapse.Panel>
        <Collapse.Panel
          header={MASK_REQUEST_SECTION.Mask.label}
          key={MASK_REQUEST_SECTION.Mask.value}
          showArrow={false}
          disabled={disablePanels.includes(MASK_REQUEST_SECTION.Mask.value)}
        >
          <MaskSection onFinish={setMaskDetailsObj} />
        </Collapse.Panel>
        <Collapse.Panel
          header={MASK_REQUEST_SECTION.Delivery.label}
          key={MASK_REQUEST_SECTION.Delivery.value}
          showArrow={false}
          disabled={disablePanels.includes(MASK_REQUEST_SECTION.Delivery.value)}
        >
          <DeliverySection onFinish={setDeliveryDetailsObj} />
        </Collapse.Panel>
      </Collapse>
      {allowSubmit && (
        <Button type="primary" onClick={() => onSubmit()}>
          Submit
        </Button>
      )}
    </>
  );
};
