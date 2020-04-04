import React, { useState } from 'react';
import { Card, Button, Modal } from 'antd';

import { BusinessCategoryTag } from './BusinessCategoryTag';
import { BusinessInteractions } from './BusinessInteractions';
import { BusinessLinks } from './BusinessLinks';
import { Business } from '../../types';

import './BusinessCard.scss';
import { UpdateBusiness } from '../BusinessForms/UpdateBusiness';

const { confirm } = Modal;

export const BusinessCard: React.FC<Business> = (props) => {
  const [business, setBusiness] = useState(props);
  const [displayUpdate, setDisplayUpdate] = useState(false);

  const displayUpdateForm = () => {
    setDisplayUpdate(true);
  };

  const displayDeleteModal = () => {
    confirm({
      title: 'Are you sure you want to remove this business?',
      icon: '❗',
      content:
        'A removal request will be sent to our team who will avaliate removing this business from this platform',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteRequest('/api/listing/' + business.id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  async function deleteRequest(url: string) {
    const requestOptions = {
      method: 'DELETE',
    };

    await fetch(url, requestOptions);
  }

  const callbackFunction = (businessBack: Business) => {
    setBusiness(businessBack);
    setDisplayUpdate(false);
  };

  return (
    <div>
      {displayUpdate && (
        <UpdateBusiness
          business={business}
          bussinessCardCallback={callbackFunction}
        />
      )}

      <Card
        title={business.name}
        className="business-card"
        bordered={false}
        extra={
          <div>
            <Button type="dashed" onClick={() => displayUpdateForm()}>
              🖊
            </Button>
            <Button type="dashed" onClick={() => displayDeleteModal()}>
              🗑
            </Button>
          </div>
        }
      >
        <BusinessCategoryTag category={business.category} />
        <p>{business.message}</p>
        <div className="business-tags">
          <BusinessInteractions interactions={business.interactions} />
          <BusinessLinks
            giftCardUrl={business.giftCardUrl}
            phone={business.phoneNumber}
            webUrl={business.website}
          />
        </div>
      </Card>
    </div>
  );
};
