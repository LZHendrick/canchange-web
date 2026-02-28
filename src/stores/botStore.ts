'use client';

import { create } from 'zustand';

export interface Bot {
  id: string;
  name: string;
  title: string;
  price: number;
  gradient: string;
  tags: string[];
  description: string;
}

interface BotState {
  selectedBots: string[];
  totalPrice: number;
  bots: Bot[];
}

interface BotActions {
  toggleBot: (botId: string) => void;
  isSelected: (botId: string) => boolean;
  clearSelection: () => void;
}

export const botsData: Bot[] = [
  {
    id: 'cgo',
    name: 'CGO',
    title: 'AI 首席增长官',
    price: 29990,
    gradient: 'from-orange-500 to-red-500',
    tags: ['SEO霸屏', '竞品监控', '自动成交'],
    description: '全网自动分发 + 询盘截流，获客效率提升 300%',
  },
  {
    id: 'cho',
    name: 'CHO',
    title: 'AI 首席人才官',
    price: 19990,
    gradient: 'from-blue-500 to-cyan-500',
    tags: ['简历透视', '自动面试', '人才库激活'],
    description: '7x24小时全网寻猎 + 智能面试，招聘周期缩短 90%',
  },
  {
    id: 'coo',
    name: 'COO',
    title: 'AI 全域运营官',
    price: 39990,
    gradient: 'from-purple-500 to-emerald-500',
    tags: ['跨平台协同', '流程编排', '异常熔断'],
    description: '打通 100+ 业务系统孤岛，流程自动化率突破 99%',
  },
  {
    id: 'clo',
    name: 'CLO',
    title: 'AI 首席合规官',
    price: 25990,
    gradient: 'from-zinc-800 to-amber-500',
    tags: ['合同秒审', '风险雷达', '法规知识库'],
    description: '毫秒级合同审查 + 动态风险预警，拦截 100% 致命法律漏洞',
  },
];

export const useBotStore = create<BotState & BotActions>((set, get) => ({
  selectedBots: [],
  totalPrice: 0,
  bots: botsData,

  toggleBot: (botId: string) => {
    const { selectedBots, totalPrice } = get();
    const bot = botsData.find((b) => b.id === botId);
    
    if (!bot) return;

    const isSelected = selectedBots.includes(botId);

    if (isSelected) {
      set({
        selectedBots: selectedBots.filter((id) => id !== botId),
        totalPrice: totalPrice - bot.price,
      });
    } else {
      set({
        selectedBots: [...selectedBots, botId],
        totalPrice: totalPrice + bot.price,
      });
    }
  },

  isSelected: (botId: string) => {
    return get().selectedBots.includes(botId);
  },

  clearSelection: () => {
    set({ selectedBots: [], totalPrice: 0 });
  },
}));

// 依赖关系检查
export function checkDependency(
  selectedBots: string[],
  botId: string
): { hasWarning: boolean; message: string } {
  // 如果选中了 COO 但没选中 CGO
  if (botId === 'coo' && selectedBots.includes('coo') && !selectedBots.includes('cgo')) {
    return {
      hasWarning: true,
      message: '💡 建议搭配：80% CEO 选择同时雇佣',
    };
  }
  return { hasWarning: false, message: '' };
}
