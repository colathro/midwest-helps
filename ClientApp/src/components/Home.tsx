import React from 'react';
import { CompanyCard, CompanyCategory, Interaction } from './CompanyCard';

export const Home: React.FC = () => (
  <div>
    <CompanyCard
      title="Others"
      categories={['retail']}
      lastUpdate={new Date()}
      message="We're offering FREE delivery to the Fargo/Moorhead area, in addition to Local Pick-up and free shipping."
      interactions={['takeout', 'delivery', 'curbside']}
      phone="876-5309"
      webUrl="others.com"
    />
  </div>
);
