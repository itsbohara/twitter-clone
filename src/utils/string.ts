export function capitalize(str: String) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// return first letters from name
export function getNameInitials(name: String) {
  const _name = name.split(" ");
  if (_name.length < 2) return capitalize(name.slice(0, 2));
  return _name[0].charAt(0).toUpperCase() + _name[1].charAt(0).toUpperCase();
}
