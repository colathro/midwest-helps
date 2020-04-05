/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Button, Tooltip } from 'antd';

export interface BusinessLinksProps {
  giftCardUrl?: string;
  phone?: string;
  webUrl?: string;
}

export const BusinessLinks: React.FC<BusinessLinksProps> = props => (
  <div className="business-links">
    {props.giftCardUrl && (
      <Tooltip placement="bottom" title="Gift card">
        <Button type="dashed" href={props.giftCardUrl}>
          🎁
        </Button>
      </Tooltip>
    )}
    {props.phone && (
      <Tooltip placement="bottom" title="Call">
        <Button type="dashed" href={`tel:${props.phone}`}>
          📞
        </Button>
      </Tooltip>
    )}
    {props.webUrl && (
      <Tooltip placement="bottom" title="Website">
        <Button type="dashed" href={props.webUrl}>
          🌐
        </Button>
      </Tooltip>
    )}
  </div>
);
