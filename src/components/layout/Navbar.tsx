'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';

/**
 * CanChange 全局导航栏
 * Apple 风格毛玻璃半透明背景
 */

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 监听滚动
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 关闭移动端菜单
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // 判断当前页面
  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  // 处理首页点击
  const handleHomeClick = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  // 处理锚点点击
  const handleAnchorClick = () => {
    if (pathname === '/') {
      const element = document.getElementById('digital-employees');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#digital-employees');
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          isScrolled
            ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50'
            : 'bg-zinc-950/60 backdrop-blur-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl h-full">
          <nav className="flex items-center justify-between h-full">
            {/* Logo - 灿橙 CanChange */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <span className="text-white font-bold text-sm">CC</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-zinc-100 text-base tracking-tight">灿橙</span>
                <span className="text-zinc-500 text-sm font-medium tracking-wide">CanChange</span>
              </div>
            </Link>

            {/* 桌面端导航菜单 */}
            <div className="hidden md:flex items-center gap-1">
              {/* 首页 */}
              <button
                onClick={handleHomeClick}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  pathname === '/' ? 'text-zinc-100' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                首页
                {pathname === '/' && (
                  <motion.div
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                    layoutId="activeNav"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              {/* 了解数字员工 */}
              <button
                onClick={handleAnchorClick}
                className="relative px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors rounded-lg"
              >
                了解数字员工
              </button>

              {/* 客户案例 */}
              <Link
                href="/cases"
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  isActive('/cases') ? 'text-zinc-100' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                客户案例
                {isActive('/cases') && (
                  <motion.div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" layoutId="activeNav" />
                )}
              </Link>

              {/* 选购数字员工 */}
              <Link
                href="/configurator"
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  isActive('/configurator') ? 'text-orange-400' : 'text-orange-400 hover:text-orange-300'
                }`}
              >
                选购数字员工
              </Link>

              {/* 关于我们 */}
              <Link
                href="/about"
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  isActive('/about') ? 'text-zinc-100' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                关于我们
                {isActive('/about') && (
                  <motion.div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" layoutId="activeNav" />
                )}
              </Link>
            </div>

            {/* 右侧：售后服务 + 立即雇佣 */}
            <div className="flex items-center gap-2">
              {/* 售后服务/我的 */}
              <Link
                href="/portal"
                className={`hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  isActive('/portal') ? 'text-zinc-100 bg-zinc-800/50' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                }`}
              >
                <User className="w-4 h-4" />
                <span>我的</span>
              </Link>

              {/* 立即雇佣 CTA */}
              <Link
                href="/configurator"
                className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-semibold text-zinc-950 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg shadow-orange-500/20"
              >
                立即雇佣
              </Link>

              {/* 移动端菜单按钮 */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-zinc-800/50 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-zinc-300" /> : <Menu className="w-5 h-5 text-zinc-300" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div className="fixed top-16 left-4 right-4 bg-zinc-900/95 backdrop-blur-xl rounded-2xl border border-zinc-800 z-50 md:hidden overflow-hidden" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="p-2">
                <button onClick={() => { handleHomeClick(); setIsMobileMenuOpen(false); }} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl ${pathname === '/' ? 'bg-zinc-800 text-orange-400' : 'text-zinc-300'}`}>
                  <span className="font-medium">首页</span>
                  {pathname === '/' && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
                </button>
                <button onClick={() => { handleAnchorClick(); setIsMobileMenuOpen(false); }} className="w-full flex items-center px-4 py-3 rounded-xl text-zinc-300 hover:bg-zinc-800/50">
                  <span className="font-medium">了解数字员工</span>
                </button>
                <Link href="/cases" onClick={() => setIsMobileMenuOpen(false)} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl ${isActive('/cases') ? 'bg-zinc-800 text-orange-400' : 'text-zinc-300'}`}>
                  <span className="font-medium">客户案例</span>
                </Link>
                <Link href="/configurator" onClick={() => setIsMobileMenuOpen(false)} className="w-full flex items-center px-4 py-3 rounded-xl text-orange-400">
                  <span className="font-medium">选购数字员工</span>
                </Link>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl ${isActive('/about') ? 'bg-zinc-800 text-orange-400' : 'text-zinc-300'}`}>
                  <span className="font-medium">关于我们</span>
                </Link>
                <Link href="/portal" onClick={() => setIsMobileMenuOpen(false)} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl ${isActive('/portal') ? 'bg-zinc-800 text-orange-400' : 'text-zinc-300'}`}>
                  <span className="font-medium flex items-center gap-2"><User className="w-4 h-4" />我的</span>
                </Link>
                <div className="mt-2 pt-2 border-t border-zinc-800">
                  <Link href="/configurator" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-semibold rounded-xl">
                    立即雇佣
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-16" />
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl py-12 lg:py-16">
        <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CC</span>
              </div>
              <div>
                <span className="font-bold text-zinc-100">灿橙</span>
                <span className="text-zinc-500 text-sm ml-1.5">CanChange</span>
              </div>
            </Link>
            <p className="text-sm text-zinc-500">雇佣你的第一支 AI 自动化团队</p>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-300 mb-4">产品</h3>
            <ul className="space-y-3">
              <li><Link href="/configurator" className="text-sm text-zinc-500 hover:text-zinc-300">数字员工配置</Link></li>
              <li><Link href="/configurator" className="text-sm text-zinc-500 hover:text-zinc-300">AI 高管团队</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-300 mb-4">支持</h3>
            <ul className="space-y-3">
              <li><Link href="/portal" className="text-sm text-zinc-500 hover:text-zinc-300">售后中心</Link></li>
              <li><Link href="/portal" className="text-sm text-zinc-500 hover:text-zinc-300">Token 充值</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-300 mb-4">公司</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-zinc-500 hover:text-zinc-300">关于 CanChange</Link></li>
              <li><Link href="/about" className="text-sm text-zinc-500 hover:text-zinc-300">加入我们</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-xs text-zinc-600">© 2026 灿橙文化传媒 (CanChange). All rights reserved.</p>
            <p className="text-xs text-zinc-600">用 AI 重新定义文化传播与业务增长</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-zinc-600 hover:text-zinc-400">隐私政策</Link>
            <Link href="#" className="text-xs text-zinc-600 hover:text-zinc-400">服务条款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
