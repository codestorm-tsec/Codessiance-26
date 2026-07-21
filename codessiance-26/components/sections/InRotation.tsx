// // "use client";

// // import { useRef, useEffect } from "react";
// // import gsap from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import { SPONSORS } from "@/lib/constants";

// // if (typeof window !== "undefined") {
// //   gsap.registerPlugin(ScrollTrigger);
// // }

// // export default function InRotation() {
// //   const sectionRef = useRef<HTMLElement>(null);
// //   const headerRef = useRef<HTMLDivElement>(null);
// //   const marqueeRef = useRef<HTMLDivElement>(null);

// //   const titleSponsors = SPONSORS.filter((s) => s.tier === "title");
// //   const poweredBy = SPONSORS.filter((s) => s.tier === "powered-by");
// //   const partners = SPONSORS.filter((s) => s.tier === "partner");

// //   const tierSections = [
// //     { label: "Title Sponsor", sponsors: titleSponsors },
// //     { label: "Powered By", sponsors: poweredBy },
// //     { label: "Partners", sponsors: partners },
// //   ];

// //   useEffect(() => {
// //     const ctx = gsap.context(() => {
// //       // Header reveal
// //       gsap.fromTo(
// //         headerRef.current,
// //         { opacity: 0, y: 40 },
// //         {
// //           opacity: 1,
// //           y: 0,
// //           duration: 0.8,
// //           ease: "power2.out",
// //           scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
// //         }
// //       );

// //       // Tier blocks stagger
// //       const tiers = sectionRef.current?.querySelectorAll(".sponsor-tier");
// //       if (tiers) {
// //         gsap.fromTo(
// //           tiers,
// //           { opacity: 0, y: 50 },
// //           {
// //             opacity: 1,
// //             y: 0,
// //             duration: 0.7,
// //             stagger: 0.2,
// //             ease: "back.out(1.2)",
// //             scrollTrigger: { trigger: tiers[0], start: "top 85%" },
// //           }
// //         );
// //       }

// //       // Infinite horizontal marquee for partner logos
// //       const marquee = marqueeRef.current;
// //       if (marquee) {
// //         const inner = marquee.querySelector(".marquee-inner") as HTMLElement;
// //         if (inner) {
// //           // Duplicate content for seamless loop
// //           inner.innerHTML += inner.innerHTML;

// //           const marqueeAnim = gsap.to(inner, {
// //             xPercent: -50,
// //             duration: 20,
// //             ease: "none",
// //             repeat: -1,
// //           });

// //           // Pause on hover
// //           marquee.addEventListener("mouseenter", () => marqueeAnim.pause());
// //           marquee.addEventListener("mouseleave", () => marqueeAnim.resume());
// //         }
// //       }
// //     }, sectionRef);

// //     return () => ctx.revert();
// //   }, []);

// //   return (
// //     <section
// //       ref={sectionRef}
// //       id="sponsors"
// //       className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-flat-blue text-black border-b-8 border-black"
// //     >
// //       <div className="relative z-20 max-w-7xl mx-auto px-6">
// //         {/* Section header */}
// //         <div ref={headerRef} className="mb-20 text-center opacity-0">
// //           {/* <p
// //             className="text-lg uppercase tracking-[0.3em] font-bold mb-3 border-4 border-black inline-block px-4 py-1 bg-white shadow-[4px_4px_0_0_#000]"
// //             style={{ fontFamily: "var(--font-body)" }}
// //           >
// //             In Rotation
// //           </p> */}
// //           <div className="inline-flex items-center gap-3 rounded-full border-4 border-black bg-white px-6 py-3 shadow-[6px_6px_0_#000]">
// //     <div className="w-5 h-5"/>
// //     <span className="uppercase tracking-[0.35em] font-black">
// //         IN ROTATION
// //     </span>
// // </div>
// //           <h2
// //             className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mt-6"
// //             style={{ fontFamily: "var(--font-display)" }}
// //           >
// //             Our<br/>Sponsors
// //           </h2>
// //         </div>

