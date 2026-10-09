"use client";

import { useActionState } from "react";
import { subscribe, type NotifyState } from "./actions";
import { useT } from "./i18n";

const initialState: NotifyState = { status: "idle", message: "" };

export function NotifyForm({
  id = "email",
  align = "center",
}: {
  id?: string;
  align?: "center" | "start";
}) {
  const [state, formAction, pending] = useActionState(subscribe, initialState);
  const t = useT().form;

  return (
    <div className={`flex w-full flex-col gap-3 ${align === "center" ? "items-center" : "items-start"}`}>
      <form
        action={formAction}
        className="flex w-full max-w-md items-center rounded-full border border-white/25 bg-navy/70 p-1.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md"
      >
        <span className="hidden shrink-0 pl-5 pr-4 text-sm font-medium text-white sm:block">
          {t.lead}
        </span>
        <span className="hidden h-6 w-px bg-white/20 sm:block" aria-hidden />
        <label htmlFor={id} className="sr-only">
          {t.label}
        </label>
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t.placeholder}
          disabled={pending || state.status === "success"}
          className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm font-medium text-white placeholder:text-white/60 focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending || state.status === "success"}
          aria-label={t.submit}
          className="bg-gold-gradient flex size-10 shrink-0 items-center justify-center rounded-full text-navy transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light disabled:opacity-70"
        >
          {pending ? (
            <span className="size-4 animate-spin rounded-full border-2 border-navy/30 border-t-navy" />
          ) : state.status === "success" ? (
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </form>

      <p
        aria-live="polite"
        className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] ${
          state.status === "error"
            ? "text-red-600 dark:text-red-300"
            : state.status === "success"
              ? "text-accent"
              : "text-ink/70"
        }`}
      >
        {state.status === "idle" ? (
          <>
            <svg viewBox="0 0 24 24" className="size-3.5 text-gold" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <rect x="5" y="11" width="14" height="9" rx="1.5" />
              <path d="M8 11V8a4 4 0 018 0v3" />
            </svg>
            {t.confidential}
          </>
        ) : (
          state.status === "error" ? t.invalid : t.success
        )}
      </p>
    </div>
  );
}
