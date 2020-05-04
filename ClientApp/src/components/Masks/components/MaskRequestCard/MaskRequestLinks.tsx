/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Button, Tooltip } from 'antd';

export interface MaskRequestLinksProps {
  giftCardUrl?: string;
  phone?: string;
  webUrl?: string;
}

export const MaskRequestLinks: React.FC<MaskRequestLinksProps> = (props) => (
  <div className="business-links">
    {props.giftCardUrl && (
      <Tooltip placement="bottom" title="Gift card">
        <Button shape="circle" href={props.giftCardUrl}>
          🎁
        </Button>
      </Tooltip>
    )}
    {props.phone && (
      <Tooltip placement="bottom" title="Call">
        <Button shape="circle" href={`tel:${props.phone}`}>
          📞
        </Button>
      </Tooltip>
    )}
    {props.webUrl && (
      <Tooltip placement="bottom" title="Website">
        <Button shape="circle" href={props.webUrl}>
          🌐
        </Button>
      </Tooltip>
    )}
  </div>
);
