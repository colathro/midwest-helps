import React from 'react';
import { Form, Button, Typography, Collapse } from 'antd';
import { TextField } from '../../FormFields/TextField';
import { CheckboxGroup } from '../../FormFields/CheckboxGroup';
import { SelectField } from '../../FormFields/SelectField';
import './BuildBusinessForm.scss';
import {
  Business,
  BusinessInteraction,
  BusinessDeliveryApp
} from '../../../types';
import { CheckboxItem } from '../../FormFields/CheckboxGroup/CheckboxGroup';
import { LabeledValue } from 'antd/lib/select';
import { BUSINESS_CATEGORY_STRINGS, BUSINESS_HOURS } from '../../../types';

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

export const BuildBusinessForm: React.FC<BuildBusinessFormProps> = props => {
  const checkboxProductChannelItems: CheckboxItem[] = [
    {
      label: 'Appointment',
      value: 'Appointment',
      checked: props.businessModel
        ? props.businessModel.interactions.includes(
            'Appointment' as BusinessInteraction
          )
        : false
    },
    {
      label: 'Curb-side',
      value: 'CurbSide',
      checked: props.businessModel
        ? props.businessModel.interactions.includes(
            'CurbSide' as BusinessInteraction
          )
        : false
    },
    {
      label: 'Live-stream',
      value: 'LiveStream',
      checked: props.businessModel
        ? props.businessModel.interactions.includes(
            'LiveStream' as BusinessInteraction
          )
        : false
    },
    {
      label: 'Take-out',
      value: 'TakeOut',
      checked: props.businessModel
        ? props.businessModel.interactions.includes(
            'TakeOut' as BusinessInteraction
          )
        : false
    },
    {
      label: 'Drive-thru',
      value: 'DriveThru',
      checked: props.businessModel
        ? props.businessModel.interactions.includes(
            'DriveThru' as BusinessInteraction
          )
        : false
    },
    {
      label: 'Delivery',
      value: 'Delivery',
      checked: props.businessModel
        ? props.businessModel.interactions.includes(
            'Delivery' as BusinessInteraction
          )
        : false
    }
  ];
  const checkboxAppDeliveryItems: CheckboxItem[] = [
    {
      label: 'Uber Eats',
      value: 'UberEats',
      checked: props.businessModel
        ? props.businessModel.deliveryApps
          ? props.businessModel.deliveryApps.includes(
              'UberEats' as BusinessDeliveryApp
            )
          : false
        : false
    },
    {
      label: 'GrubHub',
      value: 'GrubHub',
      checked: props.businessModel
        ? props.businessModel.deliveryApps
          ? props.businessModel.deliveryApps.includes(
              'GrubHub' as BusinessDeliveryApp
            )
          : false
        : false
    },
    {
      label: 'Door Dash',
      value: 'DoorDash',
      checked: props.businessModel
        ? props.businessModel.deliveryApps
          ? props.businessModel.deliveryApps.includes(
              'DoorDash' as BusinessDeliveryApp
            )
          : false
        : false
    },
    {
      label: 'Postmates',
      value: 'Postmates',
      checked: props.businessModel
        ? props.businessModel.deliveryApps
          ? props.businessModel.deliveryApps.includes(
              'Postmates' as BusinessDeliveryApp
            )
          : false
        : false
    },

    {
      label: 'Food Dudes',
      value: 'FoodDudes',
      checked: props.businessModel
        ? props.businessModel.deliveryApps
          ? props.businessModel.deliveryApps.includes(
              'FoodDudes' as BusinessDeliveryApp
            )
          : false
        : false
    },
    {
      label: 'Bite Squad',
      value: 'BiteSquad',
      checked: props.businessModel
        ? props.businessModel.deliveryApps
          ? props.businessModel.deliveryApps.includes(
              'BiteSquad' as BusinessDeliveryApp
            )
          : false
        : false
    }
  ];
  const categories: LabeledValue[] = [
    {
      label: BUSINESS_CATEGORY_STRINGS['Brewery'],
      value: 'Brewery'
    },
    {
      label: BUSINESS_CATEGORY_STRINGS['Coffee'],
      value: 'Coffee'
    },
    {
      label: BUSINESS_CATEGORY_STRINGS['Entertainment'],
      value: 'Entertainment'
    },
    {
      label: BUSINESS_CATEGORY_STRINGS['Grocery'],
      value: 'Grocery'
    },
    {
      label: BUSINESS_CATEGORY_STRINGS['Other'],
      value: 'Other'
    },
    {
      label: BUSINESS_CATEGORY_STRINGS['Religion'],
      value: 'Religion'
    },
    {
      label: BUSINESS_CATEGORY_STRINGS['Restaurant'],
      value: 'Restaurant'
    },
    {
      label: BUSINESS_CATEGORY_STRINGS['Retail'],
      value: 'Retail'
    },
    {
      label: BUSINESS_CATEGORY_STRINGS['Wellness'],
      value: 'Wellness'
    },
    {
      label: BUSINESS_CATEGORY_STRINGS['Art'],
      value: 'Art'
    },
    {
      label: BUSINESS_CATEGORY_STRINGS['Beauty'],
      value: 'Beauty'
    }
  ];

  const defaultCategory: string = props.businessModel
    ? props.businessModel.category
    : '';

  const hours: LabeledValue[] = [
    {
      label: BUSINESS_HOURS['Closed'],
      value: 'Closed'
    },
    {
      label: BUSINESS_HOURS['Limited'],
      value: 'Limited'
    },
    {
      label: BUSINESS_HOURS['Regular'],
      value: 'Regular'
    }
  ];

  const defaultBusinessHours: string = props.businessModel
    ? (props.businessModel.hours as string)
    : '';

  const onFinish = (business: any) => {
    props.onSubmit(business);
  };

  const [form] = Form.useForm();

  let initialValues = {};
  if (props.businessModel) {
    initialValues = {
      category: props.businessModel.category,
      name: props.businessModel.name,
      hours: props.businessModel.hours,
      phone: props.businessModel.phoneNumber,
      website: props.businessModel.website,
      facebookUrl: props.businessModel.facebookUrl,
      instagramUrl: props.businessModel.instagramUrl,
      liveStreamUrl: props.businessModel.liveStreamUrl,
      orderUrl: props.businessModel.orderUrl,
      message: props.businessModel.message,
      interactions: props.businessModel.interactions,
      deliveryApps: props.businessModel.deliveryApps,
      giftCardUrl: props.businessModel.giftCardUrl
    };
  }

  return (
    <Form
      form={form}
      layout="vertical"
      name="create-business-form"
      onFinish={onFinish}
      initialValues={initialValues}
      scrollToFirstError
    >
      {props.displayBusinessType && (
        <SelectField
          name="category"
          title="Business category"
          items={categories}
          placeHolder="Select a category for your business"
          required={true}
          defaultValue={defaultCategory}
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
          defaultValue={defaultBusinessHours}
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
          name="interactions"
          title="How can customers recieve your product or service?"
          checkboxItems={checkboxProductChannelItems}
        />
      )}

      {props.displayAppDeliveryItems && (
        <CheckboxGroup
          name="deliveryApps"
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

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {!props.businessModel ? 'Submit' : 'Update'}
        </Button>
      </Form.Item>
    </Form>
  );
};
