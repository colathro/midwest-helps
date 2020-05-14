import React, { useState } from "react";
import { Card, Button, Tag, Modal, Row, Col } from "antd";
import { MaskRequestLinks } from "./MaskRequestLinks";
import { IMaskRequest, MASK_TYPE } from "../../../../types";

import CopyText from "./copytext";

import "./MaskRequestCard.scss";
import { MaskDonationForm } from "../../../MaskDonationForm";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const MaskRequestCard: React.FC<IMaskRequest> = (props) => {
  const [maskRequest, setMaskRequest] = useState(props);
  const [donateModalVisible, setDonateModalVisible] = useState(false);

  const createdOn = new Date(maskRequest.createdOn!);
  const address = maskRequest.delivery.addresses[0];

  return (
    <div>
      <Card
        title={
          <div>
            <span>{maskRequest.recipient.company}</span>
            <span className="created-on">
              {months[createdOn.getUTCMonth()] + " "}
              {createdOn.getUTCDate()}
            </span>
            <div className="city-state">
              {address.city}
              {", "}
              {address.state}
              {" • "}
              {address.type}
            </div>
          </div>
        }
        className="business-card"
        bordered={false}
      >
        <p>
          {maskRequest.delivery.notes}{" "}
          <MaskRequestLinks maskRequest={maskRequest} />
        </p>
        <div className="action-buttons">
          <Row>
            <Col span={16}>
              <div className="in-search">
                In search of:{" "}
                {maskRequest.maskDetails.masks.map((needed) => {
                  if (needed.type! in MASK_TYPE) {
                    return <Tag>{MASK_TYPE[needed.type]}</Tag>;
                  } else {
                    return <></>;
                  }
                })}
              </div>
            </Col>
            <Col span={8}>
              <Button
                className="donate-button"
                type="primary"
                onClick={() => setDonateModalVisible(true)}
              >
                Donate masks
              </Button>
            </Col>
          </Row>
        </div>
      </Card>
      {donateModalVisible && (
        <Modal
          title="Midwest Helps"
          visible={donateModalVisible}
          footer={null}
          onOk={() => setDonateModalVisible(false)}
          onCancel={() => setDonateModalVisible(false)}
        >
          <MaskDonationForm
            request={maskRequest}
            onSuccess={() => setDonateModalVisible(false)}
          />
        </Modal>
      )}
    </div>
  );
};
