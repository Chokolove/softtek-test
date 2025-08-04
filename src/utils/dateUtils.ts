import { parse, differenceInYears, isValid } from "date-fns";

export function parseBirthday(birthdayStr: string): Date | null {
  const parsedDate = parse(birthdayStr, "dd-MM-yyyy", new Date());
  return isValid(parsedDate) ? parsedDate : null;
}

export function getAge(birthDate: Date | null): number | null {
  if (!birthDate) return null;
  return differenceInYears(new Date(), birthDate);
}
