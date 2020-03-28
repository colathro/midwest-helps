import React from 'react';
import { CompanyCard, CompanyCategory, Interaction } from './CompanyCard';

export const Home: React.FC = () => (
  <div>
    <CompanyCard
      title="Others"
      categories={[CompanyCategory.Retail]}
      lastUpdate={new Date()}
      message="We're offering FREE delivery to the Fargo/Moorhead area, in addition to Local Pick-up and free shipping."
      interactions={[
        Interaction.Takeout,
        Interaction.Delivery,
        Interaction.Curbside
      ]}
      phone="876-5309"
      webUrl="others.com"
    />
  </div>
);
