'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Order } from '@org/shared-types';
import { useAuth } from '../../context/AuthContext';
import { fetchOrders } from '../../lib/api';
import { TEXT } from '../../lib/text';
import { OrderRow } from '../../components/orders/OrderRow';
import { OrderSummaryModal } from '../../components/orders/OrderSummaryModal';

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Order | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!user) {
      router.replace('/');
      return;
    }
    let active = true;
    fetchOrders()
      .then(data => { if (active) setOrders(data); })
      .catch(() => { if (active) setOrders([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [user, router]);

  // Return null until mounted so server and client first-render both produce null.
  if (!mounted) return null;
  if (!user) return null;

  return (
    <main className="epicure-order-history">
      <div className="epicure-order-history__inner">
        <h1 className="epicure-order-history__title">{TEXT.orders.pageTitle}</h1>
        {loading ? (
          <div className="epicure-order-history__loading" />
        ) : orders.length === 0 ? (
          <p className="epicure-order-history__empty">{TEXT.orders.empty}</p>
        ) : (
          <div className="epicure-order-history__list">
            {orders.map(order => (
              <OrderRow key={order.id} order={order} onSelect={setSelected} />
            ))}
          </div>
        )}
        {selected && <OrderSummaryModal order={selected} onClose={() => setSelected(null)} />}
      </div>
    </main>
  );
}
