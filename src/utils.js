export const generateAvatarName = name => (
  name.split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
);