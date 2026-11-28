type MailtoCtaProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

export function MailtoCta({
  href,
  label,
  variant = "primary",
}: MailtoCtaProps) {
  const className =
    variant === "secondary" ? "action action-secondary" : "action";
  return (
    <a className={className} href={href}>
      {label}
    </a>
  );
}
