import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Collapse, Typography, Modal, Row, Col } from 'antd';
import { RecipientSection } from './RecipientSection';
import { MaskSection } from './MaskSection';
import { DeliverySection } from './DeliverySection';
import './MaskRequestForm.scss';
import {
  MASK_REQUEST_SECTION,
  IMaskRequest,
  IRecipient,
  IMaskDetails,
  IDelivery,
  PAGE_DISPLAY_TYPE
} from '../../../types';

const { Title } = Typography;

export const MaskRequestForm: React.FC = () => {
  const [pageDisplay, setPageDisplay] = useState(PAGE_DISPLAY_TYPE.Form);
  const [activePanels, setActivePanels] = useState([
    MASK_REQUEST_SECTION.Recipient.value
  ]);
  const [disabledPanels, setDisabledPanels] = useState([
    MASK_REQUEST_SECTION.Mask.value,
    MASK_REQUEST_SECTION.Delivery.value
  ]);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [maskRequest, setMaskRequest] = useState<IMaskRequest>({
    recipient: {
      maskFor: 'Myself',
      name: '',
      company: '',
      email: '',
      phone: ''
    },
    maskDetails: {
      masks: [],
      requirements: ''
    },
    delivery: {
      addresses: [],
      notes: ''
    }
  });

  const history = useHistory();

  const onSubmit = () => {
    post('/api/maskRequest', maskRequest);
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
      setPageDisplay(PAGE_DISPLAY_TYPE.Success);
    } else {
      error();
    }
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

  const setRecipient = (recipient: IRecipient) => {
    setMaskRequest({
      recipient,
      maskDetails: maskRequest.maskDetails,
      delivery: maskRequest.delivery
    });
    // if user has not gone through all sections set active and disabled sections
    if (!allowSubmit) {
      setActivePanels([
        MASK_REQUEST_SECTION.Recipient.value,
        MASK_REQUEST_SECTION.Mask.value
      ]);
      setDisabledPanels([MASK_REQUEST_SECTION.Delivery.value]);
    }
  };

  const setMaskDetails = (maskDetails: IMaskDetails) => {
    setMaskRequest({
      recipient: maskRequest.recipient,
      maskDetails,
      delivery: maskRequest.delivery
    });
    // if user has not gone through all sections set active and disabled sections
    if (!allowSubmit) {
      setActivePanels([
        MASK_REQUEST_SECTION.Recipient.value,
        MASK_REQUEST_SECTION.Mask.value,
        MASK_REQUEST_SECTION.Delivery.value
      ]);
      setDisabledPanels([]);
    }
  };

  const setDeliveryDetails = (delivery: IDelivery) => {
    setMaskRequest({
      recipient: maskRequest.recipient,
      maskDetails: maskRequest.maskDetails,
      delivery
    });
    // once user has set the delivery details user should be able to submit the request
    setAllowSubmit(true);
  };

  const onChangeCollapse = (key: string | string[]) => {
    setActivePanels(Array.isArray(key) ? key : [key]);
  };

  const displayFormPage = () => {
    return (
      <>
        <Title level={2}>Request masks</Title>
        <Typography>
          These masks are not regulated by the FDA and are community-sourced.
          They may not provide protection against splashes and sprays.
        </Typography>
        <Collapse activeKey={activePanels} onChange={onChangeCollapse}>
          <Collapse.Panel
            header={MASK_REQUEST_SECTION.Recipient.label}
            key={MASK_REQUEST_SECTION.Recipient.value}
            showArrow={false}
            disabled={disabledPanels.includes(
              MASK_REQUEST_SECTION.Recipient.value
            )}
          >
            <RecipientSection onFinish={setRecipient} />
          </Collapse.Panel>
          <Collapse.Panel
            header={MASK_REQUEST_SECTION.Mask.label}
            key={MASK_REQUEST_SECTION.Mask.value}
            showArrow={false}
            disabled={disabledPanels.includes(MASK_REQUEST_SECTION.Mask.value)}
          >
            <MaskSection onFinish={setMaskDetails} />
          </Collapse.Panel>
          <Collapse.Panel
            header={MASK_REQUEST_SECTION.Delivery.label}
            key={MASK_REQUEST_SECTION.Delivery.value}
            showArrow={false}
            disabled={disabledPanels.includes(
              MASK_REQUEST_SECTION.Delivery.value
            )}
          >
            <DeliverySection onFinish={setDeliveryDetails} />
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

  const displaySuccessPage = () => {
    return (
      <>
        <Row justify="center">
          <img
            src="/images/avatars/man.svg"
            style={{ maxHeight: '500px' }}
          ></img>
        </Row>
        <Row justify="center">
          <Title level={2}>Masks requested</Title>
          <Typography>
            Your mask request is being processed and will be posted for makers
            to see shortly. We hope you are staying safe and healthy during
            these difficult times.
          </Typography>
          <Button onClick={() => goToMasks()}>Done</Button>
        </Row>
      </>
    );
  };

  const displayFailPage = () => {
    return <></>;
  };

  return pageDisplay === PAGE_DISPLAY_TYPE.Form
    ? displayFormPage()
    : pageDisplay === PAGE_DISPLAY_TYPE.Success
    ? displaySuccessPage()
    : displayFailPage();
};
