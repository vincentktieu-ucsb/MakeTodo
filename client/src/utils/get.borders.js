import { useGradientAvatarStyles } from '@mui-treasury/styles/avatar/gradient';

export default function Border() {
  return {
    "BLACK": useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: 'black',
      }),
    "SEAWEED GREEN": useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: '#03B2A2',
      }),
    "OCEAN BLUE": useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: '#04A0D3',
      }),
    "PUMPKIN ORANGE": useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: '#DF665A',
      }),
    "VIOLET FADE": useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: 'linear-gradient(to bottom right, #feac5e, #c779d0, #4bc0c8)',
      }),
    "SUNFLOWER ORANGE": useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: '#F4B26A',
      }),
    "none": useGradientAvatarStyles({
        gap: 2,
        thickness: 3,
        gapColor: 'white',
        color: 'white',
      }),
  }
}