import LogeController from "../controllers/loge";
import { BaseRouter } from "./base";

/**
 * @swagger
 * components:
 *   schemas:
 *     TypeLogeInputCreate:
 *       type: object
 *       required:
 *         - service_id
 *         - patient_id
 *       properties:
 *         service_id:
 *           type: string
 *           description: id of service
 *         patient_id:
 *           type: string
 *           description: id of patient
 *       example:
 *         service_id: fg4sdfgdfg5sdfgdfg
 *         patient_id: fg4sdfgdfg5sdfgdfg
 *
 *     TypeLogeInputValidate:
 *       type: object
 *       required:
 *         - doctor_id
 *       properties:
 *         doctor_id:
 *           type: string
 *           description: id of doctor
 *         date_meeting:
 *           type: string
 *           description: date of meeting
 *         duration:
 *           type: natural number
 *           description: duration of the meeting in minutes
 *       example:
 *         doctor_id: fg4sdfgdfg5sdfgdfg
 *         date_meeting: 2024-06-04T08:07:51
 *         duration: 30
 *
 */

/**
 * @swagger
 * tags:
 *   name: TypeLoge
 *   description: The typeLoge managing API
 */
class LogeRouter extends BaseRouter {
  controller: LogeController;
  intializeRoutes() {
    this.controller = new LogeController();

    /**
     * @swagger
     * /typeLoge:
     *   get:
     *     summary: Get list of the typeLoge
     *     tags: [TypeLoge]
     *     parameters:
     *       - in: query
     *         name: service_id
     *         schema:
     *           type: string
     *         description: The service id
     *       - in: query
     *         name: patient_id
     *         schema:
     *           type: string
     *         description: The loge id
     *     responses:
     *       200:
     *         description: The typeLoge
     *       405:
     *         description: Error
     */
    this.router.get("", this.controller.getLoges);

    /**
     * @swagger
     * /typeLoge:
     *   post:
     *     summary: create a typeLoge
     *     tags: [TypeLoge]
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/TypeLogeInputCreate'
     *     responses:
     *       201:
     *         description: Loge added
     *       405:
     *         description: Error
     */
    this.router.post("/new", this.controller.newLoge);

    /**
     * @swagger
     * /typeLoge:
     *   post:
     *     summary: create a typeLoge
     *     tags: [TypeLoge]
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/TypeLogeInputCreate'
     *     responses:
     *       204:
     *         description: Loge deleted
     *       405:
     *         description: Error
     */
    this.router.delete("/delete/:id", this.controller.deleteLoge);
  }
}

const LogeRoutes = new LogeRouter().router;
export default LogeRoutes;
