// "use client";

// import { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { FAQ_ITEMS } from "@/lib/constants";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// export default function Recap() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const headerRef = useRef<HTMLDivElement>(null);
//   const accordionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Header
//       gsap.fromTo(
//         headerRef.current,
//         { opacity: 0, y: 40 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.8,
//           ease: "power2.out",
//           scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
//         }
//       );

//       // FAQ items stagger
//       const items = accordionRef.current?.querySelectorAll(".faq-item");
//       if (items) {
//         gsap.fromTo(
//           items,
//           { opacity: 0, x: -50 },
//           {
//             opacity: 1,
//             x: 0,
//             duration: 0.5,
//             stagger: 0.1,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: accordionRef.current,
//               start: "top 80%",
//             },
//           }
//         );
//       }
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       id="recap"
//       className="relative min-h-screen py-24 md:py-32 bg-flat-green text-black overflow-hidden border-b-8 border-black"
//     >
//       <div className="relative z-10 max-w-4xl mx-auto px-6">
//         {/* Section header */}
//         <div ref={headerRef} className="mb-20 text-center opacity-0">
//           <p
//             className="text-lg uppercase tracking-[0.3em] font-bold mb-3 border-4 border-black inline-block px-4 py-1 bg-white shadow-[4px_4px_0_0_#000]"
//             style={{ fontFamily: "var(--font-body)" }}
//           >
//             Your Recap
//           </p>
//           <h2
//             className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mt-6"
//             style={{ fontFamily: "var(--font-display)" }}
//           >
//             Frequently<br/>Played<br/>
//             <span className="text-flat-pink [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:4px_black]">Questions</span>
//           </h2>
//         </div>

//         {/* FAQ Accordion */}
//         <div ref={accordionRef}>
//           <Accordion multiple={false} className="space-y-6">
//             {FAQ_ITEMS.map((item) => (
//               <AccordionItem
//                 key={item.id}
//                 value={item.id}
//                 className="faq-item border-4 border-black bg-white px-6 shadow-[8px_8px_0_0_#000] data-[state=open]:bg-flat-yellow transition-colors opacity-0"
//               >
//                 <AccordionTrigger
//                   className="text-left text-xl md:text-2xl font-black text-black hover:text-black transition-colors py-6 uppercase [&[data-state=open]>svg]:rotate-180"
//                   style={{ fontFamily: "var(--font-display)" }}
//                 >
//                   {item.question}
//                 </AccordionTrigger>
//                 <AccordionContent
//                   className="text-black font-bold text-base md:text-lg leading-relaxed pb-6 border-t-4 border-black pt-4"
//                   style={{ fontFamily: "var(--font-body)" }}
//                 >
//                   {item.answer}
//                 </AccordionContent>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         </div>
//       </div>
//     </section>
//   );
// }
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
      // Header animation
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        }
      );

      // FAQ Cards
      const cards = accordionRef.current?.querySelectorAll(".faq-item");

      if (cards) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 80,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
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
      className="relative overflow-hidden bg-[#121212] py-24 md:py-32 text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-[30rem] w-[30rem] rounded-full bg-[#1DB954]/20 blur-[180px]" />

        <div className="absolute right-0 top-1/3 h-[34rem] w-[34rem] rounded-full bg-purple-600/20 blur-[220px]" />

        <div className="absolute bottom-0 left-1/2 h-[24rem] w-[24rem] rounded-full bg-pink-500/15 blur-[180px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,.65))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Header */}

        <div
          ref={headerRef}
          className="mb-24 flex flex-col items-center text-center opacity-0"
        >
          <div className="rounded-full border border-white/10 bg-white/5 px-6 py-2 backdrop-blur-xl">
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#1DB954]">
              CODEISSANCE Wrapped
            </span>
          </div>

          <h2
            className="mt-10 text-5xl font-black leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your Most
            <br />

            <span className="bg-gradient-to-r from-[#1DB954] via-[#7C4DFF] to-[#FF4ECD] bg-clip-text text-transparent">
              Played
            </span>

            <br />

            Questions
          </h2>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            Every hackathon has its greatest hits. Here's your playlist of the
            most frequently asked questions.
          </p>
        </div>

        {/* Accordion */}

        <div ref={accordionRef}>
          <Accordion
            type="single"
            collapsible
            className="space-y-6"
          >
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="
                faq-item
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-2xl
                transition-all
                duration-500
                hover:scale-[1.015]
                hover:border-[#1DB954]/40
                hover:bg-white/10
                hover:shadow-[0_0_45px_rgba(29,185,84,.18)]
                data-[state=open]:border-[#1DB954]/40
                data-[state=open]:bg-gradient-to-r
                data-[state=open]:from-[#1DB954]/10
                data-[state=open]:to-[#7C4DFF]/10
                opacity-0
              "
              >
                {/* Left Accent */}

                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#1DB954] via-[#7C4DFF] to-[#FF4ECD]" />

                

                <AccordionTrigger
                  className="
                  px-8
                  py-7
                  text-left
                  text-xl
                  font-bold
                  text-white
                  transition-colors
                  hover:text-[#1DB954]
                  [&[data-state=open]>svg]:rotate-180
                "
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.question}
                </AccordionTrigger>

                <AccordionContent
                  className="
                  border-t
                  border-white/10
                  px-8
                  pb-8
                  pt-6
                  text-base
                  leading-8
                  text-zinc-300
                "
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