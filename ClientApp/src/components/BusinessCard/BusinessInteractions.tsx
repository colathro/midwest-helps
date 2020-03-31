import React from 'react';
import { BusinessInteraction } from '../../types';

export interface BusinessInteractionsProps {
  interactions: BusinessInteraction[];
}

export const BusinessInteractions: React.FC<BusinessInteractionsProps> = props => (
  <div className="interaction-tags">
    {props.interactions.includes('delivery') && (
      <div className="delivery-tag">Delivery</div>
    )}
    {props.interactions.includes('takeOut') && (
      <div className="takeout-tag">Takeout</div>
    )}
    {props.interactions.includes('curbSide') && (
      <div className="curbside-tag">Curbside</div>
    )}
    {props.interactions.includes('appointment') && (
      <div className="appointment-tag">Appointment</div>
    )}
    {props.interactions.includes('liveStream') && (
      <div className="livestream-tag">Livestream</div>
    )}
  </div>
);
