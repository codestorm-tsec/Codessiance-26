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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="recap"
      className="section-light grain-overlay relative overflow-hidden py-24 md:py-36"
      style={{ backgroundColor: "#EBE6DF" }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        
        {/* Editorial Feature Header matching Spotify Section 5 */}
        <div ref={headerRef} className="mb-16 text-center opacity-0">
          <h2
            className="text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] text-black tracking-tight"
            style={{ fontFamily: "var(--font-body)" }}
          >
            How to Get Your <strong className="font-black text-black block mt-2">Codessiance Recap</strong>
          </h2>
          <p className="mt-4 text-lg font-bold text-black/60">
            Frequently Asked Questions
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion multiple={false} className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="bg-white border border-black/10 rounded-xl overflow-hidden px-6 py-2 transition-all shadow-sm"
            >
              <AccordionTrigger
                className="text-left text-lg md:text-xl font-bold text-black hover:text-[#1DB954] transition-colors py-4"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent
                className="text-base text-black/70 leading-relaxed pb-4 pt-2 border-t border-black/5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
