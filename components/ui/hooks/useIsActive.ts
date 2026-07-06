export function useIsActive(pathname: string | null, href: string): boolean {
  return pathname === href || pathname?.startsWith(href + '/') || false;
}
