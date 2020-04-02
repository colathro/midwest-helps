import React from 'react';
import { Form, Button, Typography, Collapse } from 'antd';
import { TextField } from '../../FormFields/TextField';
import { CheckboxGroup } from '../../FormFields/CheckboxGroup';
import { SelectField } from '../../FormFields/SelectField';
import { useHistory } from 'react-router-dom';
import './BuildBusinessForm.scss';
import {
  Business,
  BusinessInteraction,
  BusinessDeliveryApp
} from '../../../types';
import { CheckboxItem } from '../../FormFields/CheckboxGroup/CheckboxGroup';

export interface BuildBusinessFormProps {
  onSubmit: (business: Business) => void;
  businessModel?: Business | null;
  displayBusinessName?: boolean;
  displayBusinessType?: boolean;
  displayHours?: boolean;
  displayPhoneNumber?: boolean;
  displayUrls?: boolean;
  displayMessage?: boolean;
  displayProductChannel?: boolean;
  displayAppDeliveryItems?: boolean;
  displayGiftCardUrl?: boolean;
}

const { Title } = Typography;
const { Panel } = Collapse;

const categories = [
  { name: '🍸 — Bar & Brewery', value: 0 },
  { name: '☕ — Coffee', value: 1 },
  { name: '🎸 — Entertainment', value: 2 },
  { name: '🛒 — Grocery', value: 3 },
  { name: '🙏 — Religion & Spiritual', value: 4 },
  { name: '🍔 — Restaurant', value: 5 },
  { name: '👕 — Retail', value: 6 },
  { name: '🧡 — Wellness', value: 7 },
  { name: '📦 — Other', value: 8 },
  { name: '🎨 — Art & Culture', value: 9 },
  { name: '💈 — Beauty', value: 10 }
];

const hours = [
  { name: '✔ — Regular', value: 1 },
  { name: '⏱ — Limited', value: 2 },
  { name: '❌ — Closed', value: 3 }
];

