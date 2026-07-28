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

import {
  ConcentricCircles,
  CheckeredPattern,
  DotGrid,
} from "@/components/ui/DecorativePatterns";


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
          y: 70,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger:{
            trigger: headerRef.current,
            start:"top 80%",
          },
        }
      );



      const cards =
        faqRef.current?.querySelectorAll(".faq-card");


      if(cards){

        gsap.fromTo(
          cards,
          {
            opacity:0,
            y:50,
            scale:0.96,
          },
          {
            opacity:1,
            y:0,
            scale:1,
            stagger:0.12,
            duration:0.9,
            ease:"power3.out",
            scrollTrigger:{
              trigger:faqRef.current,
              start:"top 80%",
            }
          }
        );

      }



      gsap.to(".blob1",{
        x:50,
        y:-30,
        duration:10,
        repeat:-1,
        yoyo:true,
        ease:"sine.inOut",
      });



      gsap.to(".blob2",{
        x:-40,
        y:40,
        duration:12,
        repeat:-1,
        yoyo:true,
        ease:"sine.inOut",
      });



      gsap.to(".blob3",{
        y:-60,
        duration:14,
        repeat:-1,
        yoyo:true,
        ease:"sine.inOut",
      });



    },sectionRef);



    return()=>ctx.revert();

  },[]);



return (

<section
ref={sectionRef}
id="faq"
className="
relative
overflow-hidden
bg-[#EBE6DF]
py-28
text-[#121212]
"
>


{/* Background Spotify style */}

<div className="absolute inset-0 overflow-hidden">


<div
className="
blob1
absolute
-top-40
-left-32
h-[500px]
w-[500px]
rounded-full
bg-[#1DB954]/15
blur-[130px]
"
/>



<div
className="
blob2
absolute
right-[-120px]
top-40
h-[420px]
w-[420px]
rounded-full
bg-[#191414]/10
blur-[150px]
"
/>



<div
className="
blob3
absolute
bottom-[-250px]
left-1/2
h-[650px]
w-[650px]
-translate-x-1/2
rounded-full
bg-[#1DB954]/10
blur-[160px]
"
/>



</div>

{/* Decorative: Concentric Circles */}

<div
className="
absolute
-top-[15%]
-right-[15%]
w-[45vw]
h-[45vw]
md:w-[30vw]
md:h-[30vw]
opacity-[0.06]
pointer-events-none
"
>

<ConcentricCircles
size={600}
rings={10}
baseColor="#1DB954"
altColor="#EBE6DF"
highlightRing={2}
highlightColor="#191414"
/>

</div>



{/* Decorative: Checkered Pattern */}

<div
className="
absolute
-bottom-[10%]
-left-[5%]
opacity-[0.04]
pointer-events-none
rotate-[12deg]
scale-110
"
>

<CheckeredPattern
cols={6}
rows={10}
size={45}
color1="#1DB954"
color2="transparent"
warp
/>

</div>



{/* Decorative: Dot Grid */}

<div
className="
absolute
top-1/2
-translate-y-1/2
right-8
opacity-[0.08]
pointer-events-none
hidden
lg:block
"
>

<DotGrid
rows={6}
cols={3}
dotSize={12}
gap={14}
color="#191414"
/>

</div>





{/* Main Content */}

<div
className="
relative
z-10
mx-auto
max-w-7xl
px-6
"
>



{/* Header */}


<div
ref={headerRef}
className="
mb-24
text-center
opacity-0
"
>



<div
className="
inline-flex
items-center
gap-3
rounded-full
border
border-[#121212]/10
bg-white/60
px-6
py-2
backdrop-blur-xl
shadow-sm
"
>


<Sparkles
className="
h-5
w-5
text-[#1DB954]
"
/>



<span
className="
text-sm
uppercase
tracking-[0.4em]
font-semibold
text-[#121212]
"
>
FAQ
</span>



</div>





<h2
className="
mt-10
text-4xl
sm:text-6xl
md:text-8xl
font-black
tracking-[-0.05em]
leading-none
text-[#121212]
"
>

Got
<br />
Questions?

</h2>





<p
className="
mx-auto
mt-8
max-w-2xl
text-lg
text-[#555555]
"
>

Everything you need to know before participating in
Codeissance 2026.

</p>




</div>

{/* FAQ Accordion */}

<div
ref={faqRef}
className="
mx-auto
max-w-5xl
space-y-6
"
>


<Accordion className="space-y-6">


{FAQ_ITEMS.map((item,index)=>(


<AccordionItem
key={item.id}
value={item.id}
className="
faq-card
group
overflow-hidden
rounded-[32px]
border
border-[#121212]/10
bg-[#F8F5EF]
shadow-[0_15px_45px_rgba(18,18,18,0.08)]
transition-all
duration-500
hover:border-[#1DB954]
hover:shadow-[0_20px_60px_rgba(29,185,84,0.15)]
"
>



<AccordionTrigger
className="
px-5
sm:px-8
py-5
sm:py-7
text-left
no-underline
hover:no-underline
"
>



<div
className="
flex
w-full
items-center
justify-between
"
>


<div
className="
flex
items-center
gap-6
"
>



{/* Question Number */}


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
text-[#121212]
shadow-[0_8px_25px_rgba(29,185,84,0.25)]
"
>

{(index+1)
.toString()
.padStart(2,"0")}

</div>





<div>


<p
className="
text-sm
uppercase
tracking-[0.35em]
font-semibold
text-[#555555]
"
>

Question

</p>





<h3
className="
mt-1
text-xl
md:text-2xl
font-bold
leading-tight
text-[#121212]
transition-colors
group-hover:text-[#1DB954]
"
>

{item.question}

</h3>



</div>



</div>


</div>


</AccordionTrigger>





<AccordionContent>


<div
className="
mx-5
sm:mx-8
mb-5
sm:mb-8
rounded-3xl
border
border-[#121212]/10
bg-[#EBE6DF]
p-5
sm:p-7
"
>


<p
className="
text-lg
leading-8
text-[#555555]
"
>

{item.answer}

</p>


</div>



</AccordionContent>



</AccordionItem>



))}


</Accordion>


</div>

{/* Bottom CTA */}

<div
className="
mt-24
text-center
"
>


<div
className="
inline-flex
flex-col
items-center
rounded-[40px]
border
border-[#121212]/10
bg-white/70
px-10
py-10
backdrop-blur-xl
shadow-[0_20px_60px_rgba(18,18,18,0.08)]
"
>


<h3
className="
text-3xl
md:text-5xl
font-black
tracking-tight
text-[#121212]
"
>

Still Curious?

</h3>




<p
className="
mt-4
max-w-xl
text-lg
text-[#555555]
"
>

Join our Whatsapp group or reach out to the Codeissance team.
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
text-[#121212]
transition-all
duration-300
hover:scale-105
hover:bg-[#18a94d]
hover:shadow-[0_12px_40px_rgba(29,185,84,0.35)]
"
><a href="https://chat.whatsapp.com/EXAMPLE" target="_blank" rel="noopener noreferrer">

Contact Us
</a>
</button>



</div>



</div>



</div>



</section>

);

}