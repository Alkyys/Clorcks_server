import { Request, Response, NextFunction } from 'express'

import Color from '../models/Color'
import { isObjectId } from '../utils'

class ColorController {
  /**
   * Add the specified color instance in the request object (req.color).
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  _populate = async (req, res, next) => {
    // TODO: Vérifier que la ressource demandée appartient à l'utilisateur, dans le cas contraire lui renvoyer un 404.
    const { id } = req.params
    
    // This must be a valid objectid
    if (!isObjectId(id)) {
      return res.sendStatus(400)
    }

    try {
      const color = await Color.findById(id)
      const notFound = () => res.sendStatus(404)
      const populate = () => {
        req.color = color
        next()
      }
      return color
        ? populate()
        : notFound()
    } catch (error) {
      error.status = error.name === 'CastError' ? 404 : 500
      return next(error)
    }
  }

  /**
   * Create a new color with the specified field values.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  create = async (req, res, next) => {
    const color = new Color({
      red: req.body.red,
      blue: req.body.blue,
      green: req.body.green,
      alpha: req.body.alpha,
      name: req.body.name,
    })

    // TODO: Ajouter la couleur à un workspace
    
    try {
      await color.save()
      return res.status(201).json(color)
    } catch (error) {
      return next(error)
    }
  }

  /**
   * Return the specified color.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  fetch = (req, res, next) => {
    const { color } = req
    res.json(color)
  }

  /**
   * List all the colors.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  list = async (req, res, next) => {
    try {
      // TODO: Filtrer par workspace
      const colors = await Color.find().limit(50)
      return colors && colors.length > 0
        ? res.json(colors)
        : res.json([])
    } catch (error) {
      return next(error)
    }
  }

  /**
   * update the specified color.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  update = async (req, res, next) => {
    const newAttributes = req.body
    const updatedColor = Object.assign(req.color, newAttributes)
    try {
      await updatedColor.save()
      return res.json(updatedColor)
    } catch (error) {
      return next(error)
    }
  }

  /**
   * Remove the specified color.
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  remove = async (req, res, next) => {
    const { color } = req
    try {
      await color.remove()
      return res.sendStatus(204)
    } catch (error) {
      return next(error)
    }
  }
}

export default new ColorController