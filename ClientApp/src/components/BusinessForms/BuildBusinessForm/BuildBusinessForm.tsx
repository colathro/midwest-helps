import React from 'react';
import { Form, Button, Typography, Collapse } from 'antd';
import { TextField } from '../../FormFields/TextField';
import { CheckboxGroup } from '../../FormFields/CheckboxGroup';
import { SelectField } from '../../FormFields/SelectField';
import './BuildBusinessForm.scss';
import {
  Business,
  BusinessDeliveryApp,
  BUSINESS_DELIVERY_APP,
  BUSINESS_CATEGORY_STRINGS,
  BUSINESS_HOURS,
  BUSINESS_INTERACTIONS
} from '../../../types';

export interface BuildBusinessFormProps {
  onSubmit: (business: BusinessFormSubmitValues) => void;
  businessModel?: Business;
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

export type BusinessFormSubmitValues = { [name in keyof Business]: string };

const { Title } = Typography;
const { Panel } = Collapse;

export const BuildBusinessForm: React.FC<BuildBusinessFormProps> = (props) => {
  const defaultCategory: string = props.businessModel
    ? props.businessModel.category
    : '';

  const defaultBusinessHours: string = props.businessModel
    ? (props.businessModel.hours as string)
    : '';

  const [form] = Form.useForm();

  let initialValues = {};
  if (props.businessModel) {
    initialValues = {
      category: props.businessModel.category,
      name: props.businessModel.name,
      hours: props.businessModel.hours,
      phoneNumber: props.businessModel.phoneNumber,
      website: props.businessModel.website,
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
      onFinish={(values) => props.onSubmit(values as BusinessFormSubmitValues)}
      initialValues={initialValues}
      scrollToFirstError
    >
      {props.displayBusinessType && (
        <SelectField
          name="category"
          title="Business category"
          items={Object.entries(BUSINESS_CATEGORY_STRINGS).map(
            ([categoryValue, categoryProps]) => ({
              label: categoryProps.name,
              value: categoryValue
            })
          )}
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
          items={Object.entries(BUSINESS_HOURS).map(([hoursKey, label]) => ({
            label,
            value: hoursKey
          }))}
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
          name="phoneNumber"
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
          checkboxItems={Object.entries(BUSINESS_INTERACTIONS).map(
            ([key, value]) => ({
              label: key,
              value,
              checked: props.businessModel
                ? props.businessModel.deliveryApps
                  ? props.businessModel.deliveryApps.includes(
                      value as BusinessDeliveryApp
                    )
                  : false
                : false
            })
          )}
        />
      )}

      {props.displayAppDeliveryItems && (
        <CheckboxGroup
          name="deliveryApps"
          title="Do you use app based delivery?"
          checkboxItems={Object.entries(BUSINESS_DELIVERY_APP).map(
            ([key, value]) => ({
              label: key,
              value,
              checked: props.businessModel
                ? props.businessModel.deliveryApps
                  ? props.businessModel.deliveryApps.includes(
                      value as BusinessDeliveryApp
                    )
                  : false
                : false
            })
          )}
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
        <Button className="business-submit" type="primary" htmlType="submit">
          {!props.businessModel ? 'Submit' : 'Update'}
        </Button>
      </Form.Item>
    </Form>
  );
};
