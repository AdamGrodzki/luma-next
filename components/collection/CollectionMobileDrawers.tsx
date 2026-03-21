"use client";

import { useState } from "react";
import BrandSidebar from "./BrandSidebar";
import FilterSidebar from "./FilterSidebar";
import type { CollectionBrand } from "./types";

type Props = {
  brands: CollectionBrand[];
  activeBrandName: string;
  totalCount: number;
  sensorFilters: string[];
  typeFilters: string[];
  activeBrandSlug?: string;
  activeSensor?: string;
  activeType?: string;
  activeQuery?: string;
  activeYearFrom?: number;
  activeYearTo?: number;
};

type DrawerProps = {
  side: "left" | "right";
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function Drawer({ side, title, open, onClose, children }: DrawerProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 z-50 h-full w-[88vw] max-w-[380px] transition duration-300 ${
          side === "left" ? "left-0" : "right-0"
        } ${
          open
            ? "translate-x-0"
            : side === "left"
              ? "-translate-x-full"
              : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col bg-[#040607] p-4 shadow-2xl">
          <div className="mb-4 flex items-center justify-between border-b border-[#2a231c] pb-4">
            <h2 className="text-sm uppercase tracking-[0.18em] text-[#d7c7b3]">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#3b3024] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#d7c7b3]"
            >
              Zamknij
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </>
  );
}

export default function CollectionMobileDrawers({
  brands,
  activeBrandName,
  totalCount,
  sensorFilters,
  typeFilters,
  activeBrandSlug,
  activeSensor,
  activeType,
  activeQuery,
  activeYearFrom,
  activeYearTo,
}: Props) {
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between rounded-2xl border border-[#182027] bg-[#071015] px-4 py-3 xl:hidden">
        <button
          type="button"
          onClick={() => setBrandsOpen(true)}
          className="rounded-full border border-[#3b3024] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#d7c7b3]"
        >
          Marki
        </button>

        <div className="text-center text-sm uppercase tracking-[0.18em] text-[#bfae97]">
          {activeBrandName} • {totalCount} modeli
        </div>

        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="rounded-full border border-[#3b3024] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#d7c7b3]"
        >
          Filtry
        </button>
      </div>

      <Drawer
        side="left"
        title="Marki"
        open={brandsOpen}
        onClose={() => setBrandsOpen(false)}
      >
        <BrandSidebar
          brands={brands}
          activeSensor={activeSensor}
          activeType={activeType}
          activeQuery={activeQuery}
          activeYearFrom={activeYearFrom}
          activeYearTo={activeYearTo}
        />
      </Drawer>

      <Drawer
        side="right"
        title="Filtry"
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
      >
        <FilterSidebar
          sensorFilters={sensorFilters}
          typeFilters={typeFilters}
          activeBrandSlug={activeBrandSlug}
          activeSensor={activeSensor}
          activeType={activeType}
          activeQuery={activeQuery}
          activeYearFrom={activeYearFrom}
          activeYearTo={activeYearTo}
        />
      </Drawer>
    </>
  );
}