import React from "react";

export type ExperienceCardProps = {
  title: string;
  description: string;
};

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  description,
}) => {
  return (
    <article className="flex flex-col">
      <h3 className="mb-6 whitespace-pre-line font-serif text-[28px] font-medium leading-[1.15] tracking-[0.01em] text-[#f3e9c9]">
        {title}
      </h3>

      <p className="max-w-[320px] text-[15px] leading-7 text-white/90">
        {description}
      </p>

      <span className="mt-10 h-px w-full bg-[#f3e9c9]/60" />
    </article>
  );
};
