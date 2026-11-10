'use client';

import React from 'react';
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info, HelpCircle } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'confirm';

export interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: NotificationType;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

export function NotificationModal({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  actionButton,
}: NotificationModalProps) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        );
      case 'error':
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-lg shadow-rose-500/10">
            <AlertCircle className="h-6 w-6" />
          </div>
        );
      case 'warning':
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-lg shadow-amber-500/10">
            <AlertTriangle className="h-6 w-6" />
          </div>
        );
      case 'confirm':
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-lg shadow-purple-500/10">
            <HelpCircle className="h-6 w-6" />
          </div>
        );
      case 'info':
      default:
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/10">
            <Info className="h-6 w-6" />
          </div>
        );
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#121622] p-6 shadow-2xl space-y-5">
        {/* Header with Mavora Logo & Close */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mavora-logo.png"
              alt="Mavora"
              className="h-5 w-5 object-contain"
            />
            <span className="text-xs font-bold tracking-wider uppercase text-purple-400">
              Mavora Platform
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex items-start gap-4">
          <div className="shrink-0">{getIcon()}</div>
          <div className="space-y-1.5 flex-1 min-w-0">
            <h3 className="text-base font-bold text-white font-sans">{title}</h3>
            <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">
              {message}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex items-center justify-end gap-2.5">
          {type === 'confirm' && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-white/10 transition"
            >
              {cancelText}
            </button>
          )}

          {actionButton && (
            <button
              type="button"
              onClick={() => {
                actionButton.onClick();
                onClose();
              }}
              className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow hover:brightness-110 transition"
            >
              {actionButton.label}
            </button>
          )}

          <button
            type="button"
            onClick={handleConfirm}
            className={`rounded-xl px-4 py-2 text-xs font-semibold shadow transition ${
              type === 'error'
                ? 'bg-rose-600 text-white hover:bg-rose-500'
                : type === 'warning'
                ? 'bg-amber-600 text-white hover:bg-amber-500'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:brightness-110'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
