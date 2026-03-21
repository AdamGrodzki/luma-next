type Props = {
    children: React.ReactNode;
    };

    export default function Badge({ children }: Props) {
    return (
        <span className="rounded-full border border-[#3a2d20] bg-[#131517] px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#d2b08b]">
        {children}
        </span>
    );
}