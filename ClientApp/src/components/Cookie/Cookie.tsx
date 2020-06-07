import React from "react";
import { Form, Modal, Button, Row, Col, Typography } from "antd";
import { TextField } from "../FormFields/TextField";
import { FolksLinker } from "../Folks/components/FolksLinker";
import "./Cookie.scss";
import { NavBar } from "../NavBar";

const { Title } = Typography;

export const Cookie: React.FC = () => {
  return (
    <NavBar>
      <Title>Cookie Policy</Title>
      <p>
        <b>
          BY CONTINUING TO USE OUR SITE AND SERVICES, YOU ARE AGREEING TO THE
          USE OF COOKIES AND SIMILAR TECHNOLOGIES FOR THE PURPOSES WE DESCRIBE
          IN THIS COOKIES POLICY. IF YOU DO NOT ACCEPT THE USE OF COOKIES AND
          SIMILAR TECHNOLOGIES, DO NOT USE THIS SITE.
        </b>
      </p>
      <b>Cookies:</b>
      <p>
        A cookie is a small text file that a website saves on your computer or
        mobile device when you visit the site. In general, cookies have two main
        purposes: to improve your browsing experience by remembering your
        actions and preferences, and to help us analyze our website traffic.
      </p>
      <b>What to do with Cookies?</b>
      <p>
        We use cookies to help us analyze traffic to the Website, to help us
        improve website performance and usability, and to make the Website more
        secure. Third-party cookies help us use Google Analytics to count, track
        and analyze visits to the Website. This helps us understand how people
        are using our websites and where we need to make improvements. These
        third-party cookies do not specifically identify you.
      </p>
      <b>Types & Category of Cookies used:</b>
      <p>
        List category of cookies used in https://midwesthelps.com. For example:
        <ul>
          <li>
            <b>Security</b>
            <p>
              We use cookies to enable and support our security features, and to
              help us detect malicious activity violations of our Terms and
              Conditions.
            </p>
          </li>
          <li>
            <b>Performance, Analytics, Research & Advertising</b>
          </li>
        </ul>
      </p>
      <p>
        Cookies help us learn how well our site and web products perform in
        different locations. We also use these to understand, improve, and
        research products, features, and services, including when you access
        this site https://midwesthelps.com/ from other websites, applications,
        or devices such as your work computer or your mobile device. We also use
        third party cookies to improve and personalize our marketing
        messages/communications with you.
      </p>
      <b>Control cookies</b>
      <p>
        You are always free to delete cookies that are already on your computer
        through your browser settings, and you can set most browsers to prevent
        them from being added to your computer. However, this may prevent you
        from using certain features on the Website.
      </p>
      <FolksLinker />
    </NavBar>
  );
};
