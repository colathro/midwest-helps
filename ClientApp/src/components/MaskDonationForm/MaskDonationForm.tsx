import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Collapse, Typography, Modal, Row, Col } from 'antd';
import { DonationSection } from './DonationSection';
import './MaskDonationForm.scss';
import { BeforeStartSection } from './BeforeStartSection';
import { DonorSection } from './DonorSection';
import {
  MASK_DONATION_SECTION,
  IMaskRequest,
  IMaskDonationRequest,
  IDonor,
  IMaskInfo,
  ReceiveMaskChannel,
  PAGE_DISPLAY_TYPE
} from '../../types';
import { addressSummary } from '../FormFields/AddressSection';

const { Title } = Typography;

export interface MaskDonationFormProps {
  request: IMaskRequest;
  onSuccess: () => void;
}

export const MaskDonationForm: React.FC<MaskDonationFormProps> = (props) => {
  const [pageDisplay, setPageDisplay] = useState(PAGE_DISPLAY_TYPE.Form);
  const [activePanels, setActivePanels] = useState([
    MASK_DONATION_SECTION.BeforeStart.value
  ]);
  const [disabledPanels, setDisabledPanels] = useState([
    MASK_DONATION_SECTION.Donor.value,
    MASK_DONATION_SECTION.Donation.value
  ]);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [maskDonationRequest, setMaskDonationRequest] = useState<
    IMaskDonationRequest
  >({
    donor: {
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

  const setRequest = () => {
    setMaskDonationRequest({
      requestId: props.request.id || '',
      donor: maskDonationRequest.donor,
      donation: maskDonationRequest.donation
    });
    // if user has not gone through all sections set active and disabled sections
    if (!allowSubmit) {
      setActivePanels([
        MASK_DONATION_SECTION.BeforeStart.value,
        MASK_DONATION_SECTION.Donor.value
      ]);
      setDisabledPanels([MASK_DONATION_SECTION.Donation.value]);
    }
  };

  const setDonor = (donor: IDonor) => {
    setMaskDonationRequest({
      requestId: maskDonationRequest.requestId,
      donor: donor,
      donation: maskDonationRequest.donation
    });
    // if user has not gone through all sections set active and disabled sections
    if (!allowSubmit) {
      setActivePanels([
        MASK_DONATION_SECTION.BeforeStart.value,
        MASK_DONATION_SECTION.Donor.value,
        MASK_DONATION_SECTION.Donation.value
      ]);
      setDisabledPanels([]);
    }
  };

  const setDonation = (donation: IMaskInfo[]) => {
    setMaskDonationRequest({
      requestId: maskDonationRequest.requestId,
      donor: maskDonationRequest.donor,
      donation
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
        <Title level={2}>Donate masks</Title>
        <Typography>
          These masks are not regulated by the FDA and are community-sourced.
          They may not provide protection against splashes and sprays.
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
            header={MASK_DONATION_SECTION.Donor.label}
            key={MASK_DONATION_SECTION.Donor.value}
            showArrow={false}
            disabled={disabledPanels.includes(
              MASK_DONATION_SECTION.Donor.value
            )}
          >
            <DonorSection onFinish={setDonor} />
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

  const displaySuccessPage = () => {
    return (
      <>
        <Row gutter={[0, 48]}>
          <Col>
            <Title level={2}>Thank you</Title>
            <Typography>
              The medical facility has been notified on you donation. Please
              deliver your masks in a timely manner. Thank you again for you
              donation.
            </Typography>
          </Col>
          <Col span={12}>
            <Title level={4}>Delivery details</Title>
            {props.request.delivery.addresses.map((a) =>
              addressSummary(
                a.type === ('DropOff' as ReceiveMaskChannel)
                  ? 'Drop-off address'
                  : a.type === ('Mail' as ReceiveMaskChannel)
                  ? 'Mail address'
                  : 'Address',
                a.address1,
                a.address2,
                a.city,
                a.state,
                a.zipCode
              )
            )}
          </Col>
          <Col span={12}>
            <Row justify="end">
              <img
                src="/images/avatars/remote-work-woman.svg"
                style={{ maxHeight: '400px' }}
              ></img>
            </Row>
          </Col>
        </Row>
        <Row>
          <Button onClick={() => props.onSuccess()}>Done</Button>
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
