import React from "react";
import { Button, Row, Col, Typography, Anchor, BackTop, Alert } from "antd";

const { Link } = Anchor;
const { Title } = Typography;

export const DonationRecipientInfo: React.FC = () => {
  return (
    <Typography className="donation-info">
      <Title level={2} id="receiving-donations">
        Receiving Donations
      </Title>
      <Alert
        message=""
        description="PPE donations and makers are not vetted by our service."
        type="error"
      />
      <br />
      <p>
        As a bulletin service, Midwest Helps is not in direct commmunication
        with organizations who are requesting donations or makers who are
        building and donating PPE. With that information it is important to
        thoughly document your restrictions and requirements for your requested
        PPE.
      </p>
      <p>
        As a recipient, it will be your responsibility to validate the donated
        PPE meet your organizations criteria. The information you post about
        accepting donations is publicly available and makers may reach out to
        validate the information. At any time your restrictions changes, please
        reachout to our administrators who can update or remove your post.
      </p>
      <Alert
        message=""
        description={
          <p>
            The virus is thought to spread mainly from person-to-person.{" "}
            <sup>
              <a href="/resources#prevention">[1]</a>
            </sup>
            <ul>
              <li>
                Between people who are in close contact with one another (within
                about 6 feet).
              </li>
              <li>
                Through respiratory droplets produced when an infected person
                coughs, sneezes or talks.
              </li>
              <li>
                These droplets can land in the mouths or noses of people who are
                nearby or possibly be inhaled into the lungs.
              </li>
              <li>
                Some recent studies have suggested that COVID-19 may be spread
                by people who are not showing symptoms.
              </li>
            </ul>
          </p>
        }
        type="error"
      />
      <br></br>
      <p>
        With the above information, we urge all recipients of donations to
        follow the guidance of the CDC:
        <ul>
          <li>Wash your hands often.</li>
          <li>Avoid close contact.</li>
          <li>
            Cover your mouth and nose with a cloth face cover when around
            others.
          </li>
          <li>Cover coughs and sneezes.</li>
          <li>Clean and disinfect.</li>
          <li>Monitor Your Health.</li>
        </ul>
        You can find further specifics for the above bullet points here:{" "}
        <a
          target={`_blank`}
          href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html"
        >
          Prevent COVID-19
        </a>
      </p>
      <p></p>
      <Title className="citation-title" level={4}>
        Citations
      </Title>
      <ul className="citation">
        <li>
          <a
            id="prevention"
            target={`_blank`}
            href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/social-distancing.html"
          >
            <sup>[1]</sup>
            {"  "}
            https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/social-distancing.html
          </a>
        </li>
      </ul>
    </Typography>
  );
};
