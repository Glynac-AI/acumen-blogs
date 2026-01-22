interface FeedSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export function FeedSection({ title, description, children }: FeedSectionProps) {
    return (
        <section className="mb-12">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#0B1F3B] mb-2">{title}</h2>
                {description && (
                    <p className="text-gray-600">{description}</p>
                )}
            </div>
            <div className="space-y-3">
                {children}
            </div>
        </section>
    );
}
