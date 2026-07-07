"use client";

import { useState, useEffect } from "react";
import { XMarkIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import SageAiLoader from "@/components/loaders/sage-ai-loader";
import { getSagePrompt, updateSagePrompt, resetSagePrompt } from "@/Services/api/sageAi";

export default function SageAiMain() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [hasDefault, setHasDefault] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getSagePrompt()
      .then((res) => {
        setPrompt(res.data.prompt);
        setHasDefault(Boolean(res.data.has_default));
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load prompt"))
      .finally(() => setLoading(false));
  }, []);

  const handleOpenModal = () => {
    setError("");
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setError("");
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    setEditText(prompt);
    setError("");
    setIsEditing(true);
  };

  const handleSave = () => {
    setSaving(true);
    setError("");
    updateSagePrompt(editText)
      .then((res) => {
        setPrompt(res.data.prompt);
        setHasDefault(true);
        setIsEditing(false);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to save prompt"))
      .finally(() => setSaving(false));
  };

  const handleReset = () => {
    if (isEditing) {
      setEditText(prompt);
      setIsEditing(false);
      return;
    }
    setSaving(true);
    setError("");
    resetSagePrompt()
      .then((res) => setPrompt(res.data.prompt))
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to reset prompt"))
      .finally(() => setSaving(false));
  };

  if (loading) return <SageAiLoader />;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-[18px] sm:text-[24px] font-bold font-arial leading-[32px] text-charcoal">
          Sage AI Settings
        </h1>
        <p className="text-[14px] leading-[20px] font-arial font-bold text-[#6b6b6b]">
          Dashboard / AI &amp; Engagement / Sage AI Settings
        </p>
      </div>

      {/* Configuration Card — full width, clickable */}
      <button
        onClick={handleOpenModal}
        className="w-full text-left rounded-[14px] border border-[#f3f4f6] shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.1)] flex flex-col gap-4 pl-[26px] pr-5 pt-5 pb-5 cursor-pointer hover:shadow-[0px_2px_6px_rgba(0,0,0,0.12)] transition-shadow"
        style={{
          backgroundImage:
            "linear-gradient(172deg, rgba(168,181,160,0.2) 0%, rgba(213,202,227,0.2) 50%, rgba(232,196,184,0.2) 100%)",
        }}
      >
        <p className="text-[20px] font-medium leading-[20px] text-charcoal font-arial">
          Sage AI Configuration
        </p>

        <div className="flex items-center gap-3 h-[44px]">
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(168,181,160,0.2) 0%, rgba(213,202,227,0.2) 50%, rgba(232,196,184,0.2) 100%)",
            }}
          >
            <SpeakerWaveIcon className="h-5 w-5 text-[#6b6b6b]" />
          </div>
          <div className="flex flex-col">
            <p className="text-[18px] sm:text-[24px] font-semibold leading-[30px] text-[#2d2d2d] font-cormorant">
              Voice and ChatBot Model
            </p>
            <p className="text-[12px] font-normal leading-[1.3] text-[#6b6b6b] font-inter">
              Warm, empathetic female voice
            </p>
          </div>
        </div>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
          <div className="w-full max-w-3xl bg-[#fafafa] rounded-[24px] p-4 sm:p-8 flex flex-col gap-[20px] shadow-2xl max-h-[90vh]">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-[16px] sm:text-[24px] font-semibold leading-[1.5] text-charcoal font-inter">
                Voice Assistance and ChatBot Configuration
              </h2>
              <button
                onClick={handleCloseModal}
                className="shrink-0 h-[44px] w-[44px] flex items-center justify-center rounded-full hover:bg-black/5 transition-colors cursor-pointer text-[#2b2b2b]"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 overflow-hidden">
              <p className="text-[18px] font-medium leading-[1.5] text-[#171717] shrink-0">
                Sage AI Prompt
              </p>

              {isEditing ? (
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full h-[260px] sm:h-[420px] lg:h-[520px] border-[0.5px] border-[#a3a3a3] rounded-[8px] px-4 py-[17px] text-[13px] text-[#2b2b2b] leading-[1.3] resize-none outline-none focus:border-sageGreen transition-colors"
                />
              ) : (
                <div
                  className="border-[0.5px] border-[#a3a3a3] rounded-[8px] px-4 py-[17px] overflow-y-auto h-[260px] sm:h-[420px] lg:h-[520px]"
                  style={{ backdropFilter: "blur(15px)" }}
                >
                  <p className="whitespace-pre-wrap text-[13px] leading-[1.3] text-[#171717] font-inter">
                    {prompt}
                  </p>
                </div>
              )}
              {error && <p className="text-[12px] text-red-600 font-inter">{error}</p>}
            </div>

            {/* Footer — 3 equal buttons */}
            <div className="flex items-center gap-[30px] shrink-0">
              {/* Reset */}
              <div className="flex-1 flex items-center justify-center">
                <button
                  onClick={handleReset}
                  disabled={saving || (!isEditing && !hasDefault)}
                  className="text-[16px] font-bold text-sageGreen hover:opacity-70 transition-opacity cursor-pointer disabled:opacity-40 disabled:cursor-default"
                >
                  Reset to default
                </button>
              </div>

              {/* Edit */}
              <div className="flex-1">
                <button
                  onClick={handleEdit}
                  disabled={isEditing || saving}
                  className="w-full h-[48px] border border-sageGreen rounded-[8px] text-sageGreen text-[16px] font-bold hover:bg-sageGreen/5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
                >
                  Edit
                </button>
              </div>

              {/* Save */}
              <div className="flex-1">
                <button
                  onClick={handleSave}
                  disabled={!isEditing || saving}
                  className="w-full h-[48px] bg-sageGreen rounded-[8px] text-white text-[16px] font-bold hover:bg-sageGreen/90 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
