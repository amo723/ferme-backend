import RecolteController from "../controllers/recolte";
import { BaseRouter } from "./base";

/**
 * @swagger
 * components:
 *   schemas:
 *     RecolteInputCreate:
 *       type: object
 *       required:
 *         - service_id
 *         - sujet_id
 *       properties:
 *         service_id:
 *           type: string
 *           description: id of service
 *         sujet_id:
 *           type: string
 *           description: id of sujet
 *       example:
 *         service_id: fg4sdfgdfg5sdfgdfg
 *         sujet_id: fg4sdfgdfg5sdfgdfg
 *
 *     EntreSujetInputValidate:
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
 *   name: Sujet
 *   description: The Sujet managing API
 */
class RecolteRouter extends BaseRouter {
  controller: RecolteController;
  intializeRoutes() {
    this.controller = new RecolteController();

    /**
     * @swagger
     * /Sujet:
     *   get:
     *     summary: Get list of the Sujet
     *     tags: [Sujet]
     *     parameters:
     *       - in: query
     *         name: service_id
     *         schema:
     *           type: string
     *         description: The service id
     *       - in: query
     *         name: sujet_id
     *         schema:
     *           type: string
     *         description: The sujet id
     *     responses:
     *       200:
     *         description: The Sujet
     *       405:
     *         description: Error
     */
    this.router.get("", this.controller.getRecoltes);

    /**
     * @swagger
     * /Sujet:
     *   post:
     *     summary: create a Sujet
     *     tags: [Sujet]
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/EntreSujetInputCreate'
     *     responses:
     *       201:
     *         description: The list of sujet
     *       405:
     *         description: Error
     */
    this.router.post("/new", this.controller.newRecolte);

    /**
     * @swagger
     * /Sujet:
     *   post:
     *     summary: delete a recolte
     *     tags: [Sujet]
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/EntreSujetInputCreate'
     *     responses:
     *       204:
     *         description: recolte deleted
     *       405:
     *         description: Error
     */
    this.router.delete("/delete/:id", this.controller.deleteRecolte);
  }
}

const RecolteRoutes = new RecolteRouter().router;
export default RecolteRoutes;