// //         {/* Sponsor tiers */}
// //         <div className="space-y-16">
// //           {/* Title + Powered By — static grid */}
// //           {tierSections
// //             .filter((t) => t.label !== "Partners")
// //             .map((tier) => (
// //               <div key={tier.label} className="sponsor-tier opacity-0">
// //                 <div className="flex justify-center mb-6">
// //                   <p
// //                     className="text-sm uppercase font-black tracking-widest text-black bg-flat-yellow border-2 border-black px-4 py-1 rotate-[-2deg]"
// //                     style={{ fontFamily: "var(--font-body)" }}
// //                   >
// //                     {tier.label}
// //                   </p>
// //                 </div>
// //                 <div
// //                   className={`grid gap-6 justify-items-center ${
// //                     tier.label === "Title Sponsor"
// //                       ? "grid-cols-1 max-w-lg mx-auto"
// //                       : "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
// //                   }`}
// //                 >
// //                   {tier.sponsors.map((sponsor) => (
// //                     <div
// //                       key={sponsor.id}
// //                       className={`group flex items-center justify-center border-4 border-black bg-white shadow-[8px_8px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 cursor-pointer ${
// //                         tier.label === "Title Sponsor"
// //                           ? "w-full h-48 md:h-64"
// //                           : "w-full h-32 md:h-40"
// //                       }`}
// //                     >
// //                       <span
// //                         className="text-black text-xl md:text-2xl font-black text-center px-4 uppercase"
// //                         style={{ fontFamily: "var(--font-display)" }}
// //                       >
// //                         {sponsor.name}
// //                       </span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             ))}

// //           {/* Partners — infinite marquee */}
// //           <div className="sponsor-tier opacity-0">
// //             <div className="flex justify-center mb-6">
// //               <p
// //                 className="text-sm uppercase font-black tracking-widest text-black bg-flat-pink border-2 border-black px-4 py-1 rotate-[2deg]"
// //                 style={{ fontFamily: "var(--font-body)" }}
// //               >
// //                 Partners
// //               </p>
// //             </div>
// //             <div
// //               ref={marqueeRef}
// //               className="overflow-hidden py-4"
// //             >
// //               <div className="marquee-inner flex gap-6 w-max">
// //                 {partners.map((sponsor) => (
// //                   <div
// //                     key={sponsor.id}
// //                     className="flex items-center justify-center border-4 border-black bg-white shadow-[6px_6px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] transition-all duration-200 cursor-pointer w-56 h-28 md:w-64 md:h-32 shrink-0 hover:-translate-y-1 hover:translate-x-1"
// //                   >
// //                     <span
// //                       className="text-black text-lg md:text-xl font-black text-center px-4 uppercase"
// //                       style={{ fontFamily: "var(--font-display)" }}
// //                     >
// //                       {sponsor.name}
// //                     </span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }
// "use client";

// import { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SPONSORS } from "@/lib/constants";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// export default function InRotation() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const headerRef = useRef<HTMLDivElement>(null);
//   const marqueeRef = useRef<HTMLDivElement>(null);

//   const titleSponsors = SPONSORS.filter((s) => s.tier === "title");
//   const poweredBy = SPONSORS.filter((s) => s.tier === "powered-by");
//   const partners = SPONSORS.filter((s) => s.tier === "partner");

//   const tierSections = [
//     { label: "Title Sponsor", sponsors: titleSponsors },
//     { label: "Powered By", sponsors: poweredBy },
//     { label: "Partners", sponsors: partners },
//   ];

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Header reveal
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

//       // Tier blocks stagger
//       const tiers = sectionRef.current?.querySelectorAll(".sponsor-tier");
//       if (tiers) {
//         gsap.fromTo(
//           tiers,
//           { opacity: 0, y: 50 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.7,
//             stagger: 0.2,
//             ease: "power3.out",
//             scrollTrigger: { trigger: tiers[0], start: "top 85%" },
//           }
//         );
//       }

