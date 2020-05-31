import React from "react";
import {
  Button,
  Row,
  Col,
  Typography,
  Anchor,
  BackTop,
  Alert,
  Divider,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { NavBar } from "../NavBar";
import { DonationInfo } from "./components/DonationInfo";
import { DonationRecipientInfo } from "./components/DonationRecipientInfo";
import { Delivery } from "./components/Delivery";
import { FolksLinker } from "../Folks/components/FolksLinker";

import "./Resources.scss";

const { Title } = Typography;
const { Link } = Anchor;

export const Resources: React.FC = () => {
  const history = useHistory();

  const goHome = () => {
    history.push("/");
  };

  return (
    <NavBar>
      <BackTop />
      <Row justify="center" id="resources">
        <Col xl={18} lg={18} md={20} sm={22} xs={24}>
          <Anchor affix={false}>
            <Link href="/resources#donation-info" title="Donation Info" />
            <Link
              href="/resources#receiving-donations"
              title="Receiving Donations"
            />
            <Link href="/resources#delivery" title="Delivery" />
          </Anchor>
          <Divider />
          <Alert
            message=""
            description="The following information is critical in keeping everyone safe!"
            type="success"
            showIcon
          />
          <Divider />
          <DonationInfo />
          <Divider />
          <DonationRecipientInfo />
          <Divider />
          <Delivery />
        </Col>
      </Row>
      <FolksLinker />
    </NavBar>
  );
};
