import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ChefsGrid } from '../../components/ChefsGrid';
import { TEXT } from '../../lib/text';

export default function ChefsPage() {
  return (
    <div>
      <Header />
      <main className="epicure-chefs-main">
        <h1 className="epicure-chefs-page-title">{TEXT.shared.chefs}</h1>
        <ChefsGrid />
      </main>
      <Footer />
    </div>
  );
}
