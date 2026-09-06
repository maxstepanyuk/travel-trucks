export function toFirstUpperLetter(label: string): string {
  return label.charAt(0).toUpperCase() + label.substring(1).toLocaleLowerCase();
}

export function formatLabelText(label: string): string {
  return label
    .split("_")
    .map((word) => toFirstUpperLetter(word))
    .join(" ");
}

export function abbreviationToUpperCase(text: string): string {
  const ABBREVIATIONS = ["tv", "ac"].map((item) => item.toUpperCase());

  if (ABBREVIATIONS.includes(text.toUpperCase())) {
    return text.toUpperCase();
  }
  return text;
}
