import React from "react";
import { Card } from "antd";

import "./CompanyCard.scss";
import { CompanyCategoryTag } from "./CompanyCategoryTag";
import { CompanyLinks } from "./CompanyLinks";
import { CompanyInteractions } from "./CompanyInteractions";

export interface CompanyCardProps {
  id?: string;
  partitionKey?: string;
  businessName: string;
  businessType: number;
  hours: number;
  phoneNumber?: string;
  website?: string;
  livestreamURL?: string;
  orderURL?: string;
  messageToCustomer?: string;
  curbSide?: boolean;
  takeOut?: boolean;
  driveThru?: boolean;
  delivery?: boolean;
  liveStream?: boolean;
  appointmentOnly?: boolean;
  uberEats?: boolean;
  grubhub?: boolean;
  doorDash?: boolean;
  postmates?: boolean;
  foodDudes?: boolean;
  biteSquad?: boolean;
  giftCardUrl?: string;
  interactions: CompanyInteraction[];
}

export type CompanyCategory =
  | "art"
  | "brewery"
  | "beauty"
  | "coffee"
  | "entertainment"
  | "grocery"
  | "other"
  | "religion"
  | "restaurant"
  | "retail"
  | "wellness";

export type CompanyInteraction =
  | "appointment"
  | "curbSide"
  | "delivery"
  | "liveStream"
  | "takeOut"
  | "driveThru";

const checkboxProductChannelItems = [
  { name: "curbside" },
  { name: "takeout" },
  { name: "drivethru" },
  { name: "delivery" },
  { name: "livestream" },
  { name: "appointment" }
];

const checkboxAppDeliveryItems = [
  { name: "Uber Eats" },
  { name: "GrubHub" },
  { name: "Door Dash" },
  { name: "Postmates" },
  { name: "Food Dudes" },
  { name: "Bite Squad" }
];

const categories = [
  { name: "art", value: 0 },
  { name: "brewery", value: 1 },
  { name: "beauty", value: 2 },
  { name: "coffee", value: 3 },
  { name: "entertainment", value: 4 },
  { name: "grocery", value: 5 },
  { name: "religion", value: 6 },
  { name: "restaurant", value: 7 },
  { name: "retail", value: 8 },
  { name: "wellness", value: 9 },
  { name: "other", value: 10 }
];

const hours = [
  { name: "✔ — Regular", value: 1 },
  { name: "⏱ — Limited", value: 2 },
  { name: "❌ — Closed", value: 3 }
];

export const CompanyCard: React.FC<CompanyCardProps> = props => {
  const companyInteraction: CompanyInteraction[] = [];

  if (props.appointmentOnly) {
    companyInteraction.push("appointment");
  }
  if (props.curbSide) {
    companyInteraction.push("curbSide");
  }
  if (props.delivery) {
    companyInteraction.push("delivery");
  }
  if (props.liveStream) {
    companyInteraction.push("liveStream");
  }
  if (props.takeOut) {
    companyInteraction.push("takeOut");
  }
  if (props.driveThru) {
    companyInteraction.push("driveThru");
  }

  const category = categories.find(
    category => category.value == props.businessType
  );

  return (
    <Card title={props.businessName} className="company-card" bordered={false}>
      <CompanyCategoryTag category={category?.name as CompanyCategory} />
      <CompanyLinks
        giftCardUrl={props.giftCardUrl}
        phone={props.phoneNumber}
        webUrl={props.website}
      />
      <p>{props.messageToCustomer}</p>
      <CompanyInteractions interactions={companyInteraction} />
    </Card>
  );
};
