"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/constants";
import { Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Recap() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        }
      );

      const cards =
        faqRef.current?.querySelectorAll(".faq-card");

      if (cards) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: faqRef.current,
              start: "top 80%",
            },
          }
        );
      }

      gsap.to(".blob1", {
        x: 60,
        y: -40,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".blob2", {
        x: -40,
        y: 60,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".blob3", {
        y: -80,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative overflow-hidden bg-[#0A0A0A] py-28 text-white"
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="blob1 absolute -top-40 -left-32 h-[500px] w-[500px] rounded-full bg-[#1DB954]/20 blur-[140px]" />

        <div className="blob2 absolute right-[-120px] top-40 h-[420px] w-[420px] rounded-full bg-[#7357FF]/20 blur-[150px]" />

        <div className="blob3 absolute bottom-[-250px] left-1/2 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-[#1DB954]/10 blur-[180px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        <div
          ref={headerRef}
          className="mb-24 text-center opacity-0"
        >

          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2 backdrop-blur-xl">

            <Sparkles className="h-5 w-5 text-[#1DB954]" />

            <span className="text-sm uppercase tracking-[0.4em]">
              FAQ
            </span>

          </div>

          <h2
            className="
            mt-10
            text-5xl
            sm:text-6xl
            md:text-8xl
            font-black
            tracking-[-0.05em]
            leading-none
          "
          >
            Got
            <br />
            Questions?
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/60">
            Everything you need to know before participating in
            CodeSsiance 2026.
          </p>

        </div>

        <div
          ref={faqRef}
          className="mx-auto max-w-5xl space-y-6"
        ></div>
          <Accordion className="space-y-6">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="
                  faq-card
                  group
                  overflow-hidden
                  rounded-[32px]
                  border
                  border-white/10
                  bg-white/[0.04]
                  backdrop-blur-2xl
                  transition-all
                  duration-500
                  hover:border-[#1DB954]
                  hover:bg-white/[0.06]
                  hover:shadow-[0_20px_80px_rgba(29,185,84,.18)]
                "
              >
                <AccordionTrigger
                  className="
                    px-8
                    py-7
                    text-left
                    no-underline
                    hover:no-underline
                  "
                >
                  <div className="flex w-full items-center justify-between">

                    <div className="flex items-center gap-6">

                      <div
                        className="
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-full
                          bg-[#1DB954]
                          text-lg
                          font-black
                          text-black
                          shadow-[0_0_35px_rgba(29,185,84,.45)]
                        "
                      >
                        {(index + 1).toString().padStart(2, "0")}
                      </div>

                      <div>

                        <p className="text-sm uppercase tracking-[0.35em] text-white/40">
                          Question
                        </p>

                        <h3 className="mt-1 text-xl md:text-2xl font-bold leading-tight transition-colors group-hover:text-[#1DB954]">
                          {item.question}
                        </h3>

                      </div>

                    </div>

                  </div>
                </AccordionTrigger>

                <AccordionContent>

                  <div
                    className="
                      mx-8
                      mb-8
                      rounded-3xl
                      border
                      border-white/10
                      bg-[#111]
                      p-7
                    "
                  >
                    <p className="text-lg leading-8 text-white/70">
                      {item.answer}
                    </p>
                  </div>

                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Bottom CTA */}

          <div className="mt-24 text-center">

            <div
              className="
                inline-flex
                flex-col
                items-center
                rounded-[40px]
                border
                border-white/10
                bg-gradient-to-br
                from-[#1DB954]/15
                to-white/5
                px-10
                py-10
                backdrop-blur-xl
              "
            >

              <h3 className="text-3xl md:text-5xl font-black tracking-tight">
                Still Curious?
              </h3>

              <p className="mt-4 max-w-xl text-white/60 text-lg">
                Join our Discord community or reach out to the CodeSsiance team.
                We're happy to help you before the hackathon begins.
              </p>

              <button
                className="
                  mt-8
                  rounded-full
                  bg-[#1DB954]
                  px-8
                  py-4
                  text-lg
                  font-bold
                  text-black
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:shadow-[0_0_50px_rgba(29,185,84,.45)]
                "
              >
                Contact Us
              </button>

            </div>

          </div>

        </div>
      
  
  </section>
  );
  

}
