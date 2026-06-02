"use client";

import React, { useState, useRef, useEffect } from "react";
import { CloudArrowUpIcon, PlusIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Tabs from "@/components/common/Tabs";
import { type ModalConfig, type FormField } from "@/lib/wellth-plans.config";

interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ModalConfig;
  onSave: (data: Record<string, unknown>) => void | Promise<void>;
  onSaveDraft?: (data: Record<string, unknown>) => void;
  initialData?: Record<string, unknown>;
  overrideTitle?: string;
  /** Per-tab title overrides — key is the tab label */
  tabTitles?: Record<string, string>;
}

export default function DynamicModal({
  isOpen,
  onClose,
  config,
  onSave,
  onSaveDraft,
  initialData,
  overrideTitle,
  tabTitles,
}: DynamicModalProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>(initialData || {});
  const [activeTabLabel, setActiveTabLabel] = useState<string>(
    config.tabs ? config.tabs[0].label : "",
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || {});
      setSelectedFile(null);
      if (config.tabs) {
        setActiveTabLabel(config.tabs[0].label);
      }
    }
  }, [isOpen, initialData, config.tabs]);

  const handleInputChange = (name: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const data = { ...formData, icon: selectedFile, is_draft: false };
    const result = onSave(data);
    if (result instanceof Promise) {
      setSaving(true);
      try {
        await result;
        onClose();
      } catch {
        // error handled by caller
      } finally {
        setSaving(false);
      }
    } else {
      onClose();
    }
  };

  const handleSaveDraft = () => {
    onSaveDraft?.({ ...formData, icon: selectedFile, is_draft: true });
    onClose();
  };

  const currentFields = config.tabs
    ? config.tabs.find((tab) => tab.label === activeTabLabel)?.fields || []
    : config.fields || [];

  const isFormValid = () => {
    return currentFields.every((field) => {
      if (field.validation?.required) {
        return !!formData[field.name];
      }
      return true;
    });
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
        return (
          <Input
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            value={(formData[field.name] as string) || ""}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );
      case "textarea":
        return (
          <div key={field.name} className="space-y-1">
            <label className="block text-s font-normal text-charcoal">{field.label}</label>
            <textarea
              className="w-full rounded-lg border border-[#ededed] bg-white px-5 py-4 font-normal text-m text-charcoal placeholder:text-[#e1e1e1] outline-none transition focus:border-sageGreen/55 focus:ring-2 focus:ring-sageGreen/20 min-h-[140px] resize-none"
              placeholder={field.placeholder}
              value={(formData[field.name] as string) || ""}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
            />
          </div>
        );
      case "upload":
        return (
          <div key={field.name} className="space-y-1">
            <label className="block text-s font-normal text-charcoal">{field.label}</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#E5E5E5] bg-[#FDFDFD] py-10 transition-colors hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
              <CloudArrowUpIcon className="h-8 w-8 text-[#9898A3] mb-3" strokeWidth={1} />
              <span className="text-sm font-medium text-[#5B4FDB] mb-1 px-4 text-center">
                {selectedFile ? selectedFile.name : "Upload Icon"}
              </span>
              <span className="text-xs text-[#A1A1AA] text-center px-4">
                PNG, JPG up to 5MB (recommended: 40x40px)
              </span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isEdit = !!initialData;
  const baseTitle = (tabTitles && tabTitles[activeTabLabel]) ?? overrideTitle ?? config.title;
  const modalTitle = isEdit
    ? baseTitle.replace("Add New", "Edit").replace("Create", "Edit")
    : baseTitle;
  const actionText = isEdit ? "Save Changes" : config.actionText;

  const hasChanges =
    !isEdit ||
    (() => {
      if (!initialData) return true;
      return (
        Object.keys(formData).some((key) => formData[key] !== initialData[key]) ||
        Object.keys(initialData).some((key) => formData[key] !== initialData[key])
      );
    })();

  const footer = (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <Button
        variant="outline"
        onClick={onClose}
        className="flex-1 text-[#475569] border-[#E5E5E5] hover:bg-gray-50"
      >
        Cancel
      </Button>

      {config.showDraftAction && (!isEdit || config.showDraftOnEdit) && (
        <Button
          variant="outline"
          onClick={handleSaveDraft}
          disabled={!isFormValid() || !hasChanges}
          className="flex-1"
        >
          Save as Draft
        </Button>
      )}

      <Button
        variant="solid"
        onClick={handleSave}
        disabled={!isFormValid() || !hasChanges || saving}
        className="flex-1"
      >
        <span className="flex items-center gap-2">
          {saving ? (
            <svg className="h-[1em] w-[1em] animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            <PlusIcon className="h-[1em] w-[1em] shrink-0" />
          )}
          {actionText?.replace(/^\+\s*/, "")}
        </span>
      </Button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={modalTitle} footer={footer} zIndex="z-[60]">
      <div className="space-y-6">
        {config.tabs && (
          <div className="-mx-2 mb-6">
            <Tabs
              items={config.tabs.map((tab) => tab.label)}
              activeTab={activeTabLabel}
              onTabChange={setActiveTabLabel}
              activeTabClassName="border-sageGreen font-semibold text-sageGreen bg-[#EDEDED]"
              inactiveHoverClassName="hover:bg-[#EDEDED] hover:text-sageGreen hover:border-sageGreen"
            />
          </div>
        )}

        <div className="space-y-6">{currentFields.map((field) => renderField(field))}</div>
      </div>
    </Modal>
  );
}
