'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Hero } from '@/components/landing/Hero';
import { 
  ArrowRight, 
  Play, 
  X, 
  TrendingUp, 
  Users, 
  Clock, 
  Shield, 
  Zap,
  Target,
  Award,
  Cpu
} from 'lucide-react';

// ============================================
// 数字员工数据 - 精英人才卡
// ============================================
const eliteBots = [
  {
    id: 'marketing',
    name: 'Alex Chen',
    title: '营销增长 Bot',
    role: 'CGO',
    metric: { value: '+300%', label: '营收增长', trend: 'up' },
    color: 'from-orange-500 via-red-500 to-pink-500',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    accentColor: '#f97316',
    bgGradient: 'bg-gradient-to-br from-orange-500/20 via-red-500/10 to-transparent',
    skills: [95, 88, 75, 92, 90, 85],
    description: '全网自动分发 + 询盘截流，7×24小时监控竞品动态',
    achievements: ['单月获客 10,000+', '转化率提升 300%', 'SEO 霸屏 50+ 关键词'],
  },
  {
    id: 'hr',
    name: 'Sarah Wu',
    title: '人事人才 Bot',
    role: 'CHO',
    metric: { value: '-90%', label: '招聘周期', trend: 'down' },
    color: 'from-blue-500 via-cyan-500 to-teal-500',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    accentColor: '#3b82f6',
    bgGradient: 'bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent',
    skills: [92, 95, 88, 85, 78, 92],
    description: 'AI 简历透视 + 智能面试，精准匹配岗位需求',
    achievements: ['简历筛选 10,000+', '面试通过率 85%', '人才库激活 5,000+'],
  },
  {
    id: 'operation',
    name: 'Mike Liu',
    title: '全域运营 Bot',
    role: 'COO',
    metric: { value: '99%', label: '流程自动化', trend: 'up' },
    color: 'from-purple-500 via-violet-500 to-fuchsia-500',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    accentColor: '#a855f7',
    bgGradient: 'bg-gradient-to-br from-purple-500/20 via-violet-500/10 to-transparent',
    skills: [88, 90, 82, 95, 85, 88],
    description: '打通 100+ 业务系统，智能编排跨平台工作流',
    achievements: ['流程自动化 99%', '异常拦截 1,200+', '跨平台协同 50+'],
  },
  {
    id: 'legal',
    name: 'Emma Zhang',
    title: '法务合规 Bot',
    role: 'CLO',
    metric: { value: '100%', label: '风险拦截', trend: 'up' },
    color: 'from-amber-500 via-yellow-500 to-orange-400',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    accentColor: '#f59e0b',
    bgGradient: 'bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-transparent',
    skills: [98, 85, 98, 92, 75, 95],
    description: '毫秒级合同审查 + 动态风险预警，合规无忧',
    achievements: ['合同审查 5,000+', '风险预警 800+', '法规更新实时同步'],
  },
];

const skillLabels = ['专业度', '响应速度', '合规性', '执行力', '创新力', '稳定性'];

// ============================================
// 动画配置 - 支持 Reduced Motion
// ============================================
function useAnimationConfig() {
  const shouldReduceMotion = useReducedMotion();
  
  return {
    // 完全禁用动画
    instant: { duration: 0 },
    // 快速淡入（无障碍友好）
    fadeIn: shouldReduceMotion ? { duration: 0 } : { duration: 0.5 },
    // 标准进入动画
    enter: shouldReduceMotion 
      ? { duration: 0 } 
      : { duration: 0.5, ease: 'easeOut' as const },
    // 弹性动画
    spring: shouldReduceMotion 
      ? { duration: 0 } 
      : { type: 'spring' as const, damping: 25, stiffness: 300 },
    // 呼吸动画（无动画模式下返回静态值）
    breathe: shouldReduceMotion 
      ? { scale: 1, opacity: 1 } 
      : { scale: [1, 1.02, 1], opacity: [0.95, 1, 0.95] },
    // 脉冲动画
    pulse: shouldReduceMotion 
      ? { opacity: 1 } 
      : { opacity: [0.5, 1, 0.5] },
    // 悬浮动画
    float: shouldReduceMotion 
      ? { y: 0 } 
      : { y: [0, -3, 0] },
  };
}

