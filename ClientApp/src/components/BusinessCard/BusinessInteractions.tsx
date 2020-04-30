import React from 'react';
import { BusinessInteraction } from '../../types';

export interface BusinessInteractionsProps {
  interactions: BusinessInteraction[];
}

export const BusinessInteractions: React.FC<BusinessInteractionsProps> = (
  props
) => (
  <div className="interaction-tags">
    {props.interactions.includes('Delivery') && (
      <div className="delivery-tag">Delivery</div>
    )}
    {props.interactions.includes('TakeOut') && (
      <div className="takeout-tag">Takeout</div>
    )}
    {props.interactions.includes('CurbSide') && (
      <div className="curbside-tag">Curbside</div>
    )}
    {props.interactions.includes('Appointment') && (
      <div className="appointment-tag">Appointment</div>
    )}
    {props.interactions.includes('LiveStream') && (
      <div className="livestream-tag">Livestream</div>
    )}
  </div>
);
