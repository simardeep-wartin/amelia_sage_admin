"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FileUploadZone from "@/components/ui/FileUploadZone";
import { thumbnailItemSchema, mediaItemSchema } from "@/lib/validators/common";

// "thumbnail" layout: name, subtitle, image upload  (categories, emotions, focus, plan sections, etc.)
// "media"     layout: title, subtitle, duration, description, video, audio  (exercises, modules, activities, etc.)
export type ModalLayout = "thumbnail" | "media";

export interface AddEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  layout: ModalLayout;
  title: string;
  showDraft?: boolean;
  thumbnailLabel?: string;
  initialData?: any;
}

export default function AddEditModal({
  isOpen,
  onClose,
  onSave,
  layout,
  title,
  showDraft = false,
  thumbnailLabel = "Add Thumbnail Image",
  initialData,
}: AddEditModalProps) {
  const schema = layout === "media" ? mediaItemSchema : thumbnailItemSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      name: "",
      title: "",
      subtitle: "",
      duration: "",
      description: "",
      status: "active",
    },
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      reset(initialData || {
        name: "",
        title: "",
        subtitle: "",
        duration: "",
        description: "",
        status: "active",
      });
      setVideoFile(null);
      setAudioFile(null);
      setThumbnailFile(null);
    }
  }, [isOpen, initialData, reset]);

  const onSubmit = (data: any) => {
    onSave({ ...data, videoFile, audioFile, thumbnailFile });
    onClose();
  };

  const handleSaveDraft = (data: any) => {
    onSave({ ...data, status: "draft", videoFile, audioFile, thumbnailFile });
    onClose();
  };

  const footer = (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <Button
        variant="outline"
        onClick={onClose}
        className="flex-1 text-[#475569] border-[#E5E5E5] hover:bg-gray-50 h-auto py-3 rounded-[12px]"
      >
        Cancel
      </Button>
      {showDraft && (
        <Button
          variant="outline"
          onClick={handleSubmit(handleSaveDraft)}
          className="flex-1 text-sageGreen border-sageGreen hover:bg-green-50 h-auto py-3 rounded-[12px]"
        >
          Save as Draft
        </Button>
      )}
      <Button
        variant="solid"
        onClick={handleSubmit(onSubmit)}
        className="flex-1 h-auto py-3 rounded-[12px] bg-sageGreen hover:bg-sageGreenHover text-white font-semibold"
      >
        {initialData ? "Save Changes" : showDraft ? "Publish" : "Save"}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      maxWidth={layout === "media" ? "max-w-2xl" : "max-w-xl"}
    >
      <form className={`space-y-6 ${layout === "media" ? "max-h-[70vh] overflow-y-auto px-1" : ""}`}>

        {/* Media layout: title, subtitle, duration, description, video, audio */}
        {layout === "media" && (
          <>
            <Input
              label="Add Title"
              placeholder="Enter Title Name"
              {...register("title")}
              error={errors.title?.message as string | undefined}
            />

            <Input
              label="Add Subtitle"
              placeholder="Enter Subtitle Name"
              {...register("subtitle")}
              error={errors.subtitle?.message as string | undefined}
            />

            <Input
              label="Set Duration"
              placeholder="e.g. 5 mins"
              {...register("duration")}
              error={errors.duration?.message as string | undefined}
            />

            <div className="space-y-1">
              <label className="block text-s font-medium text-charcoal">
                Add Description
              </label>
              <textarea
                className="w-full rounded-lg border border-[#ededed] bg-white px-5 py-4 font-normal text-m text-charcoal placeholder:text-[#e1e1e1] outline-none transition focus:border-sageGreen/55 focus:ring-2 focus:ring-sageGreen/20 min-h-[100px] resize-none"
                placeholder="Add Description Here"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">{errors.description.message as string}</p>
              )}
            </div>

            <FileUploadZone
              label="Add Video File"
              accept="video/*"
              selectedFile={videoFile}
              onFileSelect={setVideoFile}
              placeholder="Upload Video Animation"
              hint="MP4, MOV up to 5MB"
            />

            <FileUploadZone
              label="Add Audio Script"
              accept="audio/*"
              selectedFile={audioFile}
              onFileSelect={setAudioFile}
              placeholder="Upload Audio Script"
              hint="MP3, WAV up to 5MB"
            />
          </>
        )}

        {/* Thumbnail layout: name, subtitle, image upload */}
        {layout === "thumbnail" && (
          <>
            <div>
              <label className="block text-[14px] font-normal text-charcoal mb-2">Add Title</label>
              <input
                {...register("name")}
                placeholder="Enter Title Name"
                className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-[10px] text-[14px] outline-none focus:border-sageGreen transition-all placeholder:text-[#D1D1D1]"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name.message as string}</p>
              )}
            </div>

            <Input
              label="Add Subtitle (Optional)"
              placeholder="Enter Subtitle Name"
              {...register("subtitle")}
              error={errors.subtitle?.message as string | undefined}
            />

            <FileUploadZone
              label={thumbnailLabel}
              accept="image/*"
              selectedFile={thumbnailFile}
              onFileSelect={setThumbnailFile}
              placeholder="Upload Icon File"
              hint="PNG, JPG up to 5MB (recommended: 40x40px)"
            />
          </>
        )}
      </form>
    </Modal>
  );
}