//       // Infinite horizontal marquee for partner logos
//       const marquee = marqueeRef.current;
//       if (marquee) {
//         const inner = marquee.querySelector(".marquee-inner") as HTMLElement;
//         if (inner) {
//           // Prevent duplicate appending on multiple re-renders
//           if (!inner.dataset.duplicated) {
//             inner.innerHTML += inner.innerHTML;
//             inner.dataset.duplicated = "true";
//           }

//           const marqueeAnim = gsap.to(inner, {
//             xPercent: -50,
//             duration: 20,
//             ease: "none",
//             repeat: -1,
//           });

//           // Pause on hover
//           const onEnter = () => marqueeAnim.pause();
//           const onLeave = () => marqueeAnim.resume();

//           marquee.addEventListener("mouseenter", onEnter);
//           marquee.addEventListener("mouseleave", onLeave);

//           return () => {
//             marquee.removeEventListener("mouseenter", onEnter);
//             marquee.removeEventListener("mouseleave", onLeave);
//           };
//         }
//       }
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       id="sponsors"
//       className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-[#121212] text-white border-b border-[#282828]"
//     >
//       {/* Spotify Green Soft Ambient Glows */}
//       <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#1DB954]/15 rounded-full blur-[128px] pointer-events-none" />
//       <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#1DB954]/10 rounded-full blur-[128px] pointer-events-none" />

//       <div className="relative z-20 max-w-7xl mx-auto px-6">
//         {/* Section header */}
//         <div ref={headerRef} className="mb-20 text-center opacity-0">
//           <div className="inline-flex items-center gap-3 rounded-full border border-[#1DB954]/30 bg-[#181818]/80 backdrop-blur-md px-6 py-2.5 shadow-lg shadow-[#1DB954]/5">
//             {/* Pulsing Playing Indicator Dot */}
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1DB954] opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1DB954]"></span>
//             </span>
//             <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#1DB954]">
//               IN ROTATION
//             </span>
//           </div>

//           <h2
//             className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase mt-6 text-white"
//             style={{ fontFamily: "var(--font-display)" }}
//           >
//             Our<br />
//             <span className="text-[#1DB954]">Sponsors</span>
//           </h2>
//         </div>

//         {/* Sponsor tiers */}
//         <div className="space-y-16">
//           {/* Title + Powered By — static grid */}
//           {tierSections
//             .filter((t) => t.label !== "Partners")
//             .map((tier) => (
//               <div key={tier.label} className="sponsor-tier opacity-0">
//                 <div className="flex justify-center mb-6">
//                   <p
//                     className="text-xs uppercase font-bold tracking-widest text-[#1DB954] bg-[#181818] border border-[#282828] rounded-full px-5 py-1.5 shadow-sm"
//                     style={{ fontFamily: "var(--font-body)" }}
//                   >
//                     {tier.label}
//                   </p>
//                 </div>
//                 <div
//                   className={`grid gap-6 justify-items-center ${
//                     tier.label === "Title Sponsor"
//                       ? "grid-cols-1 max-w-lg mx-auto"
//                       : "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
//                   }`}
//                 >
//                   {tier.sponsors.map((sponsor) => (
//                     <div
//                       key={sponsor.id}
//                       className={`group relative flex items-center justify-center rounded-2xl border border-[#282828] bg-[#181818] hover:bg-[#282828] hover:border-[#1DB954]/50 transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(29,185,84,0.15)] cursor-pointer overflow-hidden ${
//                         tier.label === "Title Sponsor"
//                           ? "w-full h-48 md:h-64"
//                           : "w-full h-32 md:h-40"
//                       }`}
//                     >
//                       {/* Subtly animated accent bar on hover */}
//                       <div className="absolute top-0 left-0 w-full h-1 bg-[#1DB954] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
//                       <span
//                         className="text-white text-xl md:text-2xl font-bold text-center px-6 uppercase tracking-wider group-hover:text-[#1DB954] transition-colors duration-300"
//                         style={{ fontFamily: "var(--font-display)" }}
//                       >
//                         {sponsor.name}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}

