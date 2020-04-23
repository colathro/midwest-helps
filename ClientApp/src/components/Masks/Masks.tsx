import React, { useState } from 'react';
import './Masks.scss';
import { Button, Modal } from 'antd';
import { MaskRequestForm } from '../MaskRequest/MaskRequestForm';

export const Masks: React.FC = () => {
  const [displayMaskRequest, setDisplayMaskRequest] = useState(false);

  const displayMaskRequestForm = (display: boolean) => {
    setDisplayMaskRequest(display);
  };

  const handleCancel = () => {
    displayMaskRequestForm(false);
  };

  const maskRequestModal = (
    <Modal
      visible={displayMaskRequest}
      title="MidwestHelps"
      onCancel={handleCancel}
      footer={null}
    >
      <MaskRequestForm onSubmit={() => {}} />
    </Modal>
  );

  return (
    <>
      {displayMaskRequest && maskRequestModal}
      <Button
        type="primary"
        onClick={() => {
          displayMaskRequestForm(true);
        }}
      >
        Request masks
      </Button>
    </>
  );
};
