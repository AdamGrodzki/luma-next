import Link from "next/link";

type Props = {
  brandName: string;
  totalCount: number;
  brandSlug?: string;
};

export default function CollectionHeader({
  brandName,
  totalCount,
  brandSlug,
}: Props) {
  return (
    <div className="flex flex-col gap-5 border-b border-[#1d1813] pb-7 md:flex-row md:items-start md:justify-between">
      <div className="flex items-center gap-6">
        <div className="flex h-20 w-[230px] items-center justify-center rounded-md bg-white px-6 shadow-md">
          <span className="text-5xl font-bold italic tracking-tight text-[#cf0d15] md:text-6xl">
            {brandName}
          </span>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#c99f6a]">
            O producencie →
          </div>
          <div className="mt-1 text-xl text-[#e9e0d7]">
            Znaleziono {totalCount} modeli
          </div>
        </div>
      </div>

      <Link
        href={brandSlug ? `/brands/${brandSlug}` : "/brands"}
        className="rounded-full border border-[#3b3024] px-4 py-2 text-center text-xs uppercase tracking-[0.16em] text-[#d7c7b3] hover:border-[#8e6a47] hover:text-white"
      >
        Zobacz profil marki
      </Link>
    </div>
  );
}