import React from "react";
import { Button, Row, Col, Typography, Anchor, BackTop, Alert } from "antd";

const { Link } = Anchor;
const { Title } = Typography;

export const DonationInfo: React.FC = () => {
  return (
    <Typography className="donation-info">
      <Title level={2} id="donation-info">
        Donation Info
      </Title>
      <Alert
        message=""
        description="The following information is critical in keeping everyone safe!"
        type="success"
        showIcon
      />
      <br />
      <p>
        Regardless of PPE medium, it's VERY important to carefully follow an
        organization's instructions inorder to minimize risks. Many in need
        organizations work with at-risk individuals and require specific
        handling, delivery, and manufacturing restrictions. Please respect these
        restrictions, as it will certainly lead to unused donations.
      </p>
      <p>
        Here are some of the common restrictions organizations may have strict
        requirements on:
        <ul>
          <li>Pet hair</li>
          <li>Mold/Mildew</li>
          <li>Perfumes</li>
          <li>Materials used</li>
          <li>Color/Design</li>
        </ul>
      </p>
      <p>
        Turn your sewing skills into crucial PPE in the form of cloth face
        coverings:
        <a
          target={`_blank`}
          href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/how-to-make-cloth-face-covering.html"
        >
          {" "}
          CDC Cloth Facemask Instructions
        </a>
      </p>
      <p>
        "It may be possible that a person can get COVID-19 by touching a surface
        or object that has the virus on it and then touching their own mouth,
        nose, or possibly their eyes. This is not thought to be the main way the
        virus spreads, but we are still learning more about how this virus
        spreads."{" "}
        <sup>
          <a href="/resources#how-spreads">[1]</a>
        </sup>
      </p>
      <p>
        With the above information, we request all makers to thoroughly sanitze
        donated PPE and be on the lookout for any of the COVID-19 symptoms.
      </p>
      <p>
        You can find sanitization information here:
        <a
          target={`_blank`}
          href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/how-to-wash-cloth-face-coverings.html"
        >
          {" "}
          Sanitize a Cloth Facemask
        </a>
      </p>
      <Title className="citation-title" level={4}>
        Citations
      </Title>
      <ul className="citation">
        <li>
          <a
            target={`_blank`}
            href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/how-covid-spreads.html"
          >
            <sup>[1]</sup>
            {"  "}
            https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/how-covid-spreads.html
          </a>
        </li>
      </ul>
    </Typography>
  );
};
