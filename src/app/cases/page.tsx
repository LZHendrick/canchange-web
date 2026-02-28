'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Building2, TrendingUp, Users, Zap } from 'lucide-react';

const cases = [
  {
    id: 1,
    company: '科创未来',
    industry: 'SaaS 软件',
    logo: 'KC',
    challenge: '销售团队人手不足，线索跟进不及时',
    solution: '部署 CGO + CHO 双 AI 高管',
    results: [
      '获客成本降低 60%',
      '招聘周期缩短 75%',
      '销售转化率提升 40%',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    company: '品质生活',
    industry: '电商零售',
    logo: 'PZ',
    challenge: '多平台运营繁琐，合规风险高',
    solution: '部署 COO + CLO 双 AI 高管',
    results: [
      '运营效率提升 300%',
      '合规审查时间减少 90%',
      '人效比提升 4 倍',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    company: '智造工坊',
    industry: '智能制造',
    logo: 'ZZ',
    challenge: '供应链管理复杂，人才招聘困难',
    solution: '部署全套 4 位 AI 高管',
    results: [
      '供应链成本降低 25%',
      '高端人才入职率提升 50%',
      '年节省人力成本 200 万+',
    ],
    color: 'from-orange-500 to-amber-500',
  },
];

const stats = [
  { value: '300+', label: '企业客户', icon: Building2 },
  { value: '60%', label: '平均成本降低', icon: TrendingUp },
  { value: '4 位', label: 'AI 高管团队', icon: Users },
  { value: '24/7', label: '全天候在线', icon: Zap },
];

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-4 lg:px-8 max-w-7xl">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-orange-400 mb-4 tracking-wider">CUSTOMER STORIES</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-zinc-100 mb-6">
              客户成功案例
            </h1>
            <p className="text-zinc-400 text-lg">
              超过 300 家企业选择灿橙·小熊猫，
              用 AI 自动化团队驱动业务增长
            </p>
          </motion.div>
          
          {/* 统计数据 */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800"
              >
                <stat.icon className="w-6 h-6 text-orange-400 mx-auto mb-3" />
                <p className="text-3xl font-bold text-zinc-100 mb-1">{stat.value}</p>
                <p className="text-sm text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* 案例列表 */}
      <section className="py-16 lg:py-24 border-t border-zinc-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="space-y-8">
            {cases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative p-8 lg:p-10 rounded-3xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all">
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    {/* Logo & 公司信息 */}
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${caseItem.color} flex items-center justify-center text-white font-bold text-xl`}>
                          {caseItem.logo}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-zinc-100">{caseItem.company}</h3>
                          <p className="text-sm text-zinc-500">{caseItem.industry}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* 挑战与方案 */}
                    <div className="lg:col-span-4 space-y-3">
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">挑战</p>
                        <p className="text-zinc-300">{caseItem.challenge}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">方案</p>
                        <p className="text-zinc-300">{caseItem.solution}</p>
                      </div>
                    </div>
                    
                    {/* 成果 */}
                    <div className="lg:col-span-4">
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">成果</p>
                      <ul className="space-y-2">
                        {caseItem.results.map((result, i) => (
                          <li key={i} className="flex items-center gap-2 text-zinc-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* 箭头 */}
                    <div className="lg:col-span-1 flex justify-end">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                        <ArrowRight className="w-5 h-5 text-zinc-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-24 border-t border-zinc-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-zinc-100 mb-6">
            成为下一个成功案例
          </h2>
          <p className="text-zinc-400 mb-10">
            预约专属演示，了解灿橙·小熊猫如何为您的企业创造价值
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/configurator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-xl hover:from-orange-400 hover:to-amber-500 transition-all shadow-lg shadow-orange-500/20"
            >
              开始配置
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-zinc-300 border border-zinc-800 rounded-xl hover:bg-zinc-900 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
