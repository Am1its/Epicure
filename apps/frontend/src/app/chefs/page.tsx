import { ChefsGrid } from '../../components/ChefsGrid';
import { TEXT } from '../../lib/text';

export default function ChefsPage() {
  return (
    <div>
      <main className="epicure-chefs-main">
        <h1 className="epicure-chefs-page-title">{TEXT.shared.chefs}</h1>
        <ChefsGrid />
      </main>
    </div>
  );
}
