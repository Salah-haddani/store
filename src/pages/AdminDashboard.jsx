import React from "react";
import MainLayout from "../layout/MainLayout";
import {
  DollarSign,
  ShoppingCart,
  Menu,
  Users,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DASHBOARD_METRICS = [
  {
    title: "Total Sales",
    value: "$45,231",
    change: "+12.5%",
    isPositive: true,
    iconColor: "text-actionPrimary",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "895",
    change: "+5.1%",
    isPositive: true,
    iconColor: "text-red-500",
    icon: ShoppingCart,
  },
  {
    title: "Popular Categories",
    value: "Men",
    change: "45%",
    isPositive: true,
    iconColor: "text-yellow-500",
    icon: Menu,
  },
  {
    title: "Visitors Today",
    value: "1,200",
    change: "+20.3%",
    isPositive: true,
    iconColor: "text-green-500",
    icon: Users,
  },
];

const SALES_DATA = [
  { name: "Jan", Sales: 4000 },
  { name: "Feb", Sales: 3000 },
  { name: "Mar", Sales: 2000 },
  { name: "Apr", Sales: 2780 },
  { name: "May", Sales: 1890 },
  { name: "Jun", Sales: 2390 },
];

const TOP_PRODUCTS = [
  {
    rank: 1,
    name: "Eco-Sport Trainer",
    category: "Men",
    unitsSold: 150,
    revenue: 14998.5,
  },
  {
    rank: 2,
    name: "Vintage Denim Jacket",
    category: "Women",
    unitsSold: 120,
    revenue: 14400.0,
  },
  {
    rank: 3,
    name: "Leather Wallet",
    category: "Accessories",
    unitsSold: 90,
    revenue: 4050.0,
  },
  {
    rank: 4,
    name: "Graphic Tee",
    category: "Kids",
    unitsSold: 75,
    revenue: 1912.5,
  },
];

const MetricCard = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  iconColor,
}) => {
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const changeColor = isPositive ? "text-green-500" : "text-red-500";

  return (
    <div className="card-base p-6 flex justify-between items-center bg-white">
      <div>
        <p className="overline mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-textDark mb-2">{value}</h3>
        <div className="flex items-center text-sm">
          <TrendIcon className={`w-4 h-4 mr-1 ${changeColor}`} />
          <span className={`font-semibold ${changeColor}`}>{change}</span>
          <span className="text-softGray3 ml-1">vs last period</span>
        </div>
      </div>
      <div className={`p-3 rounded-full ${iconColor} bg-sidebarBg`}>
        <Icon className="w-8 h-8" />
      </div>
    </div>
  );
};

const SalesChart = () => (
  <div className="card-base p-6 bg-white h-96">
    <h3 className="h3 mb-6 text-textDark border-b border-softGray2/70 pb-2">
      Monthly Sales Overview
    </h3>
    <ResponsiveContainer width="100%" height="80%">
      <BarChart
        data={SALES_DATA}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
          labelStyle={{ fontWeight: "bold", color: "#0F172A" }}
          formatter={(value) => [`$${value.toLocaleString()}`, "Sales"]}
        />
        <Bar
          dataKey="Sales"
          fill="#00B4AE"
          radius={[4, 4, 0, 0]}
          activeBar={{ fill: "#00C7C1" }}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const TopProductsTable = () => (
  <div className="card-base p-6 bg-white">
    <h3 className="h3 mb-4 text-textDark border-b border-softGray2/70 pb-2">
      Top Selling Products
    </h3>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-softGray2">
        <thead className="bg-softGray1">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-textDark uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-textDark uppercase tracking-wider">
              Product Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-textDark uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-textDark uppercase tracking-wider">
              Units Sold
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-textDark uppercase tracking-wider">
              Revenue
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-softGray1">
          {TOP_PRODUCTS.map((product) => (
            <tr
              key={product.rank}
              className="hover:bg-softGray1 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-softGray3">
                {product.rank}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-textDark">
                {product.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-softGray3">
                {product.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-textDark">
                {product.unitsSold}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-actionPrimary">
                ${product.revenue.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-textDark mb-6">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DASHBOARD_METRICS.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>

          <div className="lg:col-span-1">
            <TopProductsTable />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
