import Faker from 'faker';
import {
  CompanyCardProps,
  CompanyCategory,
  CompanyInteraction
} from './components/CompanyCard/CompanyCard';

const companyCategories: CompanyCategory[] = [
  'brewery',
  'coffee',
  'entertainment',
  'grocery',
  'other',
  'religion',
  'restaurant',
  'retail',
  'wellness'
];

const companyInteractions: CompanyInteraction[] = [
  'appointment',
  'curbside',
  'delivery',
  'livestream',
  'takeout'
];

const getFakeInteractions = (numInteractions: number) => {
  // if longer than the length of options, make it be the length of the options
  numInteractions =
    numInteractions <= companyInteractions.length
      ? numInteractions
      : companyInteractions.length;

  const interactions: CompanyInteraction[] = [];
  const tempInteractions = [...companyInteractions];
  for (let i = 0; i < numInteractions; i++) {
    const interactionIndex = Faker.random.number(tempInteractions.length - 1);
    interactions.push(tempInteractions[interactionIndex]);
    tempInteractions.splice(interactionIndex, 1);
  }

  return interactions;
};

export const getFakeCompanies = (numCompanies: number) => {
  const companies: CompanyCardProps[] = [];

  for (let i = 0; i < numCompanies; i++) {
    companies.push({
      title: Faker.company.companyName(),
      category:
        companyCategories[Faker.random.number(companyCategories.length - 1)],
      lastUpdate: Faker.date.recent(),
      message: Faker.company.catchPhrase(),
      interactions: getFakeInteractions(
        Faker.random.number(companyInteractions.length)
      ),
      phone: Faker.random.boolean() ? Faker.phone.phoneNumber() : undefined,
      webUrl: Faker.random.boolean() ? Faker.internet.url() : undefined,
      giftCardUrl: Faker.random.boolean() ? Faker.internet.url() : undefined
    });
  }

  return companies;
};
