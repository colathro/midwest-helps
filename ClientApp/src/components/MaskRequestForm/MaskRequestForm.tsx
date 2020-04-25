import React from 'react';
import { Button, Collapse } from 'antd';
import { GetStartedSection } from './GetStartedSection';
import { MaskSection } from './MaskSection';
import { DeliverySection } from './DeliverySection';
import './MaskRequestForm.scss';

export interface MaskRequestFormProps {
  // TODO: type this once all the form fields have been defined
  // tslint:disable-next-line: no-any
  onSubmit: (maskRequest: any) => void;
}

export const MaskRequestForm: React.FC<MaskRequestFormProps> = (props) => {
  // const onFinish = (maskRequest: any) => {
  //   props.onSubmit(maskRequest);
  // };

  return (
    <>
      <Collapse>
        <Collapse.Panel header="1. Get started" key="1">
          <GetStartedSection onSubmit={() => null}></GetStartedSection>
        </Collapse.Panel>
        <Collapse.Panel header="2. Mask details" key="2">
          <MaskSection onSubmit={() => null}></MaskSection>
        </Collapse.Panel>
        <Collapse.Panel header="3. Delivery details" key="3">
          <DeliverySection onSubmit={() => null}></DeliverySection>
        </Collapse.Panel>
      </Collapse>
      <Button className="mask-request-submit" type="primary" htmlType="submit">
        Submit
      </Button>
    </>
  );
};