//           {/* Partners — infinite marquee */}
//           <div className="sponsor-tier opacity-0">
//             <div className="flex justify-center mb-6">
//               <p
//                 className="text-xs uppercase font-bold tracking-widest text-[#1DB954] bg-[#181818] border border-[#282828] rounded-full px-5 py-1.5 shadow-sm"
//                 style={{ fontFamily: "var(--font-body)" }}
//               >
//                 Partners
//               </p>
//             </div>
//             <div
//               ref={marqueeRef}
//               className="overflow-hidden py-4 mask-gradient-x"
//             >
//               <div className="marquee-inner flex gap-6 w-max">
//                 {partners.map((sponsor) => (
//                   <div
//                     key={sponsor.id}
//                     className="group relative flex items-center justify-center rounded-2xl border border-[#282828] bg-[#181818] hover:bg-[#282828] hover:border-[#1DB954]/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(29,185,84,0.15)] cursor-pointer w-56 h-28 md:w-64 md:h-32 shrink-0 overflow-hidden"
//                   >
//                     <div className="absolute top-0 left-0 w-full h-1 bg-[#1DB954] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                     <span
//                       className="text-white text-lg md:text-xl font-bold text-center px-4 uppercase tracking-wider group-hover:text-[#1DB954] transition-colors duration-300"
//                       style={{ fontFamily: "var(--font-display)" }}
//                     >
//                       {sponsor.name}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Disc3, Play, Music2, Headphones } from "lucide-react";
import { SPONSORS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InRotation() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const titleSponsors = SPONSORS.filter((s) => s.tier === "title");
  const poweredBy = SPONSORS.filter((s) => s.tier === "powered-by");
  const partners = SPONSORS.filter((s) => s.tier === "partner");

  const tierSections = [
    { label: "TOP TRACK", sponsors: titleSponsors },
    { label: "FEATURED ARTIST", sponsors: poweredBy },
    { label: "PLAYLIST", sponsors: partners },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
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

      // Tier blocks stagger
      const tiers = sectionRef.current?.querySelectorAll(".sponsor-tier");
      if (tiers) {
        gsap.fromTo(
          tiers,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.2,
            ease: "back.out(1.2)",
            scrollTrigger: { trigger: tiers[0], start: "top 85%" },
          }
        );
      }

      // Infinite horizontal marquee for partner logos
      const marquee = marqueeRef.current;
      if (marquee) {
        const inner = marquee.querySelector(".marquee-inner") as HTMLElement;
        if (inner) {
          // Prevent duplicate appending on multiple re-renders
          if (!inner.dataset.duplicated) {
            inner.innerHTML += inner.innerHTML;
            inner.dataset.duplicated = "true";
          }

          const marqueeAnim = gsap.to(inner, {
            xPercent: -50,
            duration: 20,
            ease: "none",
            repeat: -1,
          });

          const onEnter = () => marqueeAnim.pause();
          const onLeave = () => marqueeAnim.resume();

          marquee.addEventListener("mouseenter", onEnter);
          marquee.addEventListener("mouseleave", onLeave);

          return () => {
            marquee.removeEventListener("mouseenter", onEnter);
            marquee.removeEventListener("mouseleave", onLeave);
          };
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-flat-blue text-black border-b-8 border-black"
    >
      {/* 🎨 Colorful Spotify Wrapped Ambient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 h-80 w-80 rounded-full bg-flat-pink opacity-25 blur-[120px]" />
        <div className="absolute bottom-10 right-0 h-[28rem] w-[28rem] rounded-full bg-flat-yellow opacity-20 blur-[140px]" />
        <div className="absolute left-1/2 top-1/2 h-[20rem] w-[20rem] rounded-full bg-flat-green opacity-20 blur-[110px]" />

        {/* 🌈 Floating Music Notes */}
        <Music2 className="absolute top-20 left-12 w-16 h-16 opacity-10 blur-sm rotate-12" />
        <Disc3 className="absolute bottom-32 left-20 w-24 h-24 opacity-10 blur-sm -rotate-45" />
        <Headphones className="absolute top-1/3 right-16 w-20 h-20 opacity-10 blur-sm rotate-12" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        {/* 🎵 Section Header */}
        <div ref={headerRef} className="mb-20 text-center opacity-0">
          <div className="inline-flex items-center gap-3 rounded-full border-4 border-black bg-white px-6 py-3 shadow-[6px_6px_0_#000]">
            <Disc3 className="w-5 h-5 animate-spin-slow" />
            <span className="uppercase tracking-[0.35em] font-black">
              IN ROTATION
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mt-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our<br />Sponsors
          </h2>
        </div>

        {/* Sponsor Tiers */}
        <div className="space-y-20">
          {/* TOP TRACK & FEATURED ARTIST — Static Grid */}
          {tierSections
            .filter((t) => t.label !== "PLAYLIST")
            .map((tier) => (
              <div key={tier.label} className="sponsor-tier opacity-0">
                <div className="flex justify-center mb-8">
                  <p
                    className="text-sm uppercase font-black tracking-widest text-black bg-flat-yellow border-2 border-black px-5 py-1.5 rotate-[-2deg] shadow-[3px_3px_0_#000]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {tier.label}
                  </p>
                </div>

                <div
                  className={`grid gap-8 justify-items-center ${
                    tier.label === "TOP TRACK"
                      ? "grid-cols-1 max-w-lg mx-auto"
                      : "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
                  }`}
                >
                  {tier.sponsors.map((sponsor) => (
                    <div
                      key={sponsor.id}
                      className={`group relative overflow-hidden rounded-[32px] border-[6px] border-black bg-white shadow-[10px_10px_0_0_#000] transition-all duration-500 hover:-translate-y-4 hover:rotate-0 hover:scale-[1.03] cursor-pointer w-full flex flex-col items-center justify-center p-8 ${
                        tier.label === "TOP TRACK"
                          ? "min-h-[20rem]"
                          : "min-h-[16rem]"
                      }`}
                    >
                      {/* ✨ Shine Animation */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full pointer-events-none z-10" />

                      {/* 🎧 NOW PLAYING Badge */}
                      <div className="absolute left-5 top-5 rounded-full border-2 border-black bg-black px-4 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-white">
                        NOW PLAYING
                      </div>

                    

                    
                      {/* 🎵 Sponsor Name */}
                      <span
                        className="text-3xl md:text-4xl font-black leading-none uppercase text-center text-black tracking-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {sponsor.name}
                      </span>

                      {/* 🎼 Fake Track Info */}
                      <p
                        className="mt-3 text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-black/70"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Official Sponsor
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          {/* 🎬 PLAYLIST — Imperfect Rotated Infinite Marquee */}
          <div className="sponsor-tier opacity-0">
            <div className="flex justify-center mb-8">
              <p
                className="text-sm uppercase font-black tracking-widest text-black bg-flat-pink border-2 border-black px-5 py-1.5 rotate-[2deg] shadow-[3px_3px_0_#000]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                PLAYLIST
              </p>
            </div>

            <div
              ref={marqueeRef}
              className="overflow-hidden py-6 rotate-[-2deg] transition-transform duration-300 hover:rotate-0"
            >
              <div className="marquee-inner flex gap-8 w-max">
                {partners.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="group relative overflow-hidden rounded-[28px] border-[5px] border-black bg-white shadow-[8px_8px_0_0_#000] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.03] cursor-pointer w-64 h-36 md:w-72 md:h-40 shrink-0 flex flex-col items-center justify-center p-4"
                  >
                    {/* ✨ Shine Animation */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full pointer-events-none z-10" />

                    

                    {/* 💿 Mini Vinyl Graphic */}
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-black border-2 border-white mb-2">
                      <div className="absolute h-7 w-7 rounded-full border border-white/30" />
                      <div className="h-2.5 w-2.5 rounded-full bg-white" />
                    </div>

                    <span
                      className="text-xl md:text-2xl font-black text-center px-2 uppercase leading-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {sponsor.name}
                    </span>

                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.15em] text-black/60">
                      Partner Track
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}