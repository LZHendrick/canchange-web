'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import {
  Users,
  Briefcase,
  GitBranch,
  Shield,
  ShoppingCart,
  Check,
  Plus,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useBotStore, botsData, Bot, checkDependency } from '@/stores/botStore';

// ============================================
// 数字滚动动画组件
// ============================================
function AnimatedPrice({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest: number) => {
      if (displayRef.current) {
        displayRef.current.textContent = `¥${latest.toLocaleString('zh-CN')}`;
      }
    });
    return unsubscribe;
  }, [spring]);

  return (
    <span ref={displayRef} className="tabular-nums">
      ¥0
    </span>
  );
}

// ============================================
// 硬件展示区域 + 全息图标
// ============================================
function HardwareSection({ selectedBots }: { selectedBots: string[] }) {
  const botIcons = [
    { id: 'cgo', Icon: Users, position: 'top-0 left-1/2 -translate-x-1/2', color: 'from-orange-500 to-red-500' },
    { id: 'cho', Icon: Briefcase, position: 'top-1/2 right-0 -translate-y-1/2', color: 'from-blue-500 to-cyan-500' },
    { id: 'coo', Icon: GitBranch, position: 'bottom-0 left-1/2 -translate-x-1/2', color: 'from-purple-500 to-emerald-500' },
    { id: 'clo', Icon: Shield, position: 'top-1/2 left-0 -translate-y-1/2', color: 'from-zinc-800 to-amber-500' },
  ];

  return (
    <section className="relative py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            雇佣您的
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
              {' '}数字员工
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            灿橙·小熊猫 AI 企业主机，为您的团队配备全天候 AI 高管
          </p>
        </motion.div>

        {/* 硬件 + 全息图标容器 */}
        <div className="relative w-80 h-80 mx-auto">
          {/* 全息图标 */}
          {botIcons.map(({ id, Icon, position, color }) => {
            const isSelected = selectedBots.includes(id);
            return (
              <motion.div
                key={id}
                className={`absolute ${position} z-20`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.div
                  className={`
                    relative w-16 h-16 rounded-2xl flex items-center justify-center
                    transition-all duration-500
                    ${isSelected 
                      ? `bg-gradient-to-br ${color} shadow-2xl` 
                      : 'bg-zinc-800/50 backdrop-blur-sm'
                    }
                  `}
                  style={{
                    boxShadow: isSelected 
                      ? `0 0 40px -10px ${id === 'cgo' ? '#f97316' : id === 'cho' ? '#3b82f6' : id === 'coo' ? '#a855f7' : '#d97706'}` 
                      : 'none',
                  }}
                  animate={isSelected ? {
                    filter: ['drop-shadow(0 0 20px rgba(255,255,255,0.3))', 'drop-shadow(0 0 40px rgba(255,255,255,0.5))', 'drop-shadow(0 0 20px rgba(255,255,255,0.3))'],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon 
                    className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-zinc-500'}`}
                    strokeWidth={1.5}
                  />
                  
                  {/* 选中时的光环 */}
                  {isSelected && (
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-50`}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* 连接线 */}
                <svg
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 pointer-events-none"
                  style={{ zIndex: -1 }}
                >
                  <motion.line
                    x1="50%"
                    y1="50%"
                    x2={id === 'cgo' ? '50%' : id === 'cho' ? '100%' : id === 'coo' ? '50%' : '0%'}
                    y2={id === 'cgo' ? '0%' : id === 'cho' ? '50%' : id === 'coo' ? '100%' : '50%'}
                    stroke={isSelected ? '#f97316' : '#3f3f46'}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: isSelected ? 1 : 0.3, 
                      opacity: isSelected ? 1 : 0.2 
                    }}
                    transition={{ duration: 1 }}
                  />
                </svg>
              </motion.div>
            );
          })}

          {/* 硬件主体 */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* 硬件外壳 - 黑色哑光质感 */}
            <div className="relative w-full h-full rounded-3xl bg-zinc-900 shadow-2xl overflow-hidden">
              {/* 哑光纹理 */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `radial-gradient(circle at 30% 30%, #3f3f46 1px, transparent 1px)`,
                backgroundSize: '8px 8px',
              }} />
              
              {/* 顶部光效 */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
              
              {/* 品牌标识 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-zinc-400 text-xs">小熊猫</p>
                  <p className="text-zinc-500 text-[10px]">AI 企业主机</p>
                </div>
              </div>

              {/* 状态指示灯 */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-500"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[10px] text-zinc-500">运行中</span>
              </div>
            </div>

            {/* 底部阴影 */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/30 blur-xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Bot 卡片组件
// ============================================
function BotCard({ bot, index }: { bot: Bot; index: number }) {
  const { selectedBots, toggleBot, isSelected } = useBotStore();
  const selected = isSelected(bot.id);
  
  // 检查依赖关系
  const dependency = checkDependency(selectedBots, bot.id);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    setShowWarning(dependency.hasWarning);
  }, [dependency.hasWarning, selectedBots]);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* 依赖警告气泡 */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            className="absolute -top-3 right-4 z-30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            <motion.div
              className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-medium rounded-full shadow-lg whitespace-nowrap"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {dependency.message}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 卡片主体 */}
      <motion.div
        className={`
          relative h-full rounded-3xl overflow-hidden transition-all duration-500
          ${selected 
            ? 'bg-zinc-900/80' 
            : 'bg-zinc-900/40'
          }
        `}
        style={{
          boxShadow: selected 
            ? `0 0 0 2px transparent, 0 0 40px -10px ${bot.id === 'cgo' ? '#f97316' : bot.id === 'cho' ? '#3b82f6' : bot.id === 'coo' ? '#a855f7' : '#d97706'}` 
            : '0 0 0 1px rgba(63, 63, 70, 0.5)',
        }}
        whileHover={{ y: -4 }}
      >
        {/* 发光边框效果 */}
        {selected && (
          <motion.div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${bot.gradient} opacity-20`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
          />
        )}

        <div className="relative p-6 lg:p-8">
          {/* 顶部：名称和标签 */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`
                w-12 h-12 rounded-xl bg-gradient-to-br ${bot.gradient} 
                flex items-center justify-center text-white font-bold text-sm
              `}>
                {bot.name}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{bot.title}</h3>
                <p className="text-zinc-500 text-sm">ID: {bot.id}</p>
              </div>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2">
              {bot.tags.map((tag) => (
                <span
                  key={tag}
                  className={`
                    px-2.5 py-1 text-xs font-medium rounded-full
                    ${selected 
                      ? `bg-gradient-to-r ${bot.gradient} text-white` 
                      : 'bg-zinc-800 text-zinc-400'
                    }
                  `}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 描述文案 */}
          <p className="text-zinc-400 text-sm leading-relaxed mb-8">
            {bot.description}
          </p>

          {/* 底部：价格和按钮 */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">
                ¥{bot.price.toLocaleString('zh-CN')}
              </p>
              <p className="text-xs text-zinc-500">/年</p>
            </div>

            <motion.button
              onClick={() => toggleBot(bot.id)}
              className={`
                relative px-6 py-3 rounded-xl font-medium transition-all duration-300
                flex items-center gap-2
                ${selected
                  ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  : `bg-gradient-to-r ${bot.gradient} text-white shadow-lg hover:shadow-xl hover:scale-105`
                }
              `}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {selected ? (
                  <motion.span
                    key="selected"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <Check className="w-4 h-4" />
                    已添加
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <Plus className="w-4 h-4" />
                    雇佣
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// 底部悬浮算价栏
// ============================================
function CheckoutBar() {
  const { selectedBots, totalPrice } = useBotStore();
  const hasSelection = selectedBots.length > 0;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="backdrop-blur-md bg-zinc-950/80 border-t border-zinc-800/50">
        <div className="container mx-auto px-4 max-w-6xl py-4">
          <div className="flex items-center justify-between gap-4">
            {/* 左侧：已选数量 */}
            <div className="flex items-center gap-4">
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                ${hasSelection ? 'bg-gradient-to-r from-orange-500 to-amber-600' : 'bg-zinc-800'}
              `}>
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">已选数字员工</p>
                <p className="text-xl font-bold text-white">
                  {selectedBots.length} <span className="text-sm font-normal text-zinc-500">/ 4</span>
                </p>
              </div>
            </div>

            {/* 中间：总价 */}
            <div className="hidden sm:block text-center">
              <p className="text-sm text-zinc-400 mb-1">总计</p>
              <p className="text-3xl font-bold text-white">
                <AnimatedPrice value={totalPrice} />
              </p>
            </div>

            {/* 移动端总价 */}
            <div className="sm:hidden">
              <p className="text-lg font-bold text-white">
                <AnimatedPrice value={totalPrice} />
              </p>
            </div>

            {/* 右侧：结算按钮 */}
            <motion.button
              className={`
                relative px-8 py-4 rounded-xl font-semibold text-white
                transition-all duration-300
                ${hasSelection
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 shadow-lg shadow-orange-500/25'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }
              `}
              disabled={!hasSelection}
              whileHover={hasSelection ? { scale: 1.02 } : {}}
              whileTap={hasSelection ? { scale: 0.98 } : {}}
            >
              <span className="flex items-center gap-2">
                立即结算
                <ChevronRight className="w-5 h-5" />
              </span>
              
              {/* 呼吸灯效果 */}
              {hasSelection && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 opacity-0"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// 主页面
// ============================================
export default function ConfiguratorPage() {
  const { selectedBots } = useBotStore();

  return (
    <main className="min-h-screen bg-zinc-950 pb-32">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      {/* 硬件展示区域 */}
      <HardwareSection selectedBots={selectedBots} />

      {/* 卡片矩阵 */}
      <section className="relative py-8 lg:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {botsData.map((bot, index) => (
              <BotCard key={bot.id} bot={bot} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* 底部悬浮算价栏 */}
      <CheckoutBar />
    </main>
  );
}
