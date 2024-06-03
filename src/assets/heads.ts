import m from '@/assets/1.png'
import w from '@/assets/2.png'

export const gethead = (gender: string): string => {
  if (gender == '1') {
    return m
  } else {
    return w
  }
}
