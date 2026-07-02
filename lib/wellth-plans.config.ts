export type FieldType = "text" | "textarea" | "upload" | "select";

export interface FormField {
  name: string;
  label?: string;
  placeholder?: string;
  type: FieldType;
  options?: string[]; // For select
  validation?: {
    required?: boolean;
    pattern?: string;
  };
}

export interface ModalConfig {
  title: string;
  description?: string;
  fields?: FormField[];
  actionText: string;
  showDraftAction?: boolean;
  showDraftOnEdit?: boolean;
  tabs?: {
    label: string;
    fields: FormField[];
  }[];
}

export const WELLTH_MODAL_CONFIG: Record<string, ModalConfig> = {
  addWellthPlan: {
    title: "Add New Wellth Plan",
    fields: [
      {
        name: "name",
        label: "Add Wellth Plan Name",
        placeholder: "Enter Name",
        type: "text",
        validation: { required: true },
      },
      {
        name: "sub_title",
        label: "Add Sub Title",
        placeholder: "Enter Sub Title",
        type: "textarea",
      },
      {
        name: "icon",
        label: "Add Icon",
        type: "upload",
      },
    ],
    actionText: "+ Add New Wellth Plan",
  },
  editPlan: {
    title: "Edit Wellth Plan",
    fields: [
      {
        name: "title",
        label: "Plan Title",
        placeholder: "Enter title",
        type: "text",
        validation: { required: true },
      },
      {
        name: "sub_title",
        label: "Sub Title",
        placeholder: "Enter subtitle",
        type: "textarea",
      },
      {
        name: "icon",
        label: "Edit Icon",
        type: "upload",
      },
    ],
    actionText: "Save Changes",
  },
  addExercise: {
    title: "Add New Exercise",
    fields: [
      {
        name: "title",
        label: "Add Title",
        placeholder: "Enter Title",
        type: "text",
        validation: { required: true },
      },
      {
        name: "description",
        label: "Add Description",
        placeholder: "Add Description Here",
        type: "textarea",
      },
    ],
    actionText: "+ Publish Exercise",
    showDraftAction: true,
  },
  addIntro: {
    title: "Create Intro Screen",
    tabs: [
      {
        label: "Intro Screen",
        fields: [
          {
            name: "subtitle",
            label: "Add Subtitle",
            placeholder: "Enter Subtitle",
            type: "text",
            validation: { required: true },
          },
          {
            name: "sageSays",
            label: "Sage Says",
            placeholder: "Enter Sage Says",
            type: "text",
          },
          {
            name: "description",
            label: "Add Description",
            placeholder: "Add Description Here",
            type: "textarea",
          },
        ],
      },
      {
        label: "Sub-intro Screen",
        fields: [
          {
            name: "subIntroTitle",
            label: "Add Title",
            placeholder: "Enter Title",
            type: "text",
            validation: { required: true },
          },
          {
            name: "subIntroDescription",
            label: "Add Description",
            placeholder: "Add Description Here",
            type: "textarea",
          },
          {
            name: "subIntroFocusedIntension",
            label: "Add Focused Intension",
            placeholder: "Add Focused Intension Here",
            type: "textarea",
          },
        ],
      },
    ],
    actionText: "+ Add Intro Screen",
  },
};

export const WELLTH_PANEL_CONFIG = {
  emptyState: {
    title: "No Exercises Yet",
    description:
      "You have not added any exercises yet. Start building your routine by adding exercises tailored to your goals.",
    actions: [
      { label: "+ Create Intro Screen", variant: "outline" as const, action: "addIntro" },
      { label: "+ Create New Exercise", variant: "solid" as const, action: "addExercise" },
    ],
  },
};
