"use client";

import { useActionState } from "react";
import { signIn, type ActionState } from "../actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    signIn,
    undefined,
  );

  return (
    <div className="flex min-h-screen flex-1 items-center justify-center px-4 py-12">
      <div className="nb-card w-full max-w-sm p-6 sm:p-8">
        <h1 className="headline-gradient font-display text-2xl font-extrabold uppercase">
          Admin Login
        </h1>
        <p className="mt-1 mb-6 text-sm text-[var(--ink)]/70">
          Masuk untuk mengedit halaman MPLS.
        </p>

        {!isSupabaseConfigured && (
          <div className="mb-4 rounded-lg border-2 border-[var(--ink)] bg-[var(--gold)]/40 px-3 py-2 text-xs font-semibold text-[var(--ink)]">
            Supabase belum dikonfigurasi. Isi <code>NEXT_PUBLIC_SUPABASE_URL</code>{" "}
            dan <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> di{" "}
            <code>.env.local</code>.
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="mb-1 block font-mono text-xs font-bold uppercase tracking-widest text-[var(--gold-deep)]">
              Email
            </label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg border-2 border-[var(--ink)] bg-white px-3 py-2 text-sm text-[var(--ink)] outline-none focus:border-[var(--gold-deep)]"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs font-bold uppercase tracking-widest text-[var(--gold-deep)]">
              Password
            </label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border-2 border-[var(--ink)] bg-white px-3 py-2 text-sm text-[var(--ink)] outline-none focus:border-[var(--gold-deep)]"
            />
          </div>

          {state?.error && (
            <p className="rounded-lg border-2 border-red-700 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="link-btn w-full rounded-xl border-[3px] border-[var(--ink)] bg-[var(--ink)] px-4 py-3 font-mono text-sm font-bold uppercase text-[#fffdf5] nb-shadow disabled:opacity-60"
          >
            {pending ? "Memproses…" : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
