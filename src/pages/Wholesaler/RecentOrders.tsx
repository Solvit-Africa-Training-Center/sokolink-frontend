interface Order { id: string; code: string; status: 'Processing' | 'Shipped' | 'Delivering'; store: string; date: string; items: number; amount: number }
function RecentOrders({ orders }: { orders: Order[] }) {
return (
<div className="bg-white p-5 rounded-2xl shadow-sm border h-full">
<div className="flex items-center justify-between mb-4">
<h3 className="font-semibold">Recent Orders</h3>
<a className="text-sm text-slate-500">View All</a>
</div>


<div className="space-y-3">
{orders.map(o => (
<div key={o.id} className="p-3 rounded-lg bg-slate-50 flex items-start justify-between">
<div>
<div className="flex items-center gap-2">
<div className="text-sm font-medium">{o.code}</div>
<div className={`text-xs px-2 py-0.5 rounded-full ${o.status === 'Shipped' ? 'bg-rose-100 text-rose-600' : o.status === 'Processing' ? 'bg-amber-100 text-amber-700' : 'bg-teal-100 text-teal-700'}`}>{o.status}</div>
</div>
<div className="text-sm text-slate-500 mt-1">{o.store} · {o.date} · {o.items} items · Rwf {o.amount.toLocaleString()}</div>
</div>
<div className="text-sm text-slate-400">View</div>
</div>
))}
</div>
</div>
);
}