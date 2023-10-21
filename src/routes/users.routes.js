import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/appoinment", async (req, res) => {

	try {
		const users = await prisma.appointments.findMany()
		res.status(200).json(users);
	} catch (error) {
		console.log(error);
	}
});

router.post("/appoinment", async (req, res)=>{
	const appoinment= await prisma.appointments.create({
		data: req.body,
	});
	res.json(appoinment)
	
})

router.get("/appoinment/:id_appointment", async (req, res) => {
	const appoinment = await prisma.appointments.findUnique({
		where: {
			id_appointment: Number(req.params.id_appointment),
		}
	});
	res.status(200).json(appoinment);
});

router.patch("/update_appointment/:id_appointment", async (req, res) => {
	try {
		const appoinment = await prisma.appoinment.update({
			where: {
				id_appointment: Number(req.params.id_appointment),
			},
			data: req.body
		});
		res.json(appoinment);
	} catch (error) {
		next(error);
	}
});

router.delete("/delete_appoinment/:id_appointment", async (req, res) => {
	const appoinment = await prisma.appoinment.delete({
		where: {
			id_appointment: Number(req.params.id_appointment),
		},
	});
	res.json(appoinment.quantity);
});



export default router;