// ============================================
// 进化版雷达图 - 发光网格 + 闪烁节点
// ============================================
function RadarChart({ skills, accentColor }: { skills: number[]; accentColor: string }) {
  const shouldReduceMotion = useReducedMotion();
  const size = 220;
  const center = size / 2;
  const radius = 80;
  const angleStep = (Math.PI * 2) / 6;

  const polygonPoints = skills.map((skill, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (skill / 100) * radius;
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
  }).join(' ');

  const gridCircles = [20, 40, 60, 80, 100].map((level) => (
    <circle
      key={level}
      cx={center}
      cy={center}
      r={(level / 100) * radius}
      fill="none"
      stroke={accentColor}
      strokeWidth="0.5"
      strokeOpacity="0.3"
    />
  ));

  const axes = skillLabels.map((_, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x2 = center + radius * Math.cos(angle);
    const y2 = center + radius * Math.sin(angle);
    return (
      <line
        key={i}
        x1={center}
        y1={center}
        x2={x2}
        y2={y2}
        stroke={accentColor}
        strokeWidth="0.5"
        strokeOpacity="0.2"
      />
    );
  });

  // 数据节点（无动画模式下静态显示）
  const nodes = skills.map((skill, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (skill / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    
    if (shouldReduceMotion) {
      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="3"
          fill={accentColor}
          opacity="0.8"
        />
      );
    }
    
    return (
      <motion.circle
        key={i}
        cx={x}
        cy={y}
        r="3"
        fill={accentColor}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
      />
    );
  });

  const labels = skillLabels.map((label, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x = center + (radius + 25) * Math.cos(angle);
    const y = center + (radius + 25) * Math.sin(angle);
    return (
      <text
        key={i}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-zinc-500 text-[9px] tracking-wider"
        style={{ fontFamily: 'monospace' }}
      >
        {label}
      </text>
    );
  });

  // 多边形动画
  const polygonProps = shouldReduceMotion 
    ? { opacity: 1 }
    : { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { duration: 1.2, ease: 'easeOut' as const } };

  return (
    <svg width={size} height={size} className="mx-auto">
      {gridCircles}
      {axes}
      <motion.polygon
        points={polygonPoints}
        fill="none"
        stroke={accentColor}
        strokeWidth="1.5"
        style={{ filter: `drop-shadow(0 0 8px ${accentColor})` }}
        {...polygonProps}
      />
      {nodes}
      {labels}
    </svg>
  );
}

