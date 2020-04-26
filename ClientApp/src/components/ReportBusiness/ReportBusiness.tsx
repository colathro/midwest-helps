import React, { useState } from 'react';
import { Button, Modal, Form, Radio } from 'antd';
import { Business, REPORT_TYPES } from '../../types';

import './ReportBusiness.scss';
import { useForm } from 'antd/lib/form/util';

export interface ReportBusinessProps {
  business: Business;
  visible: boolean;
  close: () => void;
}

type ReportFormSubmitValues = { reportType: string };

export const ReportBusiness: React.FC<ReportBusinessProps> = (props) => {
  const [isSending, setIsSending] = useState(false);
  const [form] = useForm();

  const onSubmit = (values: ReportFormSubmitValues) => {
    setIsSending(true);
    const data = {
      Business: props.business,
      ReportType: parseInt(values.reportType, 10)
    };
    sendMessage(data);
  };

  const success = () => {
    setIsSending(false);
    props.close();
    Modal.success({
      content: 'Your report was submitted successfully.'
    });
  };

  const error = () => {
    setIsSending(false);
    props.close();
    Modal.error({
      title: 'Oops',
      content: 'There was a problem submitting your report. Try again later.'
    });
  };

  const sendMessage = (data: { Business: Business; ReportType: number }) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch('/api/report/', requestOptions)
      .then((response) => response)
      .then((responseData) => {
        if (responseData.ok) {
          success();
        } else {
          error();
        }
      })
      .catch(error);
  };

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  };

  return (
    <Modal
      title={'Report ' + props.business.name}
      visible={props.visible}
      onCancel={props.close}
      footer={null}
    >
      <Form
        name="report"
        onFinish={(values) => onSubmit(values as ReportFormSubmitValues)}
      >
        <Form.Item
          name="reportType"
          required={true}
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio style={radioStyle} value={REPORT_TYPES.innacurate}>
              Innacurate information
            </Radio>
            <Radio style={radioStyle} value={REPORT_TYPES.spam}>
              Spam
            </Radio>
            <Radio style={radioStyle} value={REPORT_TYPES.offensive}>
              Innapropriate/offensive content
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="button-item">
          <Button key="back" onClick={props.close}>
            Cancel
          </Button>
          <Button
            key="Submit"
            htmlType="submit"
            type="primary"
            loading={isSending}
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length)
                .length > 0
            }
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
