export function validateInputTask(title: string): {
  value: string;
  error: string | null;
} {
  const value = title.trim();
  if (!value) {
    return {
      value,
      error: "Title cannot be empty",
    };
  }

  if (value.length > 20) {
    return {
      value,
      error: "Title cannot exceed 20 characters",
    };
  }

  if (value.length < 3) {
    return {
      value,
      error: "Title must be at least 3 characters long",
    };
  }

  return { value, error: null };
}
