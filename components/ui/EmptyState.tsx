type Props = {
    title: string;
    description: string;
    };

    export default function EmptyState({ title, description }: Props) {
    return (
        <div className="rounded-[22px] border border-[#1f1a14] bg-[#050607] p-8">
        <h2 className="text-2xl font-semibold text-[#f3eadf]">{title}</h2>
        <p className="mt-4 text-[#b9b0a5]">{description}</p>
        </div>
    );
}