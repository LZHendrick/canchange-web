'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Cat, ArrowRight } from 'lucide-react';

/**
 * CanChange 首页 Hero Banner
 * 雇佣你的第一支 AI 自动化团队
 */

// 4个全息数字人浮层配置
const hologramAvatars = [
  {
    id: 'cgo',
    name: 'CGO',
    role: '增长官',
    position: 'top-[15%] left-[20%]',
    color: 'from-orange-500 to-red-500',
    delay: 0,
  },
  {
    id: 'cho',
    name: 'CHO',
    role: '人才官',
    position: 'top-[10%] right-[25%]',
    color: 'from-blue-500 to-cyan-500',
    delay: 0.2,
  },
  {
    id: 'coo',
    name: 'COO',
    role: '运营官',
    position: 'bottom-[20%] left-[15%]',
    color: 'from-purple-500 to-emerald-500',
    delay: 0.4,
  },
  {
    id: 'clo',
    name: 'CLO',
    role: '合规官',
    position: 'bottom-[15%] right-[20%]',
    color: 'from-zinc-700 to-amber-500',
    delay: 0.6,
  },
];

// 硬件设备组件
function HardwareDevice() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72">
      {/* 外发光 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-amber-500/20 rounded-full blur-3xl" />
      
      {/* 硬件主体 */}
      <motion.div
        className="relative w-full h-full"
        animate={shouldReduceMotion ? { y: 0 } : { y: [0, -8, 0] }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* 设备外壳 - 黑色哑光质感 */}
        <div className="absolute inset-0 rounded-3xl bg-zinc-900 shadow-2xl overflow-hidden">
          {/* 哑光纹理 */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 30%, #3f3f46 1px, transparent 1px)`,
              backgroundSize: '6px 6px',
            }}
          />
          
          {/* 金属边框 */}
          <div className="absolute inset-0 rounded-3xl border border-zinc-700/50" />
          <div className="absolute inset-[1px] rounded-3xl border border-zinc-800" />
          
          {/* 顶部高光 */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
          <div className="absolute top-1 left-4 right-4 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
          
          {/* 品牌标识区域 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {/* Logo - 小熊猫 */}
              <motion.div
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg border-2 border-white/20"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              >
                {/* 熊猫耳朵和脸 */}
                <div className="relative">
                  <Cat className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
                  {/* 熊猫耳朵 */}
                  <div className="absolute -top-1 -left-0.5 w-2.5 h-2.5 bg-white rounded-full opacity-90" />
                  <div className="absolute -top-1 -right-0.5 w-2.5 h-2.5 bg-white rounded-full opacity-90" />
                </div>
              </motion.div>
              
              {/* 品牌名 */}
              <h3 className="text-zinc-200 font-bold text-base sm:text-lg tracking-tight">小熊猫</h3>
              <p className="text-zinc-500 text-xs tracking-wider">CanChange</p>
              <p className="text-zinc-600 text-[10px] mt-1">AI 企业主机</p>
            </div>
          </div>
          
          {/* 状态指示灯 */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-green-500"
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0.3, 1] }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity }}
            />
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Online</span>
          </div>
          
          {/* 底部装饰线 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-zinc-800 rounded-full" />
        </div>
        
        {/* 底部阴影 */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 sm:w-40 h-6 bg-black/40 blur-2xl rounded-full" />
      </motion.div>
    </div>
  );
}

