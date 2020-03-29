import React from "react";
import { Form, Button } from "antd";
import { TextField } from "../TextField";
import { CheckboxGroup } from "../CheckboxGroup";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

export const CreateBusinessForm: React.FC = props => {
  const onFinish = (business: any) => {
    console.log("Success:", business);

    const postRequest = {
      BusinessName: business.name,
      BusinessType: 1,
      PhoneNumber: business.phone,
      LiveStreamUrl: business.liveStreamUrl,
      OrderUrl: business.orderUrl,
      MessageToCustomer: business.message,
      CurbSide: business.checkboxGroupProductChannel.includes("Curb-side"),
      TakeOut: business.checkboxGroupProductChannel.includes("Take-out"),
      DriveThru: business.checkboxGroupProductChannel.includes("Drive-thru"),
      Deliverry: business.checkboxGroupProductChannel.includes("Delivery"),
      LiveStream: business.checkboxGroupProductChannel.includes("Live-stream"),
      AppointmentOnly: business.checkboxGroupProductChannel.includes(
        "By appointment only"
      ),
      UberEats: business.checkboxGroupAppDelivery.includes("Uber Eats"),
      Grubhub: business.checkboxGroupAppDelivery.includes("GrubHub"),
      DoorDash: business.checkboxGroupAppDelivery.includes("Door Dash"),
      Postmates: business.checkboxGroupAppDelivery.includes("Postmates"),
      FoodDudes: business.checkboxGroupAppDelivery.includes("Food Dudes"),
      BiteSquad: business.checkboxGroupAppDelivery.includes("Bite Squad")
    };

    createBusiness(postRequest);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  function createBusiness(data: any) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log("RESPONSE", data);
        window.location.href = window.location.origin;
      });
  }

  const checkboxProductChannelItems = [
    { name: "Curb-side" },
    { name: "Take-out" },
    { name: "Drive-thru" },
    { name: "Delivery" },
    { name: "Live-stream" },
    { name: "By appointment only" }
  ];

  const checkboxAppDeliveryItems = [
    { name: "Uber Eats" },
    { name: "GrubHub" },
    { name: "Door Dash" },
    { name: "Postmates" },
    { name: "Food Dudes" },
    { name: "Bite Squad" }
  ];

  return (
    <Form
      {...formItemLayout}
      name="create-business-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
    >
      <TextField
        name="name"
        title="Business name"
        type="name"
        titleInline={false}
        required={true}
      />
      <TextField
        name="phone"
        title="Phone"
        type="phone"
        titleInline={false}
        subTitle="(Optional)"
        subTileInline={true}
        required={false}
      />
      <TextField
        name="liveStreamUrl"
        title="Live stream link"
        type="url"
        titleInline={false}
        subTitle="(Optional)"
        subTileInline={true}
        required={false}
      />
      <TextField
        name="orderUrl"
        title="Order link"
        type="url"
        titleInline={false}
        subTitle="(Optional)"
        subTileInline={true}
        required={false}
      />
      <TextField
        name="message"
        title="Message to customers"
        type="text"
        titleInline={false}
        subTitle="Give details like hours and how customers can get your product or service."
        subTileInline={false}
        required={true}
      />
      <CheckboxGroup
        name="checkboxGroupProductChannel"
        title="How can customers recieve your product or service?"
        checkboxItems={checkboxProductChannelItems}
      />
      <CheckboxGroup
        name="checkboxGroupAppDelivery"
        title="Do you used app based delivery?"
        subTitle="(Optional)"
        subTileInline={true}
        checkboxItems={checkboxAppDeliveryItems}
      />
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
