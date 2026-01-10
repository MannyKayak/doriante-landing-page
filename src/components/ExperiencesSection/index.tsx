import React, { JSX } from "react";
import { ExperienceCard } from "./Components/ExperienceCard";

export type FeatureCard = {
  id: number;
  title: string;
  description: string;
};

export const ExperiencesSection = (): JSX.Element => {
  const features: FeatureCard[] = [
    {
      id: 1,
      title: "Luxury\nAccommodation",
      description:
        "Our elegantly appointed rooms and suites offer the perfect blend of rustic charm and modern luxury, ensuring a restful stay.",
    },
    {
      id: 2,
      title: "Farm-to-Table\nRestaurant",
      description:
        "Experience the authentic flavors of Tuscany with our seasonal menu featuring ingredients from our own garden and local producers.",
    },
    {
      id: 3,
      title: "Art & Cultural\nExperiences",
      description:
        "Immerse yourself in Tuscan culture through our on-site art gallery, cooking classes, wine tastings, and guided excursions.",
    },
  ];

  return (
    <section className="w-full bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-3">
          {features.map((item) => (
            <ExperienceCard
              key={item.id}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
