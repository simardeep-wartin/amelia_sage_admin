"use client";

import AuthSuccessModal from "@/components/auth/AuthSuccessModal";

interface ResetLinkSentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResetLinkSentModal({ isOpen, onClose }: ResetLinkSentModalProps) {
  return (
    <AuthSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      title="Reset Link Sent Successfully"
      message="We've sent password reset instructions to your registered email address. Please check your inbox and follow the link to create a new password."
    />
  );
}
