"use client";

import { useState, useId } from "react";
import { FaChevronDown } from "react-icons/fa";

interface AccordionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Accordion = ({ title, icon, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item bg-base-200 border border-base-300 rounded-lg">
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={handleToggle}
        className="w-full text-left px-6 py-4 text-base font-medium hover:bg-base-300 focus-visible:bg-base-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200 flex items-center cursor-pointer"
      >
        <div className="flex items-center gap-3 flex-1">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{title}</span>
        </div>
        <FaChevronDown
          className={`w-5 h-5 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4">{children}</div>
      </div>
    </div>
  );
};
