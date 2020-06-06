import React from "react";
import { Form, Modal, Button, Row, Col, Typography } from "antd";
import { TextField } from "../FormFields/TextField";
import { FolksLinker } from "../Folks/components/FolksLinker";
import "./GDPR.scss";
import { NavBar } from "../NavBar";

const { Title } = Typography;

export const GDPR: React.FC = () => {
  return (
    <NavBar>
      <Title>Privacy Policy</Title>
      <p>Last updated [May 29th, 2020]</p>
      <p>
        Our Privacy Policy forms part of and must be read in conjunction with,
        website Terms and Conditions. We reserve the right to change this
        Privacy Policy at any time.
      </p>
      <p>
        We respect the privacy of our users and every person who visits our
        sites www.midwesthelps.com. Here at, Midwest Helps (“we”, “us”, or
        “our”), we are committed to protecting your personal information and
        your right to privacy in accordance with General Data Protection
        Regulation (GDPR). If you have any questions or concerns about our
        policy or our practices with regards to your personal information,
        please contact us at info@midwesthelps.com.
      </p>
      <p>
        When you visit our website www.midwesthelps.com (“Site”, and use our
        services, you trust us with your personal information. We take your
        privacy very seriously. In this privacy notice, we describe our privacy
        policy. We seek to explain to you in the clearest way possible what
        information we collect, how we use it and what rights you have in
        relation to it. We hope you take some time to read through it carefully,
        as it is important. If there are any terms in this privacy policy that
        you do not agree with, please discontinue the use of our site and our
        services.
      </p>
      <p>
        This privacy policy applies to all information collected through our
        website, and/or any related services, sales, marketing or events (we
        refer to them collectively in this privacy policy as the “Site“).
      </p>
      <Title level={3}>About Us</Title>
      <p>
        Midwest Helps is focused on providing a bulletin board for businesses
        and organizations to get connected to awesome makers.
      </p>
      <p>
        <b>
          Please read this privacy policy carefully as it will help you make
          informed decisions about sharing your personal information with us.
        </b>
      </p>
      <ol>
        <li>
          <b>What information do we collect?</b>
          <p>
            We collect personal information that you voluntarily provide to us
            when expressing an interest in obtaining information about us or our
            products and services when participating in activities on the Site
            or otherwise contacting us.
          </p>
          <p>
            The personal information that we collect depends on the context of
            your interactions with us and the Site, the choices you make and the
            products and features you use. The personal information we collect
            can include the following:
          </p>
          <p>
            <b>Name and Contact Data.</b> We collect your first and last name,
            email address, postal address, phone number, and other similar
            contact data.
          </p>
          <p>
            <b>Credentials.</b> We collect passwords, password hints, and
            similar security information used for authentication and account
            access.
          </p>
          <p>
            <b>Information automatically collected</b>
          </p>
          <p>
            We automatically collect certain information when you visit, use or
            navigate the Site. This information does not reveal your specific
            identity (like your name or contact information) but may include
            device and usage information, such as your IP address, browser and
            device characteristics, operating system, language preferences,
            referring URLs, device name, country, location, information about
            how and when you use our Site and other technical information. If
            you access our site with your mobile device, we may automatically
            collect device information (such as your mobile device ID, model and
            manufacturer), operating system, version information and IP address.
            This information is primarily needed to maintain the security and
            operation of our Site, and for our internal analytics and reporting
            purposes.
          </p>
          <p>
            Like many businesses, we also collect information through cookies
            and similar technologies. You can find out more about this in our
            Cookie Policy.
          </p>
          <b>Information collected from other Sources</b>
          <p>
            We may obtain information about you from other sources, such as
            public databases, joint marketing partners, social media platforms
            (such as Facebook), as well as from other third parties.
          </p>
        </li>

        <li>
          <b>How do we use your information?</b>
          <p>
            We use your personal information for these purposes in reliance on
            our legitimate business interests (“Business Purposes”), in order to
            enter into or perform a contract with you (“Contractual”), with your
            consent (“Consent”), and/or for compliance with our legal
            obligations (“Legal Reasons”). We indicate the specific processing
            grounds we rely on next to each purpose listed below.{" "}
          </p>
          <p>
            We use the information we collect or receive:
            <ul>
              <li>
                • To send you marketing and promotional communications for
                Business Purposes and/or with your Consent. We and/or our third
                party marketing partners may use the personal information you
                send to us for our marketing purposes, if this is in accordance
                with your marketing preferences. You can opt-out of our
                marketing emails at any time (see below).{" "}
              </li>
              <li>
                • To send administrative information to you for related to your
                account, our business purposes, and/or for legal reasons. We may
                use your personal information to send you product, service and
                new feature information and/or information about changes to our
                terms, conditions, and policies.{" "}
              </li>
              <li>
                • Deliver targeted advertising to you for our Business Purposes
                and/or with your Consent. We may use your information to develop
                and display content and advertising (and work with third parties
                who do so) tailored to your interests and/or location and to
                measure its effectiveness. [For more information, see our Cookie
                Policy.{" "}
              </li>
              <li>
                • Request Feedback for our Business Purposes and/or with your
                Consent. We may use your information to request feedback and to
                contact you about your use of our Site.{" "}
              </li>
              <li>
                • To protect our Site for Business Purposes and/or Legal
                Reasons. We may use your information as part of our efforts to
                keep our Site safe and secure (for example, for fraud monitoring
                and prevention).{" "}
              </li>
              <li>
                • To enable user-to-user communications with your consent. We
                may use your information in order to enable user-to-user
                communications with each user’s consent.{" "}
              </li>
              <li>
                • To enforce our terms, conditions and policies for our business
                purposes and as legally required.{" "}
              </li>
              <li>
                • To respond to legal requests and prevent harm as legally
                required. If we receive a subpoena or other legal request, we
                may need to inspect the data we hold to determine how to
                respond.
              </li>
              <li>
                • For other Business Purposes. We may use your information for
                other Business Purposes, such as data analysis, identifying
                usage trends, determining the effectiveness of our promotional
                campaigns and to evaluate and improve our Site, products,
                services, marketing and your experience.
              </li>
            </ul>
          </p>
        </li>
      </ol>
      <FolksLinker />
    </NavBar>
  );
};
