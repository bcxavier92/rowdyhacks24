export const BODY_1: BodyPart = {
  id: 'body-1',
  imageFile: '../assets/image/parts/body-1.png',
  type: 'body',
}
export const BODY_2: BodyPart = {
  id: 'body-2',
  imageFile: '../assets/image/parts/body-2.png',
  type: 'body',
}
export const EYES_1: BodyPart = {
  id: 'eyes-1',
  imageFile: '../assets/image/parts/eyes-1.png',
  type: 'eyes',
}
export const EYES_2: BodyPart = {
  id: 'eyes-2',
  imageFile: '../assets/image/parts/eyes-2.png',
  type: 'eyes',
}
export const EYES_3: BodyPart = {
  id: 'eyes-3',
  imageFile: '../assets/image/parts/eyes-3.png',
  type: 'eyes',
}
export const EYES_4: BodyPart = {
  id: 'eyes-4',
  imageFile: '../assets/image/parts/eyes-4.png',
  type: 'eyes',
}
export const EYES_5: BodyPart = {
  id: 'eyes-5',
  imageFile: '../assets/image/parts/eyes-5.png',
  type: 'eyes',
}
export const HAT_1: BodyPart = {
  id: 'hat-1',
  imageFile: '../assets/image/parts/hat-1.png',
  type: 'hat',
}
export const HAT_2: BodyPart = {
  id: 'hat-2',
  imageFile: '../assets/image/parts/hat-2.png',
  type: 'hat',
}
export const HAT_3: BodyPart = {
  id: 'hat-3',
  imageFile: '../assets/image/parts/hat-3.png',
  type: 'hat',
}
export const HEAD_1: BodyPart = {
  id: 'head-1',
  imageFile: '../assets/image/parts/head-1.png',
  type: 'head',
}
export const HEAD_2: BodyPart = {
  id: 'head-2',
  imageFile: '../assets/image/parts/head-2.png',
  type: 'head',
}
export const HEAD_3: BodyPart = {
  id: 'head-3',
  imageFile: '../assets/image/parts/head-3.png',
  type: 'head',
}
export const HEAD_4: BodyPart = {
  id: 'head-4',
  imageFile: '../assets/image/parts/head-4.png',
  type: 'head',
}
export const HEAD_5: BodyPart = {
  id: 'head-5',
  imageFile: '../assets/image/parts/head-5.png',
  type: 'head',
}
export const TAIL_1: BodyPart = {
  id: 'tail-1',
  imageFile: '../assets/image/parts/tail-1.png',
  type: 'tail',
}
export const TAIL_2: BodyPart = {
  id: 'tail-2',
  imageFile: '../assets/image/parts/tail-2.png',
  type: 'tail',
}
export const TAIL_3: BodyPart = {
  id: 'tail-3',
  imageFile: '../assets/image/parts/tail-3.png',
  type: 'tail',
}
export const TAIL_4: BodyPart = {
  id: 'tail-4',
  imageFile: '../assets/image/parts/tail-4.png',
  type: 'tail',
}
export const TAIL_5: BodyPart = {
  id: 'tail-5',
  imageFile: '../assets/image/parts/tail-5.png',
  type: 'tail',
}

export const ALL_BODIES: BodyPart[] = [BODY_1, BODY_2]
export const ALL_EYES: BodyPart[] = [EYES_1, EYES_2, EYES_3, EYES_4, EYES_5]
export const ALL_HATS: BodyPart[] = [HAT_1, HAT_2, HAT_3]
export const ALL_TAILS: BodyPart[] = [TAIL_1, TAIL_2, TAIL_3, TAIL_4, TAIL_5]
export const ALL_HEADS: BodyPart[] = [HEAD_1, HEAD_2, HEAD_3, HEAD_4, HEAD_5]

export interface BodyPart {
  id: string
  imageFile: string
  type: 'head' | 'body' | 'eyes' | 'tail' | 'hat'
}
