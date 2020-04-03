/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import { Button, Modal, Form, Radio } from 'antd';
import { Business, ReportCategory } from '../../types';
import { TextField } from '../FormFields/TextField';

import './ReportModal.scss';

export interface ReportModalProps {
  business?: Business;
  visible?: boolean;
  close: Function;
}

export const ReportModal: React.FC<ReportModalProps> = props => {
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

  var handleCancel = () => {
    setRadioValue(0);
    setIsRadioButtonSelected(false);
    var radioWrapper = document.getElementsByClassName(
      'ant-radio-wrapper-checked'
    );
    if (radioWrapper.length > 0) {
      radioWrapper[0].classList.remove('ant-radio-wrapper-checked');
    }
    var radio = document.getElementsByClassName('ant-radio-checked');
    if (radio.length > 0) {
      radio[0].classList.remove('ant-radio-checked');
    }
    props.close();
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

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  };

  var onChange = (e: any) => {
    console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
    setIsRadioButtonSelected(true);
  };

  function success() {
    setIsSending(false);
    props.close();
  }

  function error() {
    props.close();
  }

  function sendMessage(data: any) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch('/api/contact/', requestOptions)
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

  return (
    <Modal
      title={'Report ' + props.business?.name}
      visible={props.visible}
      onOk={handleSend}
      onCancel={handleCancel}
      footer={null}
    >
      <Form name="report" onFinish={onSubmit}>
        <Form.Item required={true}>
          <Radio.Group onChange={onChange}>
            <Radio style={radioStyle} value={ReportCategory.innacurate}>
              Innacurate information
            </Radio>
            <Radio style={radioStyle} value={ReportCategory.spam}>
              Spam
            </Radio>
            <Radio style={radioStyle} value={ReportCategory.offensive}>
              Innapropriate/offensive content
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="button-item">
          <Button key="back" onClick={handleCancel}>
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
