export const auth = {
  login: (email: string, password: string) => ({ email, password }),
};

export const wealthPlans = {
  create: (title: string, subTitle: string, imageUrl = "") => ({
    title,
    sub_title: subTitle,
    image_url: imageUrl,
  }),

  update: (title: string, subTitle: string, imageUrl = "") => ({
    title,
    sub_title: subTitle,
    image_url: imageUrl,
  }),
};

export const introScreen = {
  update: (
    subtitle: string,
    sageSays: string,
    description: string,
    isDraft = false,
    introTitle = "",
    introDescription = "",
    focusedIntentions: string[] = [],
  ) => ({
    subtitle,
    sage_says: sageSays,
    description,
    is_draft: isDraft,
    intro_title: introTitle,
    intro_description: introDescription,
    focused_intentions: focusedIntentions,
  }),
};

export const focusAreas = {
  create: (title: string, description: string, sortOrder: number, imageUrl = "") => ({
    title,
    description,
    image_url: imageUrl,
    sort_order: sortOrder,
  }),

  update: (title: string, description: string, imageUrl: string) => ({
    title,
    description,
    image_url: imageUrl,
  }),
};

export const feelings = {
  create: (title: string, description: string, imageUrl = "") => ({
    title,
    description,
    image_url: imageUrl,
  }),

  update: (title: string, description: string, imageUrl: string) => ({
    title,
    description,
    image_url: imageUrl,
  }),
};

export const exercises = {
  create: (title: string, description: string, isDraft = false) => ({
    title,
    description,
    is_draft: isDraft,
  }),

  edit: (title: string, description: string, isDraft = false) => ({
    title,
    description,
    is_draft: isDraft,
  }),
};
