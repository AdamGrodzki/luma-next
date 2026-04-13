type Props = {
    title: string;
    description: string;
    };

    export default function EmptyState({ title, description }: Props) {
    return (
        <div className="rounded-[22px] border border-[var(--border-default)] bg-[var(--bg-darker)] p-8">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">{title}</h2>
            <p className="mt-4 text-[var(--text-secondary)]">{description}</p>
        </div>
    );
}