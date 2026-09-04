export function toFirstUpperLetter(label: string): string {
  return label.charAt(0).toUpperCase() + label.substring(1).toLocaleLowerCase();
}

export function formatLabelText(label: string): string {
  return label
    .split("_")
    .map((word) => toFirstUpperLetter(word))
    .join(" ");
}
