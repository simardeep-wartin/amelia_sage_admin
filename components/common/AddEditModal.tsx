"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
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

  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

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
      width={layout === "media" ? "max-w-2xl" : "max-w-xl"}
    >
      <form className={`space-y-6 ${layout === "media" ? "max-h-[70vh] overflow-y-auto px-1" : ""}`}>

        {/* Media layout: title, subtitle, duration, description, video, audio */}
        {layout === "media" && (
          <>
            <Input
              label="Add Title"
              placeholder="Enter Title Name"
              {...register("title")}
              error={errors.title?.message}
            />

            <Input
              label="Add Subtitle"
              placeholder="Enter Subtitle Name"
              {...register("subtitle")}
              error={errors.subtitle?.message}
            />

            <Input
              label="Set Duration"
              placeholder="e.g. 5 mins"
              {...register("duration")}
              error={errors.duration?.message}
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
                <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-s font-medium text-charcoal">Add Video File</label>
              <div
                onClick={() => videoInputRef.current?.click()}
                className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#E5E5E5] bg-[#FDFDFD] py-8 transition-colors hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="file"
                  ref={videoInputRef}
                  className="hidden"
                  accept="video/*"
                  onChange={(e) => { if (e.target.files?.[0]) setVideoFile(e.target.files[0]); }}
                />
                <CloudArrowUpIcon className="h-8 w-8 text-[#9898A3] mb-2" strokeWidth={1} />
                <span className="text-sm font-medium text-[#5B4FDB] mb-1">
                  {videoFile ? videoFile.name : "Upload Video Animation"}
                </span>
                <span className="text-xs text-[#A1A1AA]">MP4, MOV up to 5MB</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-s font-medium text-charcoal">Add Audio Script</label>
              <div
                onClick={() => audioInputRef.current?.click()}
                className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#E5E5E5] bg-[#FDFDFD] py-8 transition-colors hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="file"
                  ref={audioInputRef}
                  className="hidden"
                  accept="audio/*"
                  onChange={(e) => { if (e.target.files?.[0]) setAudioFile(e.target.files[0]); }}
                />
                <CloudArrowUpIcon className="h-8 w-8 text-[#9898A3] mb-2" strokeWidth={1} />
                <span className="text-sm font-medium text-[#5B4FDB] mb-1">
                  {audioFile ? audioFile.name : "Upload Audio Script"}
                </span>
                <span className="text-xs text-[#A1A1AA]">MP3, WAV up to 5MB</span>
              </div>
            </div>
          </>
        )}

        {/* Thumbnail layout: name, subtitle, image upload */}
        {layout === "thumbnail" && (
          <>
            <div>
              <label className="block text-[14px] font-bold text-charcoal mb-2">Add Title</label>
              <input
                {...register("name")}
                placeholder="Enter Title Name"
                className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-[10px] text-[14px] outline-none focus:border-sageGreen transition-all placeholder:text-[#D1D1D1]"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <Input
              label="Add Subtitle (Optional)"
              placeholder="Enter Subtitle Name"
              {...register("subtitle")}
              error={errors.subtitle?.message}
            />

            <div>
              <label className="block text-[14px] font-bold text-charcoal mb-2">
                {thumbnailLabel}
              </label>
              <div
                className="relative group cursor-pointer"
                onClick={() => imageInputRef.current?.click()}
              >
                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-[#E5E5E5] rounded-[20px] bg-[#FDFDFD] hover:border-sageGreen transition-all">
                  <div className="flex flex-col items-center gap-2">
                    <CloudArrowUpIcon className="h-10 w-10 text-[#D1D1D1] group-hover:text-sageGreen transition-colors" />
                    <p className="text-[14px] font-semibold text-sageGreen hover:underline">
                      {thumbnailFile ? thumbnailFile.name : "Upload Icon File"}
                    </p>
                    <p className="text-[11px] text-[#A1A1A1]">PNG, JPG up to 5MB (recommended: 40x40px)</p>
                  </div>
                </div>
                <input
                  type="file"
                  ref={imageInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => { if (e.target.files?.[0]) setThumbnailFile(e.target.files[0]); }}
                />
              </div>
            </div>
          </>
        )}
      </form>
    </Modal>
  );
}
