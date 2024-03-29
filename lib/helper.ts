const lightColors = [
'#e59898',
'#e5a198',
'#e5aa98',
'#e5b398',
'#e5bc98',
'#e5c598',
'#e5ce98',
'#e5d798',
'#e5e098',
'#e1e598',
'#d8e598',
'#cfe598',
'#c6e598',
'#bde598',
'#b5e598',
'#ace598',
'#a3e598',
'#9ae598',
'#98e5a0',
'#98e5a9',
'#98e5b2',
'#98e5bb',
'#98e5c4',
'#98e5cd',
'#98e5d6',
'#98e5df',
'#98e2e5',
'#98dae5',
'#98d1e5',
'#98c8e5',
'#98bfe5',
'#98b6e5',
'#98ade5',
'#98a4e5',
'#989be5',
'#9f98e5',
'#a898e5',
'#b198e5',
'#ba98e5',
'#c398e5',
'#cc98e5',
'#d498e5',
'#dd98e5',
'#e598e4',
'#e598db',
'#e598d2',
'#e598c9',
'#e598c0',
'#e598b7',
'#e598ae',
'#e598a5',
'#e5989c'
]

export const generateRandomLightBGColor = (): string => {
  return lightColors[Math.floor(Math.random() * lightColors.length)];
}

