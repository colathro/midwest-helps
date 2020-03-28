import React from 'react';
import { CompanyInteraction } from './CompanyCard';

export interface CompanyInteractionsProps {
  interactions: CompanyInteraction[];
}

export const CompanyInteractions: React.FC<CompanyInteractionsProps> = props => (
  <div className="interaction-tags">
    {props.interactions.includes('delivery') && (
      <div className="delivery-tag">Delivery</div>
    )}
    {props.interactions.includes('takeout') && (
      <div className="takeout-tag">Takeout</div>
    )}
    {props.interactions.includes('curbside') && (
      <div className="curbside-tag">Curbside</div>
    )}
    {props.interactions.includes('appointment') && (
      <div className="appointment-tag">Appointment</div>
    )}
    {props.interactions.includes('livestream') && (
      <div className="livestream-tag">Livestream</div>
    )}
  </div>
);