// ============================================
// 主机管理界面模态框
// ============================================
function ResumeModal({ 
  bot, 
  isOpen, 
  onClose 
}: { 
  bot: typeof eliteBots[0] | null; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const anim = useAnimationConfig();
  
  if (!bot) return null;

  // 动画 props 生成器
  const motionProps = (delay = 0) => shouldReduceMotion 
    ? {} 
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.5 } };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-50"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={anim.fadeIn}
            onClick={onClose}
          />

          {/* 模态框 */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 lg:p-8"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={anim.fadeIn}
          >
            <motion.div
              className="relative w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] bg-zinc-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-800"
              style={{
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.05),
                  0 25px 50px -12px rgba(0,0,0,0.8),
                  inset 0 1px 0 rgba(255,255,255,0.05)
                `,
              }}
              initial={shouldReduceMotion ? { scale: 1, y: 0 } : { scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={shouldReduceMotion ? { scale: 1, y: 0 } : { scale: 0.9, y: 50 }}
              transition={anim.spring}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 顶部金属装饰条 */}
              <div 
                className="h-10 flex items-center justify-between px-4 sm:px-6 border-b border-zinc-800"
                style={{
                  background: `
                    linear-gradient(180deg, 
                      rgba(63,63,70,0.4) 0%, 
                      rgba(39,39,42,0.6) 50%,
                      rgba(24,24,27,0.8) 100%
                    ),
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 1px,
                      rgba(255,255,255,0.02) 1px,
                      rgba(255,255,255,0.02) 2px
                    )
                  `,
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="ml-3 sm:ml-4 text-[9px] sm:text-[10px] text-zinc-500 tracking-[0.15em] sm:tracking-[0.2em] uppercase font-mono truncate">
                    CanChange — Panda Core v1.0
                  </span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="hidden sm:inline text-[10px] text-zinc-600 font-mono">SYS.READY</span>
                  <button
                    onClick={onClose}
                    className="w-6 h-6 rounded-md bg-zinc-800/50 hover:bg-zinc-700 flex items-center justify-center transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-zinc-500" />
                  </button>
                </div>
              </div>

              {/* 内容区域 - 移动端堆叠，桌面端并排 */}
              <div className="grid grid-cols-1 lg:grid-cols-5 h-[calc(95vh-40px)] sm:h-[calc(90vh-40px)] overflow-y-auto lg:overflow-hidden">
                {/* 左侧：视频区域 */}
                <div className="lg:col-span-3 relative bg-black overflow-hidden min-h-[300px] sm:min-h-[400px] lg:min-h-0">
                  {/* 内凹阴影 */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      boxShadow: 'inset 0 0 60px rgba(0,0,0,0.8), inset 0 0 120px rgba(0,0,0,0.4)',
                    }}
                  />
                  
                  {/* 扫描线 */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-10 opacity-5"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
                    }}
                  />

                  <div className={`absolute inset-0 ${bot.bgGradient} opacity-30`} />

                  {/* 3D 数字人 */}
                  <motion.div
                    className="relative h-full flex items-center justify-center py-8 lg:py-0"
                    initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
                  >
                    <div className="relative scale-75 sm:scale-90 lg:scale-100">
                      <div 
                        className="absolute -inset-20 rounded-full blur-3xl"
                        style={{ background: bot.glowColor }}
                      />
                      
                      <div 
                        className="relative w-56 sm:w-64 h-72 sm:h-80 rounded-3xl flex flex-col items-center justify-end pb-8 overflow-hidden"
                        style={{
                          background: 'linear-gradient(180deg, rgba(39,39,42,0.6) 0%, rgba(24,24,27,0.9) 100%)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          boxShadow: `
                            inset 0 1px 0 rgba(255,255,255,0.1),
                            0 20px 40px rgba(0,0,0,0.5),
                            0 0 40px ${bot.glowColor}
                          `,
                        }}
                      >
                        <motion.div 
                          className="w-24 sm:w-28 h-24 sm:h-28 rounded-full flex items-center justify-center mb-6"
                          style={{
                            background: `linear-gradient(135deg, ${bot.accentColor}40, ${bot.accentColor}20)`,
                            border: `2px solid ${bot.accentColor}60`,
                            boxShadow: `0 0 30px ${bot.glowColor}, inset 0 0 20px ${bot.glowColor}`,
                          }}
                          animate={shouldReduceMotion ? {} : {
                            boxShadow: [
                              `0 0 30px ${bot.glowColor}, inset 0 0 20px ${bot.glowColor}`,
                              `0 0 50px ${bot.glowColor}, inset 0 0 30px ${bot.glowColor}`,
                              `0 0 30px ${bot.glowColor}, inset 0 0 20px ${bot.glowColor}`,
                            ]
                          }}
                          transition={shouldReduceMotion ? { duration: 0 } : { duration: 3, repeat: Infinity }}
                        >
                          <span className="text-4xl sm:text-5xl font-bold text-white/90">{bot.name.charAt(0)}</span>
                        </motion.div>
                        
                        <div 
                          className="w-36 sm:w-44 h-28 sm:h-32 rounded-t-3xl"
                          style={{
                            background: `linear-gradient(180deg, ${bot.accentColor}20, transparent)`,
                          }}
                        />
                      </div>
                    </div>

                    {/* 播放按钮 */}
                    <motion.button
                      className="absolute inset-0 flex items-center justify-center group z-20"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    >
                      <div 
                        className="w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
                        style={{
                          background: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          boxShadow: '0 0 30px rgba(0,0,0,0.3)',
                        }}
                      >
                        <Play className="w-6 sm:w-8 h-6 sm:h-8 text-white ml-1" fill="white" />
                      </div>
                    </motion.button>
                  </motion.div>

                  {/* 视频信息条 */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20">
                    <div 
                      className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl"
                      style={{
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <div className="flex items-center gap-2 sm:gap-4">
                        <span className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-zinc-400 font-mono">
                          <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                          03:45
                        </span>
                        <span className="hidden sm:inline text-xs text-zinc-600">|</span>
                        <span className="text-[10px] sm:text-xs text-zinc-400 truncate">实操演示视频</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: bot.accentColor }}
                        />
                        <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider">Live</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 右侧：控制面板 */}
                <div className="lg:col-span-2 p-5 sm:p-8 overflow-y-auto border-t lg:border-t-0 lg:border-l border-zinc-800"
                  style={{
                    background: `
                      linear-gradient(180deg, rgba(24,24,27,0.95) 0%, rgba(9,9,11,1) 100%),
                      repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 40px,
                        rgba(255,255,255,0.01) 40px,
                        rgba(255,255,255,0.01) 41px
                      )
                    `,
                  }}
                >
                  {/* 身份信息 */}
                  <motion.div className="mb-6 sm:mb-8" {...motionProps(0)}>
                    <div 
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] font-bold tracking-wider uppercase mb-3 sm:mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${bot.accentColor}20, transparent)`,
                        border: `1px solid ${bot.accentColor}40`,
                        color: bot.accentColor,
                      }}
                    >
                      <Award className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                      {bot.role} Class
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">{bot.name}</h2>
                    <p className="text-zinc-500 text-base sm:text-lg">{bot.title}</p>
                  </motion.div>

                  {/* 核心指标 */}
                  <motion.div
                    className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8"
                    {...motionProps(0.1)}
                  >
                    <div 
                      className="p-4 sm:p-5 rounded-xl sm:rounded-2xl"
                      style={{
                        background: 'rgba(39,39,42,0.4)',
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <p className="text-zinc-500 text-[9px] sm:text-[10px] uppercase tracking-wider mb-1.5 sm:mb-2">Performance</p>
                      <p 
                        className="text-2xl sm:text-3xl font-bold tracking-tight"
                        style={{ color: bot.metric.trend === 'up' ? '#4ade80' : '#60a5fa' }}
                      >
                        {bot.metric.value}
                      </p>
                      <p className="text-zinc-600 text-[10px] sm:text-xs mt-1">{bot.metric.label}</p>
                    </div>
                    <div 
                      className="p-4 sm:p-5 rounded-xl sm:rounded-2xl"
                      style={{
                        background: 'rgba(39,39,42,0.4)',
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <p className="text-zinc-500 text-[9px] sm:text-[10px] uppercase tracking-wider mb-1.5 sm:mb-2">Status</p>
                      <p className="text-2xl sm:text-3xl font-bold text-green-400 tracking-tight">ONLINE</p>
                      <p className="text-zinc-600 text-[10px] sm:text-xs mt-1">7×24 Standby</p>
                    </div>
                  </motion.div>

                  {/* 雷达图 */}
                  <motion.div
                    className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl"
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.03)',
                    }}
                    initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
                  >
                    <p className="text-zinc-500 text-[9px] sm:text-[10px] uppercase tracking-wider mb-3 sm:mb-4 text-center">Capability Matrix</p>
                    <div className="scale-90 sm:scale-100">
                      <RadarChart skills={bot.skills} accentColor={bot.accentColor} />
                    </div>
                  </motion.div>

                  {/* 成就列表 */}
                  <motion.div className="mb-6 sm:mb-8" {...motionProps(0.4)}>
                    <p className="text-zinc-500 text-[9px] sm:text-[10px] uppercase tracking-wider mb-3 sm:mb-4">Key Achievements</p>
                    <div className="space-y-2 sm:space-y-3">
                      {bot.achievements.map((achievement, i) => (
                        <div 
                          key={i} 
                          className="flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm text-zinc-300"
                          style={{
                            background: 'rgba(39,39,42,0.3)',
                            border: '1px solid rgba(255,255,255,0.03)',
                          }}
                        >
                          <div 
                            className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{ backgroundColor: bot.accentColor }}
                          />
                          <span className="truncate">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <motion.div {...motionProps(0.5)}>
                    <Link href="/configurator" onClick={onClose}>
                      <motion.button
                        className="w-full py-3.5 sm:py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 text-sm sm:text-base"
                        style={{
                          background: `linear-gradient(135deg, ${bot.accentColor}, ${bot.accentColor}80)`,
                          boxShadow: `0 10px 30px ${bot.glowColor}`,
                        }}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.02, boxShadow: `0 15px 40px ${bot.glowColor}` }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                      >
                        配置我的团队
                        <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                      </motion.button>
                    </Link>
                    <p className="text-center text-zinc-600 text-[9px] sm:text-[10px] mt-3 tracking-wider">
                      M4 NEURAL ENGINE LINKED
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// 算力水晶舱 - 精英人才卡
// ============================================
function CapsuleCard({ 
  bot, 
  index, 
  onViewResume 
}: { 
  bot: typeof eliteBots[0]; 
  index: number; 
  onViewResume: (bot: typeof eliteBots[0]) => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const anim = useAnimationConfig();

  // 呼吸动画值
  const breatheAnimation = shouldReduceMotion 
    ? {} 
    : { 
        scale: [1, 1.02, 1],
        opacity: [0.95, 1, 0.95],
      };

  const breatheTransition = shouldReduceMotion 
    ? { duration: 0 } 
    : { duration: 4, repeat: Infinity, ease: 'easeInOut' as const };

  // 脉冲动画
  const pulseAnimation = shouldReduceMotion 
    ? { opacity: 1 } 
    : { opacity: [0.5, 1, 0.5] };

  const floatAnimation = shouldReduceMotion 
    ? { y: 0 } 
    : { y: [0, -3, 0] };

  return (
    <motion.div
      className="group relative"
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.02) 2px,
              rgba(255,255,255,0.02) 4px
            ),
            linear-gradient(180deg, rgba(39,39,42,0.5) 0%, rgba(24,24,27,0.7) 100%)
          `,
          border: '0.5px solid rgba(63,63,70,0.8)',
          boxShadow: `
            0 0 0 1px rgba(0,0,0,0.5),
            0 25px 50px -12px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.05)
          `,
        }}
        whileHover={shouldReduceMotion ? {} : { 
          y: -8,
          boxShadow: `
            0 0 0 1px rgba(0,0,0,0.5),
            0 35px 60px -12px rgba(0,0,0,0.6),
            0 0 40px ${bot.glowColor},
            inset 0 1px 0 rgba(255,255,255,0.08)
          `,
        }}
        transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* 顶部橙色指示灯 */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-[1px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${bot.accentColor}, transparent)`,
            boxShadow: `0 0 10px ${bot.accentColor}, 0 0 20px ${bot.glowColor}`,
          }}
        />
        
        {/* 钻石切割高光边缘 */}
        <div 
          className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.03) 100%)',
          }}
        />

        <div className="relative h-full flex flex-col">
          {/* 顶部：全息数字人展示区 */}
          <div className="relative aspect-[16/10] overflow-hidden">
            {/* 内部拉丝纹理 */}
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 1px,
                    rgba(255,255,255,0.01) 1px,
                    rgba(255,255,255,0.01) 2px
                  )
                `,
              }}
            />

            {/* 背景光晕 */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(ellipse at center bottom, ${bot.accentColor}30, transparent 70%)`,
              }}
            />

            {/* 数字人底座 */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2">
              <div 
                className="relative w-20 sm:w-28 h-4 sm:h-6 rounded-full"
                style={{
                  background: `
                    repeating-linear-gradient(
                      90deg,
                      rgba(63,63,70,0.8),
                      rgba(63,63,70,0.8) 1px,
                      rgba(39,39,42,0.9) 1px,
                      rgba(39,39,42,0.9) 3px
                    )
                  `,
                  boxShadow: `
                    0 10px 30px rgba(0,0,0,0.8),
                    0 5px 15px rgba(0,0,0,0.5),
                    inset 0 1px 0 rgba(255,255,255,0.1),
                    0 0 20px ${bot.glowColor}
                  `,
                }}
              />
            </div>

            {/* 全息数字人 */}
            <motion.div
              className="absolute inset-0 flex items-end justify-center pb-6 sm:pb-8"
              animate={breatheAnimation}
              transition={breatheTransition}
            >
              <div 
                className="relative scale-90 sm:scale-100"
                style={{
                  filter: `drop-shadow(0 0 15px ${bot.glowColor}) drop-shadow(0 0 30px ${bot.glowColor})`,
                }}
              >
                <div 
                  className="w-24 sm:w-28 h-32 sm:h-36 rounded-2xl flex flex-col items-center pt-4 sm:pt-5"
                  style={{
                    background: 'linear-gradient(180deg, rgba(63,63,70,0.6) 0%, rgba(39,39,42,0.8) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: `
                      inset 0 1px 0 rgba(255,255,255,0.1),
                      0 20px 40px rgba(0,0,0,0.4)
                    `,
                  }}
                >
                  <div 
                    className="w-12 sm:w-16 h-12 sm:h-16 rounded-full flex items-center justify-center mb-2 sm:mb-3"
                    style={{
                      background: `linear-gradient(135deg, ${bot.accentColor}, ${bot.accentColor}60)`,
                      boxShadow: `
                        0 0 20px ${bot.glowColor},
                        inset 0 0 10px rgba(255,255,255,0.2)
                      `,
                    }}
                  >
                    <span className="text-lg sm:text-xl font-bold text-white">{bot.name.charAt(0)}</span>
                  </div>
                  <div className="w-12 sm:w-16 h-10 sm:h-12 rounded-t-xl bg-gradient-to-b from-zinc-600/30 to-transparent" />
                </div>

                <div 
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-3 sm:h-4 rounded-full blur-md"
                  style={{ background: bot.glowColor }}
                />
              </div>
            </motion.div>

            {/* 顶部状态指示 */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-1.5 sm:gap-2">
              <motion.div
                className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full"
                style={{ backgroundColor: bot.accentColor }}
                animate={pulseAnimation}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity }}
              />
              <span 
                className="text-[8px] sm:text-[9px] font-mono tracking-wider uppercase"
                style={{ color: bot.accentColor }}
              >
                {bot.role}.ACTIVE
              </span>
            </div>

            {/* 悬浮数据点 */}
            <motion.div
              className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md backdrop-blur-sm"
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
              animate={floatAnimation}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-[8px] sm:text-[9px] text-zinc-400 font-mono flex items-center gap-1">
                <Zap className="w-2.5 sm:w-3 h-2.5 sm:h-3" style={{ color: bot.accentColor }} />
                AI CORE
              </span>
            </motion.div>
          </div>

          {/* 中部：信息区 */}
          <div className="p-4 sm:p-6 flex-1 flex flex-col">
            {/* 标题 */}
            <div className="mb-3 sm:mb-4">
              <div 
                className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-bold tracking-wider mb-1.5 sm:mb-2"
                style={{
                  background: `linear-gradient(90deg, ${bot.accentColor}20, transparent)`,
                  color: bot.accentColor,
                  border: `1px solid ${bot.accentColor}30`,
                }}
              >
                {bot.role}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-0.5 tracking-tight">{bot.title}</h3>
              <p className="text-zinc-500 text-xs sm:text-xs">{bot.name}</p>
            </div>

            {/* 核心指标 */}
            <div className="mb-3 sm:mb-4">
              <div className="flex items-baseline gap-2">
                <span 
                  className="text-3xl sm:text-4xl font-bold tracking-tighter"
                  style={{ 
                    color: bot.metric.trend === 'up' ? '#4ade80' : '#60a5fa',
                    textShadow: bot.metric.trend === 'up' 
                      ? '0 0 20px rgba(74,222,128,0.3)' 
                      : '0 0 20px rgba(96,165,250,0.3)',
                  }}
                >
                  {bot.metric.value}
                </span>
                {bot.metric.trend === 'up' ? (
                  <TrendingUp className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-green-400" />
                ) : (
                  <TrendingUp className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-400 rotate-180" />
                )}
              </div>
              <p className="text-zinc-500 text-xs mt-0.5">{bot.metric.label}</p>
            </div>

            {/* 描述 */}
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-1">
              {bot.description}
            </p>

            {/* 底部动作栏 */}
            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-zinc-800/50">
              <span className="text-[8px] sm:text-[9px] text-zinc-600 font-mono tracking-wider hidden xs:inline">
                M4 NEURAL ENGINE LINKED
              </span>
              <span className="text-[8px] text-zinc-600 font-mono tracking-wider xs:hidden">
                M4 LINKED
              </span>
              <motion.button
                onClick={() => onViewResume(bot)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-medium text-zinc-300 rounded-lg transition-all flex items-center gap-1.5 sm:gap-2"
                style={{
                  background: 'rgba(39,39,42,0.6)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                whileHover={shouldReduceMotion ? {} : { 
                  background: 'rgba(63,63,70,0.8)',
                  borderColor: bot.accentColor,
                  color: 'white',
                }}
              >
                查看履历
                <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// 主页面
// ============================================
export default function HomePage() {
  const [selectedBot, setSelectedBot] = useState<typeof eliteBots[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleViewResume = (bot: typeof eliteBots[0]) => {
    setSelectedBot(bot);
    setModalOpen(true);
  };

  // 标题动画
  const titleMotion = shouldReduceMotion 
    ? {} 
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <main className="min-h-screen bg-zinc-950">
      <Hero />
      
      {/* 数字员工矩阵区块 */}
      <section id="digital-employees" className="relative py-16 sm:py-24 lg:py-32">
        {/* 背景装饰 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-orange-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-600/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* 区块标题 */}
          <motion.div
            className="text-center mb-10 sm:mb-16"
            {...titleMotion}
          >
            <p className="text-[10px] sm:text-xs font-mono text-orange-400/80 mb-3 sm:mb-4 tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              Elite Digital Workforce
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-zinc-100 mb-4 sm:mb-6 tracking-tight">
              认识你的{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
                精英数字员工
              </span>
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
              4 位顶尖 AI 专家，搭载 M4 Neural Engine，ready to join your team
            </p>
          </motion.div>
          
          {/* 4 张算力水晶舱 - 响应式堆叠 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12">
            {eliteBots.map((bot, index) => (
              <CapsuleCard 
                key={bot.id} 
                bot={bot} 
                index={index} 
                onViewResume={handleViewResume}
              />
            ))}
          </div>

          {/* 全局 CTA */}
          <motion.div
            className="text-center"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.4 }}
          >
            <Link href="/configurator">
              <motion.button
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3.5 sm:py-5 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl"
                style={{
                  boxShadow: '0 10px 40px rgba(249,115,22,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
                whileHover={shouldReduceMotion ? {} : { 
                  scale: 1.02,
                  boxShadow: '0 15px 50px rgba(249,115,22,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                <Cpu className="w-4 sm:w-5 h-4 sm:h-5" />
                配置我的团队
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </motion.button>
            </Link>
            <p className="text-zinc-500 text-[10px] sm:text-xs mt-3 sm:mt-4 font-mono tracking-wider">
              30 天无理由退款 · 7×24 技术支持 · M4 NEURAL ENGINE LINKED
            </p>
          </motion.div>
        </div>
      </section>

      {/* 核心优势 */}
      <section className="py-12 sm:py-16 border-t border-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : undefined}
          >
            {[
              { icon: Shield, title: '企业级安全', desc: '数据私有化部署' },
              { icon: Zap, title: 'NPU 加速', desc: '31.2 TOPS 算力' },
              { icon: Target, title: '精准执行', desc: 'SOP 标准化流程' },
              { icon: Users, title: '团队协作', desc: '4 Bot 协同作战' },
            ].map((item) => (
              <div 
                key={item.title}
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl"
                style={{
                  background: 'rgba(39,39,42,0.3)',
                  border: '0.5px solid rgba(255,255,255,0.05)',
                }}
              >
                <div 
                  className="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(39,39,42,0.8), rgba(24,24,27,0.9))',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <item.icon className="w-5 sm:w-6 h-5 sm:h-6 text-orange-400" />
                </div>
                <h4 className="font-semibold text-zinc-200 mb-0.5 sm:mb-1 text-xs sm:text-sm">{item.title}</h4>
                <p className="text-[10px] sm:text-xs text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 履历模态框 */}
      <ResumeModal 
        bot={selectedBot} 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </main>
  );
}
