/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Button, Tooltip } from 'antd';

export interface BusinessLinksProps {
  phone?: string;
  webUrl?: string;
}

export const BusinessLinks: React.FC<BusinessLinksProps> = (props) => (
  <div className="business-links">
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
