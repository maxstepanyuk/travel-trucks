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

export function formatApiMeters(text: string): string {
  if (text.endsWith("m")) {
    return text.replace("m", " m");
  }
  return text;
}

export function formatApiLiters(text: string): string {
  if (text.endsWith("l")) {
    return text.replace("l", " L");
  }
  return text;
}

export function formatApiKwh(text: string): string {
  if (text.endsWith("kWh")) {
    return text.replace("kWh", " kWh");
  }
  return text;
}

export function formatApiConsumption(text: string): string {
  let formatText = text;

  if (formatText.includes("l")) {
    formatText = formatText.replace("l", " l");
  }

  if (formatText.includes("/")) {
    formatText = formatText.replace("/", " / ");
  }

  if (formatText.includes("km")) {
    formatText = formatText.replace("km", " km");
  }

  return formatText;
}