// 全息数字人浮层
function HologramAvatar({ avatar }: { avatar: typeof hologramAvatars[0] }) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      className={`absolute ${avatar.position} z-20 hidden sm:block`}
      initial={shouldReduceMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: avatar.delay, ease: 'easeOut' }}
    >
      <motion.div
        className="relative"
        animate={shouldReduceMotion ? { y: 0 } : { y: [0, -10, 0] }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: avatar.delay }}
      >
        {/* 全息卡片 */}
        <div className={`
          relative px-3 sm:px-4 py-2 sm:py-3 rounded-xl backdrop-blur-md
          bg-gradient-to-br ${avatar.color} bg-opacity-10
          border border-white/10
          shadow-lg
        `}>
          {/* 发光效果 */}
          <div className={`
            absolute inset-0 rounded-xl bg-gradient-to-br ${avatar.color} opacity-20 blur-md
          `} />
          
          {/* 内容 */}
          <div className="relative flex items-center gap-2 sm:gap-3">
            {/* 头像占位 */}
            <div className={`
              w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${avatar.color} 
              flex items-center justify-center text-white font-bold text-xs sm:text-sm
              shadow-inner
            `}>
              {avatar.name.charAt(0)}
            </div>
            <div>
              <p className="text-white font-semibold text-xs sm:text-sm">{avatar.name}</p>
              <p className="text-white/60 text-[10px] sm:text-xs">{avatar.role}</p>
            </div>
          </div>
          
          {/* 扫描线效果 */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute inset-0 rounded-xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: avatar.delay }}
            >
              <div className="w-full h-px bg-white/30 absolute top-1/2 -translate-y-1/2" />
            </motion.div>
          )}
        </div>
        
        {/* 连接光束 */}
        {!shouldReduceMotion && (
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none"
            style={{ zIndex: -1 }}
          >
            <motion.line
              x1="50%"
              y1="50%"
              x2={avatar.position.includes('left') ? '100%' : '0%'}
              y2={avatar.position.includes('top') ? '100%' : '0%'}
              stroke="url(#beamGradient)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, delay: avatar.delay + 0.3 }}
            />
            <defs>
              <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <section className="relative min-h-screen bg-zinc-950 overflow-hidden">
      {/* 背景光影效果 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-gradient-radial from-blue-600/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-gradient-radial from-amber-600/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-radial from-indigo-600/5 via-transparent to-transparent blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* 主内容区 */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl min-h-screen flex flex-col justify-center py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-8 items-center">
          {/* 左侧：文案 */}
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1"
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8 }}
          >
            {/* 标签 */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 sm:mb-6 rounded-full bg-zinc-900/80 border border-zinc-800"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-zinc-400 font-medium">AI 企业主机已就绪</span>
            </motion.div>

            {/* 主标题 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-6">
              <span className="text-zinc-100">雇佣你的</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
                第一支 AI 自动化团队
              </span>
            </h1>

            {/* 副标题 */}
            <p className="text-zinc-400 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              灿橙·小熊猫 AI 企业主机，内置 4 位 24 小时在线的 AI 高管，
              从获客到合规，全流程自动化运营。
            </p>

            {/* CTA 按钮 */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link href="/configurator">
                <motion.button
                  className="relative px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-base sm:text-lg rounded-2xl shadow-lg shadow-orange-500/25 overflow-hidden group"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    立即雇佣
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  
                  {!shouldReduceMotion && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-white/50"
                      animate={{ 
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.02, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>

              <Link href="/cases">
                <motion.button
                  className="px-6 sm:px-8 py-3.5 sm:py-4 text-zinc-300 font-medium text-base sm:text-lg rounded-2xl border border-zinc-800 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  查看客户案例
                </motion.button>
              </Link>
            </div>

            {/* 信任指标 */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-8 sm:mt-10 text-xs sm:text-sm text-zinc-500"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span>本地化部署</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>数据不出户</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>7×24 小时在线</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 右侧：视觉展示 */}
          <motion.div
            className="relative flex items-center justify-center order-1 lg:order-2"
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-sm sm:max-w-lg aspect-square">
              {/* 4个全息数字人浮层 - 仅在桌面端显示 */}
              {hologramAvatars.map((avatar) => (
                <HologramAvatar key={avatar.id} avatar={avatar} />
              ))}
              
              {/* 中心硬件设备 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <HardwareDevice />
              </div>
              
              {/* 装饰光环 */}
              {!shouldReduceMotion && (
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                >
                  <svg viewBox="0 0 400 400" className="w-full h-full opacity-20">
                    <circle
                      cx="200"
                      cy="200"
                      r="190"
                      fill="none"
                      stroke="url(#heroRing)"
                      strokeWidth="1"
                      strokeDasharray="20 40"
                    />
                    <defs>
                      <linearGradient id="heroRing" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 底部渐变过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}
