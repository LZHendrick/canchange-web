'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Lightbulb, Shield, Target, Award, X, ChevronRight, Lock, Sparkles } from 'lucide-react';

// 专利/资质证书数据 - 使用占位符图标而非实际图片，避免部署问题
const certificates = [
  { id: 1, title: 'AI 业务流程自动化引擎专利', number: 'CN2024XXXXXX.X', date: '2024.03' },
  { id: 2, title: '多 Agent 协同调度系统专利', number: 'CN2024XXXXXX.Y', date: '2024.06' },
  { id: 3, title: '企业级本地隐私计算方案', number: 'CN2024XXXXXX.Z', date: '2024.09' },
  { id: 4, title: 'ISO 27001 信息安全认证', number: 'ISO27001-2024', date: '2024.12' },
];

// Lightbox 组件 - 使用图标代替图片，确保部署时无资源依赖
function Lightbox({ isOpen, onClose, cert }: { isOpen: boolean; onClose: () => void; cert: typeof certificates[0] | null }) {
  const shouldReduceMotion = useReducedMotion();
  if (!cert) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50" 
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
          />
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4" 
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="relative max-w-3xl w-full bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">
              <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700">
                <X className="w-5 h-5 text-zinc-400" />
              </button>
              <div className="grid md:grid-cols-2">
                <div className="aspect-square bg-zinc-800/50 flex items-center justify-center p-8">
                  <div className="w-full h-full border-2 border-dashed border-zinc-700 rounded-2xl flex flex-col items-center justify-center text-zinc-600">
                    <Award className="w-16 h-16 mb-4" />
                    <p className="text-sm">{cert.number}</p>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium mb-4 w-fit">
                    <Award className="w-3.5 h-3.5" /> 发明专利
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-100 mb-4">{cert.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-zinc-500">证书编号</span><span className="text-zinc-300 font-mono">{cert.number}</span></div>
                    <div className="flex justify-between"><span className="text-zinc-500">颁发日期</span><span className="text-zinc-300">{cert.date}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function AboutPage() {
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const openLightbox = (cert: typeof certificates[0]) => {
    setSelectedCert(cert);
    setLightboxOpen(true);
  };

  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Hero - 品牌愿景 */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-radial from-orange-600/10 via-transparent to-transparent blur-3xl" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <motion.div 
            className="max-w-4xl" 
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 mb-8">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-zinc-300">企业 AI 转型的合伙人</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-zinc-100 mb-8 leading-tight">
              科技赋能
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">让改变发生</span>
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
              灿橙 CanChange 不是一家 SaaS 公司。我们是企业 AI 转型的合伙人，
              基于 OpenClaude 等开源前沿架构，将您积累数十年的业务 SOP 转化为数字员工的执行本能。
            </p>
          </motion.div>
        </div>
      </section>

      {/* 核心优势 */}
      <section className="py-20 border-t border-zinc-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <motion.div 
            className="text-center mb-16" 
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-zinc-100 mb-4">核心优势</h2>
            <p className="text-zinc-400">Apple 硬件私有化 + 顶级业务 SOP 注入</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Apple 硬件私有化 */}
            <motion.div 
              className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800" 
              initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center mb-6">
                <Lock className="w-7 h-7 text-zinc-300" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-100 mb-4">Apple 硬件私有化部署</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                基于 Apple Silicon 的 Neural Engine，31.2 TOPS 算力本地推理。数据完全不出户，满足金融、医疗、政务等高合规场景。
              </p>
              <ul className="space-y-3">
                {['Secure Enclave 硬件级加密', '本地化大模型推理', '7×24 小时静音运行'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />{item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* 业务 SOP 注入 */}
            <motion.div 
              className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800" 
              initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-100 mb-4">顶级业务 SOP 注入</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                我们将 SPIN 销售法、LSCPA 异议处理等顶级业务方法论编码为 AI 的执行逻辑，让每一次客户交互都严格遵循您的最佳实践。
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'SPIN 销售法', desc: '情境-问题-暗示-成交' },
                  { title: 'LSCPA 异议处理', desc: '倾听-分担-澄清-陈述' },
                  { title: 'RFM 客户分层', desc: '实时计算客户价值' },
                  { title: 'PDCA 流程优化', desc: '持续改进执行策略' },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-zinc-800/50">
                    <h4 className="font-semibold text-zinc-200 text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-zinc-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 愿景宣言 */}
      <section className="py-24 bg-zinc-900/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-center">
          <Lightbulb className="w-12 h-12 text-orange-400 mx-auto mb-6" />
          {['让每一家中小企业', '都拥有属于自己的', '首席级 AI 团队'].map((line, index) => (
            <motion.p
              key={index}
              className={`text-3xl lg:text-5xl font-bold mb-4 ${index === 2 ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500' : 'text-zinc-300'}`}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.2 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </section>

      {/* 灿橙实验室 - 资质证书 */}
      <section className="py-24 border-t border-zinc-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <motion.div 
            className="text-center mb-16" 
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-zinc-100 mb-4">灿橙实验室</h2>
            <p className="text-zinc-400">核心技术专利与资质认证</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="group cursor-pointer"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.1 }}
                onClick={() => openLightbox(cert)}
              >
                <div className="relative p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/50 transition-all">
                  <div className="aspect-[4/3] rounded-xl bg-zinc-800/50 border border-dashed border-zinc-700 flex flex-col items-center justify-center mb-4 group-hover:border-orange-500/30">
                    <Award className="w-10 h-10 text-zinc-600 group-hover:text-orange-400 transition-colors" />
                    <p className="text-xs text-zinc-500 mt-2">点击查看</p>
                  </div>
                  <h3 className="font-semibold text-zinc-200 mb-2 text-sm line-clamp-1">{cert.title}</h3>
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span className="font-mono">{cert.number}</span>
                    <span>{cert.date}</span>
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
          <h2 className="text-3xl font-bold text-zinc-100 mb-6">准备好与 CanChange 合作了吗？</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/configurator" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-xl hover:from-orange-400 hover:to-amber-500 transition-all">
              配置您的 AI 团队<ChevronRight className="w-5 h-5" />
            </Link>
            <Link href="/cases" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-zinc-300 border border-zinc-800 rounded-xl hover:bg-zinc-900">
              查看成功案例
            </Link>
          </div>
        </div>
      </section>

      <Lightbox isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} cert={selectedCert} />
    </main>
  );
}
