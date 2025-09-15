interface Product { id: string; name: string; sold: number; revenue: number; stock: number }
function ProductList({ products }: { products: Product[] }) {
return (
<div className="bg-white p-5 rounded-2xl shadow-sm border h-full">
<div className="flex items-center justify-between mb-4">
<h3 className="font-semibold">Recent Orders</h3>
<a className="text-sm text-slate-500">View All</a>
</div>


<div className="space-y-3">
{products.map(p => (
<div key={p.id} className="p-3 rounded-lg bg-slate-50 flex items-center justify-between">
<div>
<div className="font-medium">{p.name}</div>
<div className="text-sm text-slate-500">{p.sold} sold · Rwf {p.revenue.toLocaleString()}</div>
</div>
<div className="text-sm px-3 py-1 rounded-full bg-rose-100 text-rose-600">{p.stock} in stock</div>
</div>
))}
</div>
</div>
);
}