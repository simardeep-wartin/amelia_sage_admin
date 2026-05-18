"use client";

import React, { useState, useCallback } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import FileUploadZone from "@/components/ui/FileUploadZone";

export type ModalType = "category" | "exercise" | "intro-screen";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType;
  title: string;
  onSave: (data: Record<string, unknown>) => void;
  actionText?: string;
  nameLabel?: string;
  initialData?: Record<string, unknown>;
}

export default function ActionModal({
  isOpen,
  onClose,
  type,
  title,
  onSave,
  actionText,
  nameLabel,
  initialData,
}: ActionModalProps) {
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [field3, setField3] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const resetForm = useCallback(() => {
    setField1("");
    setField2("");
    setField3("");
    setSelectedFile(null);
  }, []);

  React.useEffect(() => {
    if (initialData && isOpen) {
      if (type === "category" || type === "exercise") {
        setField1((initialData.title as string) || (initialData.name as string) || "");
        setField2((initialData.description as string) || "");
      } else if (type === "intro-screen") {
        setField1((initialData.subtitle as string) || "");
        setField2((initialData.sageSays as string) || "");
        setField3((initialData.description as string) || "");
      }
    } else if (!isOpen) {
      resetForm();
    }
  }, [initialData, isOpen, type, resetForm]);

  const handleSave = () => {
    if (type === "category") {
      onSave({ name: field1, description: field2, icon: selectedFile });
    } else if (type === "exercise") {
      onSave({ title: field1, description: field2 });
    } else if (type === "intro-screen") {
      onSave({ subtitle: field1, sageSays: field2, description: field3 });
    }
    resetForm();
    onClose();
  };

  const isFormValid = field1.trim() !== "" && field2.trim() !== "";
  const isEdit = !!initialData;
  const modalTitle = isEdit ? title.replace("Add New", "Edit").replace("Create", "Edit") : title;

  const footer = (
    <>
      <button
        onClick={onClose}
        className="flex-1 h-10 sm:h-12 rounded-lg border border-[#E5E5E5] text-sm sm:text-base font-semibold text-slate transition-colors cursor-pointer"
      >
        Cancel
      </button>
      {type === "exercise" || type === "intro-screen" ? (
        <>
          {!isEdit && (
            <button
              onClick={handleSave}
              disabled={!isFormValid}
              className="w-full sm:flex-1 h-12 rounded-lg border border-sageGreen text-base font-semibold text-sageGreen transition-colors hover:bg-green-50 disabled:border-sageGreen/40 disabled:text-[#C1D2A4] disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              Save as Draft
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!isFormValid}
            className={`w-full sm:flex-1 h-12 rounded-lg bg-sageGreen text-base font-semibold text-white transition-colors hover:bg-[#7fa18c] disabled:bg-[#C1D2A4] disabled:cursor-not-allowed disabled:bg-sageGreen/40 ${isEdit ? "sm:flex-[2]" : ""}`}
          >
            {isEdit
              ? "Save Changes"
              : actionText || (type === "exercise" ? "+ Publish Exercise" : "+ Add Intro Screen")}
          </button>
        </>
      ) : (
        <button
          onClick={handleSave}
          className="flex-1 h-10 sm:h-12 rounded-lg bg-[#8EB19D] text-sm sm:text-base font-semibold text-white transition-colors hover:bg-[#7fa18c]"
        >
          {isEdit ? "Save Changes" : actionText}
        </button>
      )}
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      footer={footer}
      zIndex={type !== "category" ? "z-[60]" : "z-50"}
    >
      <div className="space-y-6">
        <Input
          label={
            nameLabel ||
            (type === "exercise" ? "Add Title" : type === "intro-screen" ? "Add Subtitle" : "Name")
          }
          placeholder={
            type === "exercise"
              ? "Enter Title"
              : type === "intro-screen"
                ? "Enter Subtitle"
                : "Enter Name"
          }
          value={field1}
          onChange={(e) => setField1(e.target.value)}
        />

        {type === "intro-screen" && (
          <Input
            label="Sage Says"
            placeholder="Enter Sage Says"
            value={field2}
            onChange={(e) => setField2(e.target.value)}
          />
        )}

        <div className="space-y-1">
          <label className="block text-s font-normal text-charcoal">Add Description</label>
          <textarea
            className="w-full rounded-lg border border-[#ededed] bg-white px-5 py-4 font-normal text-m text-charcoal placeholder:text-[#e1e1e1] outline-none transition focus:border-sageGreen/55 focus:ring-2 focus:ring-sageGreen/20 min-h-[140px] resize-none"
            placeholder="Add Description Here"
            value={type === "intro-screen" ? field3 : field2}
            onChange={(e) =>
              type === "intro-screen" ? setField3(e.target.value) : setField2(e.target.value)
            }
          />
        </div>

        {type === "category" && (
          <FileUploadZone
            label="Add Icon"
            accept="image/png, image/jpeg"
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
            placeholder="Upload Icon"
            hint="PNG, JPG up to 5MB (recommended: 40x40px)"
          />
        )}
      </div>
    </Modal>
  );
}
