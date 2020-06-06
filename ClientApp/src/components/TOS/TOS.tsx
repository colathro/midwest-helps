import React from "react";
import { Form, Modal, Button, Row, Col, Typography } from "antd";
import { TextField } from "../FormFields/TextField";
import { FolksLinker } from "../Folks/components/FolksLinker";
import "./TOS.scss";
import { NavBar } from "../NavBar";

const { Title } = Typography;

export const TOS: React.FC = () => {
  return (
    <NavBar>
      TOS
      <FolksLinker />
    </NavBar>
  );
};
