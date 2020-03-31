/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Button } from 'antd';

export interface BusinessLinksProps {
  giftCardUrl?: string;
  phone?: string;
  webUrl?: string;
}

export const BusinessLinks: React.FC<BusinessLinksProps> = props => (
  <div className="business-links">
    {props.giftCardUrl && (
      <Button type="dashed" href={props.giftCardUrl}>
        🎁
      </Button>
    )}
    {props.phone && (
      <Button type="dashed" href={`tel:${props.phone}`}>
        📞
      </Button>
    )}
    {props.webUrl && (
      <Button type="dashed" href={props.webUrl}>
        🌐
      </Button>
    )}
  </div>
);
