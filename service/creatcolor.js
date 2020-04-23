import Color from './../models/Color'

export default async function (payload) {
  try {
    // on check si la couleur existe
    const exist = await Color.find(payload
    )
    if (exist.length !== 0) {
      // la couleur existe on retourne la couleur trouver 
      return { color: exist[0] }
    } else {
      // la couleur existe pas on la cree
      const color = new Color({
        red: payload.red,
        green: payload.green,
        blue: payload.blue,
        alpha: 1
      })
      const bite = await color.save()
      return { color: bite }
    }
  } catch (error) {
    return { error }
  }
}