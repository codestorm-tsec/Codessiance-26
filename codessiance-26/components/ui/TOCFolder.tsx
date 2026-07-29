"use client";

import { useState } from "react";

interface TOCFolderProps {
  items: { label: string; href: string }[];
  className?: string;
  maxWidth?: string; // e.g. "578px"
}

export default function TOCFolder({ 
  items, 
  className = "", 
  maxWidth = "578px" 
}: TOCFolderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`folder-outer relative w-full mx-auto lg:mx-0 cursor-pointer select-none transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${className}`}
      style={{ maxWidth, height: isOpen ? '540px' : '180px' }}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* 1. BACK FLAP (rises up with contents, has left tab "CONTENTS") */}
      <div 
        className="back-flap absolute bottom-0 left-0 w-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10 flex flex-col"
        style={{
          height: isOpen ? '540px' : '180px',
        }}
      >
        {/* Back Flap Background Shape (solid purple, left tab elevated) */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
          <BackFlapSVG />
        </div>

        {/* Contents Text positioned on the left tab */}
        <div className="relative z-10 h-[52px] pl-7 flex items-center shrink-0">
          <span 
            className="text-xl md:text-2xl font-black uppercase tracking-wider text-[#232323]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Contents
          </span>
        </div>

        {/* Nested White Card containing links */}
        <div 
          className="relative z-10 flex-grow px-4 pb-4 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            maxHeight: isOpen ? '460px' : '0px',
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'auto' : 'none',
          }}
        >
          <div className="bg-[#EFEFEA] border-2 border-[#232323] rounded-[18px] p-6 h-full">
            <ul className="contents-list vertical-list flex flex-col divide-y-[1.5px] divide-[#232323]">
              {items.map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item.href} 
                    className="block py-2 text-lg md:text-xl font-black text-[#232323] hover:text-[#9691FF] transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 2. FRONT FLAP (stays fixed at bottom, has concentric circles, right tab elevated) */}
      <div 
        className="front-flap absolute bottom-0 left-0 w-full h-[180px] z-20 pointer-events-none overflow-hidden"
      >
        <FrontFlapSVG />
      </div>
    </div>
  );
}

// ==========================================
// SVG Shapes for Back and Front Flaps
// ==========================================

function BackFlapSVG() {
  // Left tab is elevated (y=1.5), Right side is lower (y=51.5)
  const folderShape = "M560.5 51.5C569.337 51.5 576.5 44.3366 576.5 35.5V803.5C576.5 812.337 569.337 819.5 560.5 819.5H17.5C8.66344 819.5 1.5 812.337 1.5 803.5V17.5C1.5 8.66344 8.66344 1.5 17.5 1.5H295.579C305.49 1.5 313.626 9.08755 314.5 18.7705V35.5C314.5 44.3366 321.663 51.5 330.5 51.5H560.5Z";

  return (
    <svg 
      viewBox="0 0 578 821" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-full h-full drop-shadow-sm"
      preserveAspectRatio="xMidYMin slice"
    >
      <path d={folderShape} fill="#9691FF" stroke="#232323" strokeWidth="3" />
    </svg>
  );
}

