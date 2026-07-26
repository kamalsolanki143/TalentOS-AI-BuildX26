'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Clock, Video, Sparkles } from 'lucide-react';

export const RightSidebar: React.FC = () => {
  const interviews = [
    { name: 'Rahul Sharma', role: 'Lead Frontend', time: '2:30 PM Today', type: 'Technical Founder Round', avatar: 'RS' },
    { name: 'Priya Singh', role: 'UI/UX Designer', time: '11:00 AM Tomorrow', type: 'Portfolio Deep Dive', avatar: 'PS' },
  ];

  return (
    <div className="space-y-6">
      {/* Upcoming Interviews Card */}
      <Card variant="default" padding="md">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <h4 className="text-sm font-bold text-slate-900">Upcoming Interviews</h4>
          </div>
          <Badge variant="primary" size="sm">2 Today</Badge>
        </div>

        <div className="space-y-3">
          {interviews.map((item, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Avatar name={item.name} size="sm" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{item.name}</h5>
                    <p className="text-[11px] text-slate-500">{item.role}</p>
                  </div>
                </div>
                <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                  <Video className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                <span className="flex items-center gap-1 font-medium text-indigo-600">
                  <Clock className="w-3 h-3" /> {item.time}
                </span>
                <span className="truncate max-w-[120px] text-slate-400">{item.type}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Founder AI Tip Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900 to-violet-950 text-white space-y-2 shadow-soft-md">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Founder AI Tip</span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed">
          Candidates with &gt;90 Startup Fit scores adapt 3x faster to early-stage ambiguity. Make sure to review Rahul Sharma&apos;s score breakdown!
        </p>
      </div>
    </div>
  );
};
