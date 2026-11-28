import type { FaqItem } from "@/lib/content";

type FaqSectionProps = {
  id?: string;
  heading?: string;
  intro?: string;
  items: readonly FaqItem[];
};

export function FaqSection({
  id = "faq",
  heading = "Common questions",
  intro = "Direct answers in plain English, aligned with our control-design documentation.",
  items,
}: FaqSectionProps) {
  return (
    <section id={id} className="page-section" aria-labelledby={`${id}-heading`}>
      <p className="kicker">Questions &amp; Answers</p>
      <h2 id={`${id}-heading`}>{heading}</h2>
      <p className="section-intro">{intro}</p>
      <dl className="faq-list">
        {items.map((item) => (
          <div key={item.question} className="faq-item">
            <dt>{item.question}</dt>
            <dd>{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
