export function getNameInitials(name: string) {
  const [firstName, lastName] = name.split(' ');
  const firstLetter = firstName[0];
  const secondLetter = lastName?.[0];

  return secondLetter != null ? `${firstLetter} ${secondLetter}` : secondLetter;
}
