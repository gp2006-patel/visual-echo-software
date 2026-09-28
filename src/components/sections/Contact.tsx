import { useState, type FormEvent } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

interface FormState {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const projectTypes = ["Residential", "Commercial", "Hospitality", "Styling", "Consultation", "Other"];
const budgets = ["Under ₹25 Lakhs", "₹25L – ₹50 Lakhs", "₹50L – ₹1 Crore", "₹1 Crore+", "Discuss privately"];

const initialState: FormState = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
};

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Please enter a valid email address.";
  if (!values.projectType) errors.projectType = "Please choose a project type.";
  if (!values.budget) errors.budget = "Please choose a budget range.";
  if (values.message.trim().length < 10)
    errors.message = "Please tell us a little more (at least 10 characters).";
  return errors;
}

const fieldClass =
  "mt-2 w-full rounded-xl border border-border bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-brass";

export function Contact() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const update = (key: keyof FormState, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    // Placeholder submit handler — connect to your preferred inbox or backend.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
  };

  return (
    <section id="contact" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's Create Something With Soul."
            copy="Tell us a little about your space, your vision, and where you'd like to take it."
          />
          <ul className="mt-10 space-y-3 text-sm text-muted-foreground">
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brass"
              >
                Instagram · @dream_homevisuals
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/91${site.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brass"
              >
                WhatsApp · {site.whatsapp}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-brass">
                Email · {site.email}
              </a>
            </li>
          </ul>
        </div>

        {status === "success" ? (
          <div className="glass flex flex-col items-start justify-center p-8" role="status">
            <p className="eyebrow">Message received</p>
            <h3 className="mt-3 text-2xl">Thank you — we&apos;ll be in touch.</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Prefer email? Write to us directly and we&apos;ll reply within two working days.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex min-h-11 items-center rounded-full bg-brass px-6 text-sm font-medium text-primary-foreground"
            >
              Email {site.studio}
            </a>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="glass p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="text-xs tracking-[0.2em] uppercase">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={fieldClass}
                />
                {errors.name ? (
                  <p id="name-error" className="mt-2 text-xs text-destructive">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="email" className="text-xs tracking-[0.2em] uppercase">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={fieldClass}
                />
                {errors.email ? (
                  <p id="email-error" className="mt-2 text-xs text-destructive">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="projectType" className="text-xs tracking-[0.2em] uppercase">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={values.projectType}
                  onChange={(e) => update("projectType", e.target.value)}
                  aria-invalid={Boolean(errors.projectType)}
                  aria-describedby={errors.projectType ? "projectType-error" : undefined}
                  className={fieldClass}
                >
                  <option value="">Select…</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type} className="bg-background">
                      {type}
                    </option>
                  ))}
                </select>
                {errors.projectType ? (
                  <p id="projectType-error" className="mt-2 text-xs text-destructive">
                    {errors.projectType}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="budget" className="text-xs tracking-[0.2em] uppercase">
                  Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={values.budget}
                  onChange={(e) => update("budget", e.target.value)}
                  aria-invalid={Boolean(errors.budget)}
                  aria-describedby={errors.budget ? "budget-error" : undefined}
                  className={fieldClass}
                >
                  <option value="">Select…</option>
                  {budgets.map((budget, i) => (
                    <option key={`${budget}-${i}`} value={`${budget}-${i}`} className="bg-background">
                      {budget}
                    </option>
                  ))}
                </select>
                {errors.budget ? (
                  <p id="budget-error" className="mt-2 text-xs text-destructive">
                    {errors.budget}
                  </p>
                ) : null}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="text-xs tracking-[0.2em] uppercase">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={fieldClass}
                />
                {errors.message ? (
                  <p id="message-error" className="mt-2 text-xs text-destructive">
                    {errors.message}
                  </p>
                ) : null}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brass px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
            >
              {status === "loading" ? "Sending…" : "Send Enquiry"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
