export const isEyeDropperSupported = () => typeof window !== 'undefined' && 'EyeDropper' in window

export const pickScreenColor = async () => {
  if (!isEyeDropperSupported()) return null

  const eyeDropper = new window.EyeDropper()
  const { sRGBHex } = await eyeDropper.open()

  return sRGBHex ? sRGBHex.toLowerCase() : null
}
