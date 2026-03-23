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
        className="space-y-8 rounded-[28px] border border-[#1d1a17] bg-[#070707] px-6 py-10 md:px-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#f6efe7] md:text-5xl">
          Analiza Wartości Rynkowej
        </h2>
        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#b8966e]">
          Dane z ostatnich 10 zarejestrowanych aukcji rynkowych
        </p>
      </div>

      <div className="rounded-[24px] border border-[#2b241d] bg-[#0d0d0d] p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="text-2xl font-bold text-[#f6efe7]">
                  Wycena Rynkowa
                </span>
                <span className="rounded-md border border-[#3d2d1b] px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[#c79b63]">
                  Mockup
                </span>
              </div>

              <div className="border-l-2 border-[#c79b63] pl-4">
                <div className="text-[11px] uppercase tracking-[0.25em] text-[#7d6c5c]">
                  Średnia wartość
                </div>
                <div className="mt-2 text-5xl font-black text-[#f6efe7]">
                  {market.average} {market.currency}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <div className="text-[11px] uppercase tracking-[0.25em] text-[#7d6c5c]">
                  Najwyższa
                </div>
                <div className="mt-2 text-2xl font-bold text-[#f6efe7]">
                  {market.max} {market.currency}
                </div>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-[0.25em] text-[#7d6c5c]">
                  Najniższa
                </div>
                <div className="mt-2 text-2xl font-bold text-[#f6efe7]">
                  {market.min} {market.currency}
                </div>
              </div>
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={market.history}>
                <CartesianGrid stroke="#201a14" vertical={false} />
                <XAxis dataKey="label" stroke="#8a7765" />
                <YAxis stroke="#8a7765" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0b0b0b",
                    border: "1px solid #3a2d21",
                    borderRadius: "12px",
                    color: "#f6efe7",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#c7a06b"
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