function FrontFlapSVG() {
  // Right tab is elevated (y=1.5), Left side is lower (y=51.5)
  const folderShape = "M560.5 1.5C569.337 1.5 576.5 8.66345 576.5 17.5V803.5C576.5 812.337 569.337 819.5 560.5 819.5H17.5C8.66344 819.5 1.5 812.337 1.5 803.5V67.5C1.5 58.6634 8.66344 51.5 17.5 51.5H295.579C305.49 51.4999 313.626 43.9124 314.5 34.2295V17.5C314.5 8.66344 321.663 1.5 330.5 1.5H560.5Z";

  return (
    <svg 
      viewBox="0 0 578 821" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-full h-full"
      preserveAspectRatio="xMidYMin slice"
    >
      {/* Folder Fill */}
      <path d={folderShape} fill="#9691FF" />
      
      {/* Mask for Concentric Circles */}
      <mask id="front-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="578" height="821">
        <path d={folderShape} fill="#FFFFFF" />
      </mask>
      
      {/* Concentric Circles Pattern */}
      <g mask="url(#front-mask)">
        <path d="M282.587 419.772C270.297 419.772 260.333 410.727 260.333 399.57C260.333 388.412 270.297 379.368 282.587 379.368C294.878 379.368 304.841 388.412 304.841 399.57C304.841 410.727 294.878 419.772 282.587 419.772Z" stroke="#232323" strokeWidth="19.2247" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M282.587 453.068C250.04 453.068 223.656 429.117 223.656 399.571C223.656 370.025 250.04 346.073 282.587 346.073C315.134 346.073 341.518 370.025 341.518 399.571C341.518 429.117 315.134 453.068 282.587 453.068Z" stroke="#232323" strokeWidth="19.2247" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M282.586 486.369C229.779 486.369 186.97 447.508 186.97 399.57C186.97 351.632 229.779 312.77 282.586 312.77C335.393 312.77 378.201 351.632 378.201 399.57C378.201 447.508 335.393 486.369 282.586 486.369Z" stroke="#232323" strokeWidth="19.2247" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M282.586 519.666C209.523 519.666 150.293 465.897 150.293 399.571C150.293 333.244 209.523 279.475 282.586 279.475C355.649 279.475 414.878 333.244 414.878 399.571C414.878 465.897 355.649 519.666 282.586 519.666Z" stroke="#232323" strokeWidth="19.2247" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M282.586 552.962C189.267 552.962 113.616 484.287 113.616 399.572C113.616 314.856 189.267 246.181 282.586 246.181C375.906 246.181 451.556 314.856 451.556 399.572C451.556 484.287 375.906 552.962 282.586 552.962Z" stroke="#232323" strokeWidth="19.2247" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M282.586 586.255C169.01 586.255 76.939 502.673 76.939 399.569C76.939 296.464 169.01 212.882 282.586 212.882C396.162 212.882 488.233 296.464 488.233 399.569C488.233 502.673 396.162 586.255 282.586 586.255Z" stroke="#232323" strokeWidth="19.2247" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M282.586 619.56C148.75 619.56 40.2544 521.068 40.2544 399.572C40.2544 278.075 148.75 179.583 282.586 179.583C416.422 179.583 524.917 278.075 524.917 399.572C524.917 521.068 416.422 619.56 282.586 619.56Z" stroke="#232323" strokeWidth="19.2247" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M282.586 652.852C128.494 652.852 3.57721 539.453 3.57721 399.568C3.57721 259.684 128.494 146.284 282.586 146.284C436.678 146.284 561.594 259.684 561.594 399.568C561.594 539.453 436.678 652.852 282.586 652.852Z" stroke="#232323" strokeWidth="19.2247" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M282.585 686.149C108.237 686.149 -33.101 557.843 -33.101 399.569C-33.101 241.296 108.237 112.99 282.585 112.99C456.933 112.99 598.271 241.296 598.271 399.569C598.271 557.843 456.933 686.149 282.585 686.149Z" stroke="#232323" strokeWidth="19.2247" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M282.587 719.454C87.9785 719.454 -69.7829 576.238 -69.7829 399.573C-69.7829 222.907 87.9785 79.6912 282.587 79.6912C477.196 79.6912 634.957 222.907 634.957 399.573C634.957 576.238 477.196 719.454 282.587 719.454Z" stroke="#232323" strokeWidth="19.2247" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M282.587 752.747C67.7223 752.747 -106.46 594.624 -106.46 399.57C-106.46 204.515 67.7223 46.3926 282.587 46.3926C497.452 46.3926 671.635 204.515 671.635 399.57C671.635 594.624 497.452 752.747 282.587 752.747Z" stroke="#232323" strokeWidth="19.2247" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M282.586 786.043C47.4648 786.043 -143.139 613.013 -143.139 399.57C-143.139 186.127 47.4648 13.0977 282.586 13.0977C517.707 13.0977 708.311 186.127 708.311 399.57C708.311 613.013 517.707 786.043 282.586 786.043Z" stroke="#232323" strokeWidth="19.2247" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M282.586 819.344C27.2045 819.344 -179.823 631.405 -179.823 399.569C-179.823 167.734 27.2045 -20.2051 282.586 -20.2051C537.967 -20.2051 744.995 167.734 744.995 399.569C744.995 631.405 537.967 819.344 282.586 819.344Z" stroke="#232323" strokeWidth="19.2247" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M282.586 852.64C6.94843 852.64 -216.5 649.794 -216.5 399.57C-216.5 149.346 6.94843 -53.5 282.586 -53.5C558.224 -53.5 781.672 149.346 781.672 399.57C781.672 649.794 558.224 852.64 282.586 852.64Z" stroke="#232323" strokeWidth="19.2247" strokeLinecap="round" strokeLinejoin="round"></path>
      </g>
      
      {/* Outer border line matching exact tab curves */}
      <path d={folderShape} fill="none" stroke="#232323" strokeWidth="3" />
    </svg>
  );
}
