"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Recap() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        }
      );

      // FAQ items stagger
      const items = accordionRef.current?.querySelectorAll(".faq-item");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: accordionRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="recap"
      className="relative min-h-screen py-24 md:py-32 bg-flat-green text-black overflow-hidden border-b-8 border-black"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section header */}
        <div ref={headerRef} className="mb-20 text-center opacity-0">
          <p
            className="text-lg uppercase tracking-[0.3em] font-bold mb-3 border-4 border-black inline-block px-4 py-1 bg-white shadow-[4px_4px_0_0_#000]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Your Recap
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mt-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Frequently<br/>Played<br/>
            <span className="text-flat-pink [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:4px_black]">Questions</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div ref={accordionRef}>
          <Accordion multiple={false} className="space-y-6">
            {FAQ_ITEMS.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="faq-item border-4 border-black bg-white px-6 shadow-[8px_8px_0_0_#000] data-[state=open]:bg-flat-yellow transition-colors opacity-0"
              >
                <AccordionTrigger
                  className="text-left text-xl md:text-2xl font-black text-black hover:text-black transition-colors py-6 uppercase [&[data-state=open]>svg]:rotate-180"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-black font-bold text-base md:text-lg leading-relaxed pb-6 border-t-4 border-black pt-4"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
