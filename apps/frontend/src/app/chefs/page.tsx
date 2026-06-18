import { ChefsGrid } from '../../components/ChefsGrid';
import { TEXT } from '../../lib/text';

export default async function ChefsPage({
  searchParams,
}: {
  searchParams: Promise<{ highlight?: string }>;
}) {
  const { highlight } = await searchParams;
  const highlightId = highlight ? parseInt(highlight, 10) : undefined;
  return (
    <div>
      <main className="epicure-chefs-main">
        <h1 className="epicure-chefs-page-title">{TEXT.shared.chefs}</h1>
        <ChefsGrid initialHighlight={highlightId} />
      </main>
    </div>
  );
}
