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

            <h1 className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#f3eadf]">
            {title}
        </h1>

        {description ? (
                <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-[#9b948b]">
            {description}
            </p>
        ) : null}
        </div>
    );
}