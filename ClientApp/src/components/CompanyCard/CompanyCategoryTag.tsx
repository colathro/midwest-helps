import React from "react";
import { CompanyCategory } from "./CompanyCard";

export interface CompanyCategoryTagProps {
  category: CompanyCategory;
}

const typeStrings: { [key in CompanyCategory]: string } = {
  art: "🎨 — Art & Culture",
  brewery: "🍸 Brewery & Distillery",
  beauty: "💈 — Beauty",
  coffee: "☕ Coffee",
  entertainment: "🎸 Entertainment",
  grocery: "🛒 Grocery",
  other: "📦 Other",
  religion: "🙏 Religion & Spiritual",
  restaurant: "🍔 Restaurant & Bar",
  retail: "👕 Retail",
  wellness: "🧡 Wellness"
};

export const CompanyCategoryTag: React.FC<CompanyCategoryTagProps> = props => (
  <p className="category-tag">{typeStrings[props.category]}</p>
);
