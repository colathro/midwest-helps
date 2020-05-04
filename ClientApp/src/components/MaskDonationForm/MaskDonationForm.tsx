import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Collapse, Typography, Modal } from 'antd';
import { DonationSection } from './DonationSection';
import './MaskDonationForm.scss';
import { BeforeStartSection } from './BeforeStartSection';
import { DonatorSection } from './DonatorSection';
import {
  MASK_DONATION_SECTION,
  IMaskRequest,
  IMaskDonationRequest,
  IDonator,
  IMaskInfo
} from '../../../types';

const { Title } = Typography;

export interface MaskDonationFormProps {
  request: IMaskRequest;
}

export const MaskDonationForm: React.FC<MaskDonationFormProps> = (props) => {
  const [activePanels, setActivePanels] = useState([
    MASK_DONATION_SECTION.BeforeStart.value
  ]);
  const [disabledPanels, setDisabledPanels] = useState([
    MASK_DONATION_SECTION.Donator.value,
    MASK_DONATION_SECTION.Donation.value
  ]);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [maskDonationRequest, setMaskDonationRequest] = useState<
    IMaskDonationRequest
  >({
    donator: {
      bestContactType: 'Email',
      name: '',
      company: '',
      email: '',
      phone: ''
    },
    donation: [],
    requestId: ''
  });

  const history = useHistory();

  const onSubmit = () => {
    post('/api/maskDonation', maskDonationRequest);
  };

  const post = async (url: string, data: IMaskDonationRequest) => {
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

  const setRequest = () => {
    setMaskDonationRequest({
      requestId: props.request.id || '',
      donator: maskDonationRequest.donator,
      donation: maskDonationRequest.donation
    });
    // if user has not gone through all sections set active and disabled sections
    if (!allowSubmit) {
      setActivePanels([
        MASK_DONATION_SECTION.BeforeStart.value,
        MASK_DONATION_SECTION.Donator.value
      ]);
      setDisabledPanels([MASK_DONATION_SECTION.Donation.value]);
    }
  };

  const setDonator = (donator: IDonator) => {
    setMaskDonationRequest({
      requestId: maskDonationRequest.requestId,
      donator,
      donation: maskDonationRequest.donation
    });
    // if user has not gone through all sections set active and disabled sections
    if (!allowSubmit) {
      setActivePanels([
        MASK_DONATION_SECTION.BeforeStart.value,
        MASK_DONATION_SECTION.Donator.value,
        MASK_DONATION_SECTION.Donation.value
      ]);
      setDisabledPanels([]);
    }
  };

  const setDonation = (donation: IMaskInfo[]) => {
    setMaskDonationRequest({
      requestId: maskDonationRequest.requestId,
      donator: maskDonationRequest.donator,
      donation
    });
    // once user has set the delivery details user should be able to submit the request
    setAllowSubmit(true);
  };

  const onChangeCollapse = (key: string | string[]) => {
    setActivePanels(Array.isArray(key) ? key : [key]);
  };

  return (
    <>
      <Title level={2}>Donate masks</Title>
      <Typography>
        These masks are not regulated by the FDA and are community-sourced. They
        may not provide protection against splashes and sprays.
      </Typography>
      <Collapse activeKey={activePanels} onChange={onChangeCollapse}>
        <Collapse.Panel
          header={MASK_DONATION_SECTION.BeforeStart.label}
          key={MASK_DONATION_SECTION.BeforeStart.value}
          showArrow={false}
          disabled={disabledPanels.includes(
            MASK_DONATION_SECTION.BeforeStart.value
          )}
        >
          <BeforeStartSection onFinish={setRequest} />
        </Collapse.Panel>
        <Collapse.Panel
          header={MASK_DONATION_SECTION.Donator.label}
          key={MASK_DONATION_SECTION.Donator.value}
          showArrow={false}
          disabled={disabledPanels.includes(
            MASK_DONATION_SECTION.Donator.value
          )}
        >
          <DonatorSection onFinish={setDonator} />
        </Collapse.Panel>
        <Collapse.Panel
          header={MASK_DONATION_SECTION.Donation.label}
          key={MASK_DONATION_SECTION.Donation.value}
          showArrow={false}
          disabled={disabledPanels.includes(
            MASK_DONATION_SECTION.Donation.value
          )}
        >
          <DonationSection
            masksRequested={props.request.maskDetails.masks}
            onFinish={setDonation}
          />
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
