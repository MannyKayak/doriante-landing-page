import React, { JSX } from "react";
import Image from "next/image";
import DorianteText from "../ui/DorianteText";
import DorianteTitle from "../ui/DorianteTitle";

type ExperiencesDetailsCard = {
  id: number;
  title: string;
  image: string;
  details: string[];
};

export const ExperiencesDetailsSection = (): JSX.Element => {
  const contentData: ExperiencesDetailsCard[] = [
    {
      id: 10,
      title: "Where Art Lives",
      image: "/assets/images/room1.png",
      details: [
        "Each room at Doriante is a carefully curated gallery space, featuring works by emerging and established artists. Wake up surrounded by beauty, with views of Lago d'Orta stretching beyond your windows.",
        "Our accommodations blend minimalist Italian design with contemporary comfort, creating spaces that inspire contemplation and connection with the artistic heritage of the region.",
        "Experience slow living at its finest - where every detail is designed to encourage mindfulness, creativity, and deep restoration.",
      ],
    },
  ];

  return (
    <section className="w-full flex flex-col bg-background">
      <div className="w-full flex flex-col bg-background">
        <Image
          className="w-full h-full object-cover"
          alt="Doriante hotel room with art and lake view"
          src={"/aessets/images/room1.png"}
          fill
        />
      </div>

      <article className="px-20">
        {contentData.map((content) => (
          <div
            key={content.id}
            className="flex flex-col justify-center items-center"
          >
            <Image
              src={content.image}
              alt={content.title}
              width={1678}
              height={920}
            />
            <DorianteTitle color="light" tag="h1">
              {content.title}
            </DorianteTitle>
            <div>
              {content.details.map((text, i) => (
                <DorianteText
                  key={content.id + i}
                  color="white"
                  align="center"
                  size="lg"
                >
                  {text}
                </DorianteText>
              ))}
            </div>
          </div>
        ))}
      </article>
    </section>
  );
};
