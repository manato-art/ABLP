import { Reveal } from "@/components/Reveal";
import { FAQItem } from "@/components/ui/FAQItem";
import { faqs } from "@/lib/faq";

export function FAQ() {
  return (
    <section id="faq" className="page-frame py-8 md:py-[clamp(20px,4.6dvh,56px)]">
      <div className="mx-auto max-w-narrow px-6">
        <Reveal>
          <h2 className="text-center text-section font-extrabold text-white">よくあるご質問</h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 border-t border-white/[0.06]">
            {faqs.map((q) => (
              <FAQItem
                key={q.id}
                faq={q}
                painItemId={String(q.id).padStart(2, "0")}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
