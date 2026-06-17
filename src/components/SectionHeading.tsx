type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center"
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl text-left"
      }
    >
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-lago-blue">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold text-lago-navy sm:text-4xl dark:text-white">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-slate-600 dark:text-white/70">
          {description}
        </p>
      ) : null}
    </div>
  );
}
