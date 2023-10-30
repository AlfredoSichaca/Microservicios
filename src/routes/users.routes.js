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
	const auxAppoinment = await prisma.appointments.findUnique({
		OR:[
			{
				where: {
					id_doctor: Number(req.params.id_doctor),
					start_time: req.params.start_time,
				},
			},
			{
				where: {
					id_user: Number(req.params.id_user),
					start_time: req.params.start_time,
				},
			}
		]
	});
	if(!auxAppoinment)
		return res.status(400).json({ error: "appoinment already exist"});

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
	if(!appoinment)
		return res.status(404).json({ error: "appoinment not found"});

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
		if(!appoinment)
			return res.status(404).json({ error: "appoinment not found"});
	}
});

router.delete("/delete_appoinment/:id_appointment", async (req, res) => {
	const appoinment = await prisma.appoinment.delete({
		where: {
			id_appointment: Number(req.params.id_appointment),
		},
	});

	if(!appoinment)
		return res.status(404).json({ error: "appoinment not found"});

	res.json(appoinment.quantity);
});



export default router;
