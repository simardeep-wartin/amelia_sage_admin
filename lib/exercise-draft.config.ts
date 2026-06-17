import type { ModalConfig } from "@/lib/wellth-plans.config";

export const EXERCISE_DRAFT_MODAL_CONFIG: Record<string, ModalConfig> = {
  editEntry: {
    title: "Edit Draft Exercise",
    fields: [
      {
        name: "title",
        label: "Title",
        placeholder: "Enter title",
        type: "text",
        validation: { required: true },
      },
      {
        name: "description",
        label: "Description",
        placeholder: "Enter description",
        type: "text",
        validation: { required: false },
      },
    ],
    actionText: "Save Changes",
  },
};
