import React from "react";
import { CompanyInteraction } from "./CompanyCard";

export interface CompanyInteractionsProps {
  interactions: CompanyInteraction[];
}

export const CompanyInteractions: React.FC<CompanyInteractionsProps> = props => (
  <div className="interaction-tags">
    {props.interactions.includes("delivery") && (
      <div className="delivery-tag">Delivery</div>
    )}
    {props.interactions.includes("takeOut") && (
      <div className="takeout-tag">Takeout</div>
    )}
    {props.interactions.includes("curbSide") && (
      <div className="curbside-tag">Curbside</div>
    )}
    {props.interactions.includes("appointment") && (
      <div className="appointment-tag">Appointment</div>
    )}
    {props.interactions.includes("liveStream") && (
      <div className="livestream-tag">Livestream</div>
    )}
  </div>
);
