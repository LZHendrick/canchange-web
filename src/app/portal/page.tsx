'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import Link from 'next/link';
import { Users, Briefcase, GitBranch, Shield, Battery, Zap, CheckCircle2, X, CreditCard, ChevronRight, AlertTriangle, Activity } from 'lucide-react';

// 数字滚动动画组件
function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsub = spring.on('change', (latest: number) => {
      if (ref.current) ref.current.textContent = Math.round(latest).toLocaleString();
    });
    return unsub;
  }, [spring]);

  return <span ref={ref}>0</span>;
}

// Toast 通知
function Toast({ message, isVisible, onClose }: { message: string; isVisible: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div className="fixed top-24 left-1/2 -translate-x-1/2 z-50" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
          <div className="flex items-center gap-3 px-6 py-4 bg-zinc-900 border border-green-500/30 rounded-2xl shadow-2xl">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-white font-medium">{message}</p>
              <p className="text-zinc-500 text-sm">Token 已充值到您的主机</p>
            </div>
            <button onClick={onClose} className="ml-4 p-1 hover:bg-zinc-800 rounded"><X className="w-4 h-4 text-zinc-400" /></button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// 支付模态框
function PaymentModal({ isOpen, onClose, pkg, onSuccess }: { isOpen: boolean; onClose: () => void; pkg: typeof tokenPackages[0] | null; onSuccess: () => void }) {
  const [processing, setProcessing] = useState(false);

  if (!isOpen || !pkg) return null;

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onClose();
      onSuccess();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
        <div className="relative w-full max-w-md bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <h3 className="text-xl font-bold text-zinc-100">确认支付</h3>
            <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full"><X className="w-5 h-5 text-zinc-400" /></button>
          </div>
          <div className="p-6">
            <div className="text-center mb-6">
              <p className="text-zinc-400 mb-2">{pkg.name}</p>
              <p className="text-4xl font-bold text-white">{pkg.price}</p>
              <p className="text-zinc-500 text-sm mt-1">{pkg.tokens} Token · 有效期 {pkg.period}</p>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-zinc-700 flex items-center justify-center"><Zap className="w-5 h-5 text-amber-400" /></div>
                <div><p className="text-zinc-200 font-medium">小熊猫主机</p><p className="text-zinc-500 text-sm">XPB-2024-8888</p></div>
              </div>
            </div>
            <button
              onClick={handlePay}
              disabled={processing}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? (
                <><motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />处理中...</>
              ) : (
                <><CreditCard className="w-5 h-5" />立即支付</>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// 资产数据
const myEmployees = [
  { id: 'cgo', name: 'CGO', title: 'AI 首席增长官', status: 'running', tasks: 128, efficiency: '98%', lastActive: '2 分钟前', color: 'from-orange-500 to-red-500', icon: Users },
  { id: 'cho', name: 'CHO', title: 'AI 首席人才官', status: 'running', tasks: 45, efficiency: '99%', lastActive: '刚刚', color: 'from-blue-500 to-cyan-500', icon: Briefcase },
  { id: 'coo', name: 'COO', title: 'AI 全域运营官', status: 'idle', tasks: 0, efficiency: '-', lastActive: '未雇佣', color: 'from-purple-500 to-emerald-500', icon: GitBranch },
  { id: 'clo', name: 'CLO', title: 'AI 首席合规官', status: 'idle', tasks: 0, efficiency: '-', lastActive: '未雇佣', color: 'from-zinc-700 to-amber-500', icon: Shield },
];

// Token 套餐
const tokenPackages = [
  { id: 'basic', name: '基础续航包', tokens: '100万', price: '¥999', priceValue: 999, period: '30天', features: ['适合初期试用', '基础算力保障', '邮件技术支持'], recommended: false },
  { id: 'pro', name: '进阶加速包', tokens: '600万', price: '¥4,999', priceValue: 4999, period: '90天', features: ['SOP 优先更新', '优先算力调度', '专属客服通道'], recommended: true },
  { id: 'enterprise', name: '企业无限包', tokens: '3000万', price: '¥19,990', priceValue: 19990, period: '365天', features: ['独占算力资源', '1对1 技术顾问', '7×24 专属服务'], recommended: false },
];

export default function PortalPage() {
  const [balance, setBalance] = useState(2450000);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [paymentModal, setPaymentModal] = useState({ open: false, pkg: null as typeof tokenPackages[0] | null });

  const handlePurchase = (pkg: typeof tokenPackages[0]) => {
    setPaymentModal({ open: true, pkg });
  };

  const handlePaymentSuccess = () => {
    const pkg = paymentModal.pkg;
    if (pkg) {
      const tokens = pkg.id === 'basic' ? 1000000 : pkg.id === 'pro' ? 6000000 : 30000000;
      setBalance(prev => prev + tokens);
      setToast({ visible: true, message: `成功购买 ${pkg.name}` });
      setTimeout(() => setToast({ visible: false, message: '' }), 3000);
    }
  };

  const balancePercent = Math.min((balance / 5000000) * 100, 100);
  const isLowBalance = balancePercent < 20;

  return (
    <main className="min-h-screen bg-zinc-950 pb-24">
      <Toast message={toast.message} isVisible={toast.visible} onClose={() => setToast({ visible: false, message: '' })} />
      <PaymentModal isOpen={paymentModal.open} onClose={() => setPaymentModal({ open: false, pkg: null })} pkg={paymentModal.pkg} onSuccess={handlePaymentSuccess} />

      {/* 页面标题 */}
      <section className="py-8 border-b border-zinc-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-100">CanChange 算力补给站</h1>
              <p className="text-zinc-500 text-sm mt-1">管理您的小熊猫 AI 主机与数字员工</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-sm">
              <motion.div className="w-2 h-2 rounded-full bg-green-500" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              系统正常运行
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* 左侧列 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 资产看板 */}
              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-zinc-800 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-zinc-100">我的数字员工</h3>
                  <Link href="/configurator" className="px-4 py-2 text-sm font-medium text-orange-400 bg-orange-500/10 rounded-lg hover:bg-orange-500/20">雇佣更多</Link>
                </div>
                <div className="grid gap-4">
                  {myEmployees.map((emp, index) => {
                    const Icon = emp.icon;
                    const isRunning = emp.status === 'running';
                    return (
                      <motion.div key={emp.id} className={`flex items-center gap-4 p-4 rounded-2xl ${isRunning ? 'bg-zinc-800/50 border border-zinc-700/50' : 'bg-zinc-900/30 border border-zinc-800/30 opacity-60'}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${emp.color} flex items-center justify-center`}><Icon className="w-6 h-6 text-white" /></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-zinc-200">{emp.title}</h4>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${isRunning ? 'bg-green-500/10 text-green-400' : 'bg-zinc-700 text-zinc-500'}`}>{isRunning ? '运行中' : '未雇佣'}</span>
                          </div>
                          <p className="text-sm text-zinc-500">{emp.name}</p>
                        </div>
                        {isRunning && (
                          <div className="hidden sm:flex items-center gap-6 text-sm">
                            <div className="text-right"><p className="text-zinc-400 text-xs">今日任务</p><p className="text-zinc-200 font-medium">{emp.tasks}</p></div>
                            <div className="text-right"><p className="text-zinc-400 text-xs">效率</p><p className="text-green-400 font-medium">{emp.efficiency}</p></div>
                          </div>
                        )}
                        <motion.div className="w-2 h-2 rounded-full" animate={isRunning ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] } : {}} transition={{ duration: 2, repeat: Infinity }}>
                          <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500' : 'bg-zinc-600'}`} />
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Token 补给站 */}
              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-zinc-800 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center"><Battery className="w-5 h-5 text-white" /></div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-100">Token 补给站</h3>
                    <p className="text-sm text-zinc-500">主机 ID: XPB-2024-8888</p>
                  </div>
                </div>

                {/* Token 余额进度条 */}
                <div className="mb-8 p-4 bg-zinc-800/30 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-400">当前 Token 余额</span>
                    <span className="text-2xl font-bold text-zinc-100"><AnimatedNumber value={balance} /></span>
                  </div>
                  <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div className={`h-full rounded-full ${isLowBalance ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-orange-500 to-amber-500'}`} initial={{ width: 0 }} animate={{ width: `${balancePercent}%` }} transition={{ duration: 1 }} />
                  </div>
                  {isLowBalance && (
                    <div className="flex items-center gap-2 mt-2 text-orange-400 text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      <span>余额不足 20%，建议立即充值</span>
                    </div>
                  )}
                </div>

                {/* 套餐选择 */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {tokenPackages.map((pkg) => (
                    <motion.div key={pkg.id} className={`relative p-5 rounded-2xl border-2 cursor-pointer ${pkg.recommended ? 'bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-500/30' : 'bg-zinc-800/30 border-zinc-700 hover:border-zinc-600'}`} whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} onClick={() => handlePurchase(pkg)}>
                      {pkg.recommended && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs font-bold rounded-full">推荐</div>}
                      <div className="text-center mb-4">
                        <h4 className="font-semibold text-zinc-200">{pkg.name}</h4>
                        <div className="mt-3 mb-2">
                          <span className="text-3xl font-bold text-white">{pkg.tokens}</span>
                          <span className="text-sm text-zinc-500 ml-1">Token</span>
                        </div>
                        <p className="text-xs text-zinc-500">有效期 {pkg.period}</p>
                      </div>
                      <ul className="space-y-2 mb-5">
                        {pkg.features.map((f) => (<li key={f} className="flex items-center gap-2 text-xs text-zinc-400"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />{f}</li>))}
                      </ul>
                      <button className={`w-full py-3 rounded-xl font-semibold ${pkg.recommended ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white' : 'bg-zinc-700 text-zinc-200'}`}>{pkg.price} 充值</button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* 右侧列 - 主机状态 + 能效报告 */}
            <div className="space-y-6">
              {/* 主机状态 */}
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm rounded-3xl border border-zinc-700/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center"><Zap className="w-5 h-5 text-amber-400" /></div>
                    <div><h3 className="font-semibold text-zinc-200">小熊猫主机</h3><p className="text-xs text-zinc-500">XPB-2024-8888</p></div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full">
                    <motion.div className="w-2 h-2 rounded-full bg-green-500" animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                    <span className="text-xs text-green-400">在线</span>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-zinc-500">今日消耗</span><span className="text-orange-400 font-medium">128,500</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">运行时长</span><span className="text-zinc-200 font-medium">716 小时</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">NPU 温度</span><span className="text-zinc-200 font-medium">42°C</span></div>
                </div>
              </div>

              {/* 能效报告 */}
              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-zinc-800 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center"><Activity className="w-5 h-5 text-orange-400" /></div>
                  <div><h3 className="font-semibold text-zinc-200">本月能效报告</h3><p className="text-xs text-zinc-500">AI 员工产出统计</p></div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: '风险拦截', value: 47, unit: '次', color: 'bg-green-500' },
                    { label: '询盘截流', value: 128, unit: '个', color: 'bg-blue-500' },
                    { label: '简历筛选', value: 356, unit: '份', color: 'bg-purple-500' },
                    { label: '合同审查', value: 89, unit: '份', color: 'bg-amber-500' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-zinc-400">{stat.label}</span>
                        <span className="text-zinc-200 font-medium">{stat.value} {stat.unit}</span>
                      </div>
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div className={`h-full ${stat.color} rounded-full`} initial={{ width: 0 }} animate={{ width: `${(stat.value / 400) * 100}%` }} transition={{ duration: 1, delay: 0.3 }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-zinc-800/30 rounded-xl">
                  <p className="text-sm text-zinc-400">本月累计节省人力成本</p>
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">¥ 42,580</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 底部提示 */}
      <section className="py-8 border-t border-zinc-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
            <div className="flex items-center gap-6">
              <span>服务等级协议 SLA 99.99%</span>
              <span>企业专属客户成功经理</span>
              <span>1 小时紧急响应</span>
            </div>
            <Link href="#" className="text-orange-400 hover:text-orange-300 flex items-center gap-1">需要帮助？联系技术支持 <ChevronRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
