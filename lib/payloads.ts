export const auth = {
  login: (email: string, password: string) => ({ email, password }),
};

export const wealthPlans = {
  create: (title: string, subTitle: string, imageUrl = "") => ({
    title,
    sub_title: subTitle,
    image_url: imageUrl,
  }),

  update: (title: string, subTitle: string) => ({
    title,
    sub_title: subTitle,
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
  create: (title: string, subTitle: string, sortOrder: number, imageUrl = "") => ({
    title,
    sub_title: subTitle,
    image_url: imageUrl,
    sort_order: sortOrder,
  }),
};

export const feelings = {
  create: (title: string, subTitle: string, imageUrl = "") => ({
    title,
    sub_title: subTitle,
    image_url: imageUrl,
  }),

  update: (title: string, subTitle: string, imageUrl: string) => ({
    title,
    sub_title: subTitle,
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
