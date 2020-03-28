/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Button } from 'antd';

export interface CompanyLinksProps {
  giftCardUrl?: string;
  phone?: string;
  webUrl?: string;
}

export const CompanyLinks: React.FC<CompanyLinksProps> = props => (
  <div className="company-links">
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
