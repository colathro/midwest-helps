/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import { Button, Modal, Form, Radio } from 'antd';
import { Business, ReportType } from '../../../types';

import './ReportBusiness.scss';

export interface ReportBusinessProps {
  business?: Business;
  visible?: boolean;
  close: Function;
}

export const ReportBusiness: React.FC<ReportBusinessProps> = props => {
  const [isSending, setIsSending] = useState(false);
  const [radioValue, setRadioValue] = useState(0);
  const [isRadioButtonSelected, setIsRadioButtonSelected] = useState(false);

  var showIsSending = () => {
    setIsSending(true);
  };

  var handleSend = (values: any) => {
    setIsSending(true);
    values.Business = props.business;
    sendMessage(values);
  };

  const onSubmit = () => {
    console.log(radioValue);
    setIsSending(true);
    const data = {
      Business: props.business,
      ReportType: radioValue
    };
    sendMessage(data);
  };

  var onChange = (e: any) => {
    setRadioValue(e.target.value);
    setIsRadioButtonSelected(true);
  };

  function success() {
    setIsSending(false);
    props.close();
    Modal.success({
      content: 'Your report was submitted successfully.'
    });
  }

  function error() {
    setIsSending(false);
    props.close();
    Modal.error({
      title: 'Oops',
      content: 'There was a problem submitting your report. Try again later.'
    });
  }

  function sendMessage(data: any) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch('/api/report/', requestOptions)
      .then(response => response)
      .then(data => {
        console.log('RESPONSE', data);
        if (data.ok) {
          success();
        } else {
          error();
        }
      })
      .catch(function() {
        error();
      });
  }

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  };

  return (
    <Modal
      title={'Report ' + props.business?.name}
      visible={props.visible}
      onOk={handleSend}
      onCancel={() => {
        props.close();
      }}
      footer={null}
    >
      <Form name="report" onFinish={onSubmit}>
        <Form.Item required={true}>
          <Radio.Group onChange={onChange}>
            <Radio style={radioStyle} value={ReportType.innacurate}>
              Innacurate information
            </Radio>
            <Radio style={radioStyle} value={ReportType.spam}>
              Spam
            </Radio>
            <Radio style={radioStyle} value={ReportType.offensive}>
              Innapropriate/offensive content
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="button-item">
          <Button
            key="back"
            onClick={() => {
              props.close();
            }}
          >
            Cancel
          </Button>
          <Button
            key="Submit"
            htmlType="submit"
            type="primary"
            loading={isSending}
            disabled={!isRadioButtonSelected}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
