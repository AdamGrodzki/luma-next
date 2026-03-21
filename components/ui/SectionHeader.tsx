type Props = {
    eyebrow?: string;
    title: string;
    description?: string;
    };

    export default function SectionHeader({ eyebrow, title, description }: Props) {
    return (
        <div className="max-w-2xl">
        {eyebrow ? (
            <p className="text-xs uppercase tracking-[0.22em] text-[#a98b68]">
            {eyebrow}
            </p>
        ) : null}

        <h1 className="mt-3 text-4xl font-serif text-[#f3eadf] md:text-5xl">
            {title}
        </h1>

        {description ? (
            <p className="mt-4 text-base leading-7 text-[#9b948b]">
            {description}
            </p>
        ) : null}
        </div>
    );
}