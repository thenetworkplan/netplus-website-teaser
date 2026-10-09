import Image from "next/image";
import { Fragment } from "react";
import logo from "@/public/logo.png";

/**
 * "NetPlus" with the logo mark standing in for the N; its arrow sweeps over "et".
 * Sized in em, so it scales with whatever text it sits in.
 */
export function Wordmark({ gold = true, className = "" }: { gold?: boolean; className?: string }) {
  return (
    <span className={`whitespace-nowrap ${className}`}>
      <span className="sr-only">NetPlus</span>
      <span aria-hidden>
        <Image
          src={logo}
          alt=""
          sizes="120px"
          className="relative inline-block w-auto max-w-none align-baseline"
          style={{
            height: "1.5em",
            top: "0.12em",
            marginLeft: "-0.06em",
            marginRight: "-0.5em",
            // Keep the tall mark from pushing the line height open
            marginTop: "-0.75em",
          }}
        />
        <span>et</span>
        <span className={gold ? "text-gold-gradient" : undefined}>Plus</span>
      </span>
    </span>
  );
}

/** Renders text with every "NetPlus" replaced by the wordmark. */
export function Brand({ text, gold = true }: { text: string; gold?: boolean }) {
  const parts = text.split("NetPlus");
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && <Wordmark gold={gold} />}
        </Fragment>
      ))}
    </>
  );
}
