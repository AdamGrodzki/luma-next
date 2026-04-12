/**
 * Utility funkcje do stylów i tailwind klas
 */

/**
 * Kombinuje tailwind klasy z warunkami (prosty clsx zamiennik)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Responsywne klasy - powtarzające się pattern'y
 */
export const responsive = {
  // Padding
  paddingX: "px-4 sm:px-6 lg:px-8",
  paddingY: "py-8 sm:py-12 md:py-16",
  paddingAll: "p-4 sm:p-5 md:p-6",

  // Gappy
  gapSmall: "gap-3 sm:gap-4 md:gap-5",
  gapMedium: "gap-4 sm:gap-5 md:gap-6",
  gapLarge: "gap-6 sm:gap-8 md:gap-10",

  // Text sizing
  textSm: "text-xs sm:text-sm md:text-base",
  textBase: "text-sm sm:text-base md:text-lg",
  textLg: "text-lg sm:text-xl md:text-2xl",
  textXl: "text-2xl sm:text-3xl md:text-4xl",
  text2xl: "text-3xl sm:text-4xl md:text-5xl",
  text3xl: "text-4xl sm:text-5xl md:text-6xl",

  // Radius
  rounded: "rounded-lg sm:rounded-xl md:rounded-2xl",
  roundedLarge: "rounded-xl sm:rounded-2xl md:rounded-3xl",

  // Grid kolumny
  gridAuto: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  gridDuo: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3",
} as const;

/**
 * Powtarzające się style componenty
 */
export const styles = {
  // Card container
  cardContainer: cn(
    "rounded-lg sm:rounded-[24px]",
    "border border-[#221b14]",
    "bg-[#0a0c0e]",
    "p-4 sm:p-5 md:p-6",
    "transition hover:border-[#6b573f] hover:bg-[#0d1012]"
  ),

  // Image container
  imageContainer: "overflow-hidden rounded-lg sm:rounded-[18px] border border-[#1f1a14] bg-[#0f1113]",

  // Button primary
  buttonPrimary: cn(
    "rounded-full border border-[#8e6a47]",
    "px-4 sm:px-6 py-2.5 sm:py-3",
    "text-xs sm:text-sm uppercase tracking-[0.14em]",
    "text-[#f3eadf]",
    "transition hover:bg-[#141210]"
  ),

  // Button secondary
  buttonSecondary: cn(
    "rounded-full border border-[#2e241a]",
    "px-4 sm:px-6 py-2.5 sm:py-3",
    "text-xs sm:text-sm uppercase tracking-[0.14em]",
    "text-[#cbb9a5]",
    "transition hover:border-[#6b573f]"
  ),

  // Section container
  sectionContainer: cn(
    "rounded-lg sm:rounded-[24px]",
    "border border-[#1f1914]",
    "bg-[linear-gradient(180deg,#080808_0%,#060606_100%)]",
    "px-4 sm:px-5 md:px-8",
    "py-6 sm:py-8 md:py-10 xl:py-12"
  ),
} as const;
