
import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  BarChart3, 
  Activity, 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowUpRight, 
  ArrowDownRight,
  DollarSign,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Button } from './Button';

const data = [
  { name: 'Jan', users: 4000, revenue: 2400, cost: 400 },
  { name: 'Feb', users: 3000, revenue: 1398, cost: 300 },
  { name: 'Mar', users: 2000, revenue: 9800, cost: 1200 },
  { name: 'Apr', users: 2780, revenue: 3908, cost: 500 },
  { name: 'May', users: 1890, revenue: 4800, cost: 600 },
  { name: 'Jun', users: 2390, revenue: 3800, cost: 450 },
  { name: 'Jul', users: 3490, revenue: 4300, cost: 550 },
];

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'payments' | 'api'>('overview');

  const stats = [
    { label: 'Total Users', value: '12,482', change: '+12%', trend: 'up', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Monthly Revenue', value: '₦4.2M', change: '+18%', trend: 'up', icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'API Costs', value: '₦185K', change: '-4%', trend: 'down', icon: Activity, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Active Sessions', value: '1,204', change: '+5%', trend: 'up', icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const users = [
    { id: 1, name: 'Amina Yusuf', email: 'amina@example.com', plan: 'Pro', status: 'Active', joined: '2024-01-15' },
    { id: 2, name: 'Chidi Okafor', email: 'chidi@example.com', plan: 'Free', status: 'Inactive', joined: '2024-02-10' },
    { id: 3, name: 'Babatunde Ade', email: 'baba@example.com', plan: 'Team', status: 'Active', joined: '2023-11-20' },
    { id: 4, name: 'Fatima Bello', email: 'fatima@example.com', plan: 'Pro', status: 'Active', joined: '2024-03-01' },
    { id: 5, name: 'Emeka John', email: 'emeka@example.com', plan: 'Free', status: 'Active', joined: '2024-02-28' },
  ];

  const payments = [
    { id: 'TXN-001', user: 'Amina Yusuf', amount: '₦15,000', status: 'Successful', date: '2024-03-25 10:30' },
    { id: 'TXN-002', user: 'Babatunde Ade', amount: '₦65,000', status: 'Successful', date: '2024-03-24 14:15' },
    { id: 'TXN-003', user: 'Fatima Bello', amount: '₦15,000', status: 'Failed', date: '2024-03-24 09:45' },
    { id: 'TXN-004', user: 'Unknown', amount: '₦15,000', status: 'Successful', date: '2024-03-23 16:20' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-indigo-950">Admin Dashboard</h1>
          <p className="text-indigo-400 font-medium">Manage your platform's growth and operations.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">Download Report</Button>
          <Button variant="primary" size="sm">System Status</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-indigo-50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center text-xs font-black ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-black text-indigo-950">{stat.value}</div>
            <div className="text-xs font-bold text-indigo-300 uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-indigo-50 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'payments', label: 'Payments', icon: CreditCard },
          { id: 'api', label: 'API Costs', icon: Activity },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center px-6 py-4 text-sm font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-indigo-300 hover:text-indigo-600'
            }`}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[40px] border border-indigo-50 shadow-sm">
              <h3 className="text-xl font-black text-indigo-950 mb-6">Revenue Growth</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-indigo-50 shadow-sm">
              <h3 className="text-xl font-black text-indigo-950 mb-6">User Acquisition</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    />
                    <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff'}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-[40px] border border-indigo-50 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-indigo-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300" />
                <input 
                  type="text" 
                  placeholder="Search users by name or email..." 
                  className="w-full pl-11 pr-4 py-2.5 bg-indigo-50/30 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all text-sm font-bold"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
                <Button variant="primary" size="sm">Add User</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-indigo-50/30 text-indigo-300 text-[10px] font-black uppercase tracking-widest">
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Plan</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Joined</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-50">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-indigo-50/10 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mr-3 font-black text-indigo-600">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-black text-indigo-950">{user.name}</div>
                            <div className="text-xs text-indigo-400 font-medium">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                          user.plan === 'Team' ? 'bg-purple-100 text-purple-600' : 
                          user.plan === 'Pro' ? 'bg-indigo-100 text-indigo-600' : 
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {user.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                          <span className="text-sm font-bold text-indigo-950">{user.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-indigo-400">{user.joined}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-indigo-300 hover:text-indigo-600 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="bg-white rounded-[40px] border border-indigo-50 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-indigo-50">
               <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-indigo-950">Recent Transactions</h3>
                 <Button variant="outline" size="sm">View All</Button>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Success Rate</div>
                    <div className="text-2xl font-black text-emerald-700">98.2%</div>
                 </div>
                 <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                    <div className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Failed Payments</div>
                    <div className="text-2xl font-black text-red-700">12</div>
                 </div>
                 <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Avg Ticket</div>
                    <div className="text-2xl font-black text-indigo-700">₦24,500</div>
                 </div>
               </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-indigo-50/30 text-indigo-300 text-[10px] font-black uppercase tracking-widest">
                    <th className="px-6 py-4">Transaction ID</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-50">
                  {payments.map((txn) => (
                    <tr key={txn.id} className="hover:bg-indigo-50/10 transition-colors">
                      <td className="px-6 py-4 text-sm font-black text-indigo-950">{txn.id}</td>
                      <td className="px-6 py-4 text-sm font-bold text-indigo-600">{txn.user}</td>
                      <td className="px-6 py-4 text-sm font-black text-indigo-950">{txn.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                          txn.status === 'Successful' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {txn.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-indigo-400">{txn.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-indigo-50 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-indigo-950">API Usage (Tokens)</h3>
                  <select className="bg-indigo-50 border-none rounded-xl px-4 py-2 text-sm font-bold outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                      <Tooltip />
                      <Area type="monotone" dataKey="cost" stroke="#f59e0b" fill="#fef3c7" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-indigo-950 p-8 rounded-[40px] text-white flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <ShieldCheck className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-black mb-2">Cost Optimization</h3>
                  <p className="text-indigo-200 text-sm font-medium leading-relaxed">
                    Your current token usage is within the optimal range. We recommend enabling caching for repetitive Hausa translations to save up to 15% on costs.
                  </p>
                </div>
                <div className="mt-8">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2">
                    <span>Budget Limit</span>
                    <span>₦185k / ₦500k</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{width: '37%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 p-6 rounded-[32px] flex items-start gap-4">
               <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
               <div>
                 <h4 className="text-lg font-black text-amber-900">High Usage Alert</h4>
                 <p className="text-amber-700 font-medium text-sm mt-1">
                   The "Malam Richie" tutor has seen a 40% spike in usage over the last 24 hours. Consider reviewing the prompt complexity if costs continue to rise.
                 </p>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
