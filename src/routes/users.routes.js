import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         start_time:
 *           type: string
 *         status:
 *           type: string
 *         notes:
 *           type: string
 *         price_cop:
 *           type: integer
 *         end_time:
 *           type: string
 *         id_user:
 *           type: integer
 *         id_doctor:
 *           type: integer
 */



/**
 * @swagger
 * /appoinment:
 *   get:
 *     summary: Obtener todas las citas
 *     tags: [Appointments]

 *     responses:
 *       200:
 *         description: Lista de citas
 */

router.get("/appoinment", async (req, res) => {
	try {
		const users = await prisma.appointments.findMany()
		res.status(200).json(users);
	} catch (error) {
		console.log(error);
	}
});
/**
 * @swagger
 * /appoinment:
 *   post:
 *     summary: Crear una nueva cita médica
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: Cita médica creada con éxito
 *       500:
 *         description: Error interno del servidor
 */

router.post("/appoinment", async (req, res)=>{
	const auxAppoinment = await prisma.appointments.findFirst({
		where: {
			OR:[
				{
					id_doctor: Number(req.body.id_doctor),
					start_time: req.body.start_time,
				},
				{
					id_user: Number(req.body.id_user),
					start_time: req.body.start_time,
				},
			]
		}
	});
	if(auxAppoinment)
		return res.status(400).json({ error: "appoinment already exist"});

	const appoinment= await prisma.appointments.create({
		data: req.body,
	});
	res.json(appoinment)
	
})


/**
 * @swagger
 * /appoinment/{id_appointment}:
 *   get:
 *     summary: Obtener una cita médica por ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id_appointment
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la cita médica
 *     responses:
 *       200:
 *         description: Datos de la cita médica obtenidos con éxito
 *       404:
 *         description: Cita médica no encontrada
 *       500:
 *         description: Error interno del servidor
 */


router.get("/appoinment/:id_appointment", async (req, res) => {
	const appoinment = await prisma.appointments.findUnique({
		where: {
			id_appointment: Number(req.params.id_appointment),
		}
	});
	if(!appoinment)
		return res.status(404).json({ error: "appoinment not found"});

	res.status(200).json(appoinment);
});
/**
 * @swagger
 * /update_appointment/{id_appointment}:
 *   patch:
 *     summary: Actualizar una cita médica por ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id_appointment
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la cita médica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: Cita médica actualizada con éxito
 *       500:
 *         description: Error interno del servidor
 */

router.patch("/update_appointment/:id_appointment", async (req, res) => {
	try {
		const appoinment = await prisma.appointments.update({
			where: {
				id_appointment: Number(req.params.id_appointment),
			},
			data: req.body
		});
		res.json(appoinment);
	} catch (error) {
		return res.status(404).json({ error: "appoinment not found"});
	}
});
/**
 * @swagger
 * /delete_appoinment/{id_appointment}:
 *   delete:
 *     summary: Eliminar una cita médica por ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id_appointment
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la cita médica
 *     responses:
 *       200:
 *         description: Cita médica eliminada con éxito
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/delete_appoinment/:id_appointment", async (req, res) => {
	try {
		const appoinment = await prisma.appointments.delete({
			where: {
				id_appointment: Number(req.params.id_appointment),
			},
		});
	
		res.json(appoinment.quantity);
	} catch (error) {
		return res.status(404).json({ error: "appoinment not found"});
	}
});

/**
 * @swagger
 * /appoinment_doctor/{id_doctor}:
 *   get:
 *     summary: Obtener las citas de cada medico
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id_doctor
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del médico
 *     responses:
 *       200:
 *         description: Datos de la cita médica obtenidos con éxito
 *       404:
 *         description: Cita médica no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/appoinment_doctor/:id_doctor", async (req, res) => {
	const appoinment = await prisma.appointments.findMany({
		where: {
			id_doctor: Number(req.params.id_doctor),
		}
	});
	if(!appoinment)
		return res.status(404).json({ error: "appoinment not found"});

	res.status(200).json(appoinment);
});
 



export default router;