export const BuildBusinessForm: React.FC<BuildBusinessFormProps> = props => {
  let checkboxProductChannelItems: CheckboxItem[] = [];
  let checkboxAppDeliveryItems: CheckboxItem[] = [];

  checkboxProductChannelItems.push({
    label: 'Appointment',
    value: 'Appointment',
    checked: props.businessModel
      ? props.businessModel.interactions.includes(
          'Appointment' as BusinessInteraction
        )
      : false
  });

  checkboxProductChannelItems.push({
    label: 'Curb-side',
    value: 'Curb-side',
    checked: props.businessModel
      ? props.businessModel.interactions.includes(
          'CurbSide' as BusinessInteraction
        )
      : false
  });

  checkboxProductChannelItems.push({
    label: 'Live-stream',
    value: 'Live-stream',
    checked: props.businessModel
      ? props.businessModel.interactions.includes(
          'LiveStream' as BusinessInteraction
        )
      : false
  });

  checkboxProductChannelItems.push({
    label: 'Take-out',
    value: 'Take-out',
    checked: props.businessModel
      ? props.businessModel.interactions.includes(
          'TakeOut' as BusinessInteraction
        )
      : false
  });

  checkboxProductChannelItems.push({
    label: 'Drive-thru',
    value: 'Drive-thru',
    checked: props.businessModel
      ? props.businessModel.interactions.includes(
          'DriveThru' as BusinessInteraction
        )
      : false
  });

  checkboxProductChannelItems.push({
    label: 'Delivery',
    value: 'Delivery',
    checked: props.businessModel
      ? props.businessModel.interactions.includes(
          'Delivery' as BusinessInteraction
        )
      : false
  });

  checkboxAppDeliveryItems.push({
    label: 'Uber Eats',
    value: 'Uber Eats',
    checked: props.businessModel
      ? props.businessModel.deliveryApps
        ? props.businessModel.deliveryApps.includes(
            'UberEats' as BusinessDeliveryApp
          )
        : false
      : false
  });

  checkboxAppDeliveryItems.push({
    label: 'GrubHub',
    value: 'GrubHub',
    checked: props.businessModel
      ? props.businessModel.deliveryApps
        ? props.businessModel.deliveryApps.includes(
            'GrubHub' as BusinessDeliveryApp
          )
        : false
      : false
  });

  checkboxAppDeliveryItems.push({
    label: 'Door Dash',
    value: 'Door Dash',
    checked: props.businessModel
      ? props.businessModel.deliveryApps
        ? props.businessModel.deliveryApps.includes(
            'DoorDash' as BusinessDeliveryApp
          )
        : false
      : false
  });

  checkboxAppDeliveryItems.push({
    label: 'Postmates',
    value: 'Postmates',
    checked: props.businessModel
      ? props.businessModel.deliveryApps
        ? props.businessModel.deliveryApps.includes(
            'Postmates' as BusinessDeliveryApp
          )
        : false
      : false
  });

  checkboxAppDeliveryItems.push({
    label: 'Food Dudes',
    value: 'Food Dudes',
    checked: props.businessModel
      ? props.businessModel.deliveryApps
        ? props.businessModel.deliveryApps.includes(
            'FoodDudes' as BusinessDeliveryApp
          )
        : false
      : false
  });

  checkboxAppDeliveryItems.push({
    label: 'Bite Squad',
    value: 'Bite Squad',
    checked: props.businessModel
      ? props.businessModel.deliveryApps
        ? props.businessModel.deliveryApps.includes(
            'BiteSquad' as BusinessDeliveryApp
          )
        : false
      : false
  });

  const onFinish = (business: any) => {
    props.onSubmit(business);
  };

  return (
    <Form
      layout="vertical"
      name="create-business-form"
      onFinish={onFinish}
      scrollToFirstError
    >
      {props.displayBusinessType && (
        <SelectField
          name="category"
          title="Business category"
          items={categories}
          placeHolder="Select a category for your business"
          required={true}
        />
      )}
      {props.displayBusinessName && (
        <TextField
          name="name"
          title="Business name"
          type="name"
          placeHolder="Enter the name of your business"
          required={true}
          defaultValue={props.businessModel?.name}
        />
      )}
      {props.displayHours && (
        <SelectField
          name="hours"
          title="Business hours"
          items={hours}
          placeHolder="Select your business hours"
          required={false}
        />
      )}

      {(props.displayPhoneNumber || props.displayUrls) && (
        <Title level={4}>Ordering options</Title>
      )}

      {props.displayPhoneNumber && (
        <TextField
          name="phone"
          title="Phone"
          type="phone"
          placeHolder="701-555-1234"
          subTitle="If people can order by phone, enter the number here"
          required={false}
          defaultValue={props.businessModel?.phoneNumber}
        />
      )}

      {props.displayUrls && (
        <Collapse>
          <Panel header="Business links" id="business-links-collapse" key="1">
            <TextField
              name="website"
              title="Business website"
              type="name"
              placeHolder="www.businessname.com"
              subTitle="If your business has a web page that you would like to share, enter the link here"
              required={false}
              defaultValue={props.businessModel?.website}
            />
            <TextField
              name="facebookUrl"
              title="Facebook link"
              type="url"
              placeHolder="https://www.facebook.com/businessname"
              subTitle="If your business has a Facebook page that you would like to share, enter the link here"
              required={false}
              defaultValue={props.businessModel?.facebookUrl}
            />
            <TextField
              name="instagramUrl"
              title="Instagram link"
              type="url"
              placeHolder="https://www.instagram.com/businessname"
              subTitle="If your business has a Instagram page that you would like to share, enter the link here"
              required={false}
              defaultValue={props.businessModel?.instagramUrl}
            />
            <TextField
              name="liveStreamUrl"
              title="Live stream link"
              type="url"
              placeHolder="https://youtube.com"
              subTitle="If people can live stream your event or service, enter the link here"
              required={false}
              defaultValue={props.businessModel?.liveStreamUrl}
            />
            <TextField
              name="orderUrl"
              title="Order link"
              type="url"
              placeHolder="https://businessname.com/order"
              subTitle="If people can order online, enter the order link here"
              required={false}
              defaultValue={props.businessModel?.orderUrl}
            />
          </Panel>
        </Collapse>
      )}
      {props.displayMessage && (
        <TextField
          name="message"
          title="Message to customers"
          type="text"
          placeHolder="Provide details like hours and any special instructions you want customers to know about"
          required={true}
          defaultValue={props.businessModel?.message}
        />
      )}

      {props.displayProductChannel && (
        <CheckboxGroup
          name="checkboxGroupProductChannel"
          title="How can customers recieve your product or service?"
          checkboxItems={checkboxProductChannelItems}
        />
      )}

      {props.displayAppDeliveryItems && (
        <CheckboxGroup
          name="checkboxGroupAppDelivery"
          title="Do you use app based delivery?"
          checkboxItems={checkboxAppDeliveryItems}
        />
      )}

      {props.displayGiftCardUrl && (
          <Title level={4}>Gift card options</Title>
        ) && (
          <TextField
            name="giftCardUrl"
            title="Gift card link"
            type="url"
            placeHolder="https://businessname.com/giftcard"
            subTitle="If people can buy gift cards, enter the link here"
            required={false}
            defaultValue={props.businessModel?.giftCardUrl}
          />
        )}

      {!props.businessModel && (
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};
