"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CameraDetailData } from "./types";

type Props = {
  camera: CameraDetailData;
};

export function CameraMarketValue({ camera }: Props) {
  const market = camera.marketValue;

  return (
    <section  
        id="market"
      className="space-y-8 rounded-[28px] border border-[var(--border-light)] bg-[var(--bg-darker)] px-6 py-10 md:px-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-5xl">
          Analiza Wartości Rynkowej
        </h2>
        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
          Dane z ostatnich 10 zarejestrowanych aukcji rynkowych
        </p>
      </div>

      <div className="rounded-[24px] border border-[var(--border-light)] bg-[var(--bg-dark)] p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="text-2xl font-bold text-[var(--text-primary)]">
                  Wycena Rynkowa
                </span>
                <span className="rounded-md border border-[var(--border-light)] px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--accent-primary)]">
                  Mockup
                </span>
              </div>

              <div className="border-l-2 border-[var(--accent-primary)] pl-4">
                <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                  Średnia wartość
                </div>
                <div className="mt-2 text-5xl font-black text-[var(--text-primary)]">
                  {market.average} {market.currency}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                  Najwyższa
                </div>
                <div className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
                  {market.max} {market.currency}
                </div>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                  Najniższa
                </div>
                <div className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
                  {market.min} {market.currency}
                </div>
              </div>
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={market.history}>
                <CartesianGrid stroke="var(--border-light)" vertical={false} />
                <XAxis dataKey="label" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-dark)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "12px",
                    color: "var(--text-primary)",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="var(--accent-primary)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}