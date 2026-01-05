"use client";

import { useId, useState, cloneElement, isValidElement } from "react";
import { ChevronDownFilledIcon } from "../Accordion/icons";

type AccordionRootProps = {
  className?: string;
  children: React.ReactNode;
};

export function AccordionRoot({ children, className }: AccordionRootProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  function toggleItem(id: string) {
    setActiveItem((current) => (current === id ? null : id));
  }

  const enhancedChildren = Array.isArray(children)
    ? children.map((child, index) =>
        isValidElement(child)
          ? cloneElement(child as React.ReactElement<any>, {
              itemId: String(index), // pass index as stable id
              activeItem,
              toggleItem,
            })
          : child
      )
    : isValidElement(children)
    ? cloneElement(children as React.ReactElement<any>, { itemId: "0", activeItem, toggleItem })
    : children;

  return <div className={className}>{enhancedChildren}</div>;
}

type AccordionItemProps = {
  children: React.ReactNode;
  className?: string;
  itemId?: string;
  activeItem?: string | null;
  toggleItem?: (id: string) => void;
};

export function AccordionItem({
  children,
  className,
  itemId,
  activeItem,
  toggleItem,
}: AccordionItemProps) {
  const triggerId = useId();
  const contentId = useId();

  const isOpen = activeItem === itemId;
  const dataState = isOpen ? "open" : "closed";

  const enhancedChildren = Array.isArray(children)
    ? children.map((child) =>
        isValidElement(child)
          ? cloneElement(child as React.ReactElement<any>, {
              triggerId,
              contentId,
              dataState,
              toggleItem,
              itemId,
              isOpen,
            })
          : child
      )
    : isValidElement(children)
    ? cloneElement(children as React.ReactElement<any>, {
        triggerId,
        contentId,
        dataState,
        toggleItem,
        itemId,
        isOpen,
      })
    : children;

  return (
    <div data-state={dataState} className={className}>
      {enhancedChildren}
    </div>
  );
}

type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string;
  triggerId?: string;
  contentId?: string;
  dataState?: "open" | "closed";
  toggleItem?: (id: string) => void;
  itemId?: string;
  isOpen?: boolean;
};

export function AccordionTrigger({
  children,
  className,
  triggerId,
  contentId,
  dataState,
  toggleItem,
  itemId,
  isOpen,
}: AccordionTriggerProps) {
  if (!triggerId || !contentId || !itemId) return null;

  return (
    <h3>
      <button
        type="button"
        id={triggerId}
        aria-controls={contentId}
        aria-expanded={isOpen}
        data-state={dataState}
        className={className}
        onClick={() => toggleItem?.(itemId)}
      >
        {children}
      </button>
    </h3>
  );
}

type AccordionContentProps = {
  children: React.ReactNode;
  className?: string;
  triggerId?: string;
  contentId?: string;
  dataState?: "open" | "closed";
  isOpen?: boolean;
};

export function AccordionContent({
  children,
  className,
  triggerId,
  contentId,
  dataState,
  isOpen,
}: AccordionContentProps) {
  if (!triggerId || !contentId) return null;

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      data-state={dataState}
      className={className}
      hidden={!isOpen}
    >
      {isOpen && children}
    </div>
  );
}
