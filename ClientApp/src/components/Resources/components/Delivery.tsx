import React from "react";
import { Button, Row, Col, Typography, Anchor, BackTop, Alert } from "antd";

const { Link } = Anchor;
const { Title } = Typography;

export const Delivery: React.FC = () => {
  return (
    <Typography className="donation-info">
      <Title level={2} id="delivery">
        Delivery
      </Title>
      <br />
      <p>
        Delivery instructions will be defined within an organizations bulletin
        post. We offer two broad categories, Drop-off and Mail-in. We do not
        restrict posts to just these methods, as special circumstances may arise
        where other methods are needed. The delivery notes field is where
        specific delivery notes should be placed.
      </p>
      <p>
        As per the CDC guidance all social interactions should be kept at a
        minimum and social distancing is encouraged for all PPE exchanges.
      </p>
      <Alert
        message=""
        description={
          <p>
            <Title level={4}>
              What is Social Distancing?
              <sup>
                <a href="/resources#social-distancing">[1]</a>
              </sup>
            </Title>
            <p>
              Social distancing, also called “physical distancing,” means
              keeping space between yourself and other people outside of your
              home.
            </p>
            <p>
              To practice social or physical distancing:
              <ul>
                <li>
                  Stay at least 6 feet (about 2 arms’ length) from other people.
                </li>
                <li>Do not gather in groups.</li>
                <li>Stay out of crowded places and avoid mass gatherings.</li>
              </ul>
            </p>
          </p>
        }
        type="error"
      />
      <br />
      <Alert
        message=""
        description={
          <p>
            <Title level={4}>
              Why practice social distancing?
              <sup>
                <a href="/resources#why-social-distancing">[2]</a>
              </sup>
            </Title>
            <p>
              COVID-19 spreads mainly among people who are in close contact
              (within about 6 feet) for a prolonged period. Spread happens when
              an infected person coughs, sneezes, or talks, and droplets from
              their mouth or nose are launched into the air and land in the
              mouths or noses of people nearby. The droplets can also be inhaled
              into the lungs. Recent studies indicate that people who are
              infected but do not have symptoms likely also play a role in the
              spread of COVID-19.
            </p>
            <p>
              It may be possible that a person can get COVID-19 by touching a
              surface or object that has the virus on it and then touching their
              own mouth, nose, or eyes. However, this is not thought to be the
              main way the virus spreads. COVID-19 can live for hours or days on
              a surface, depending on factors such as sunlight, humidity, and
              the type of surface.
            </p>
            Social distancing helps limit opportunities to come in contact with
            contaminated surfaces and infected people outside the home. Although
            the risk of severe illness may be different for everyone, anyone can
            get and spread COVID-19. Everyone has a role to play in slowing the
            spread and protecting themselves, their family, and their community.
          </p>
        }
        type="error"
      />

      <Title className="citation-title" level={4}>
        Citations
      </Title>
      <ul className="citation">
        <li>
          <a
            id="social-distancing"
            target={`_blank`}
            href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/social-distancing.html"
          >
            <sup>[1]</sup>
            {"  "}
            https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/social-distancing.html
          </a>
        </li>
        <li>
          <a
            id="why-social-distancing"
            target={`_blank`}
            href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/social-distancing.html"
          >
            <sup>[2]</sup>
            {"  "}
            https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/social-distancing.html
          </a>
        </li>
      </ul>
    </Typography>
  );
};
