import {Router} from "express";
import service from "../services/restaurant.js"
import isEmpty from "../utils/isEmpty.js";

const router = Router();

router.route('/')
    .get(async (req, res) => {
        const data = await service.getAll()
        return res.status(200).json({restaurant: data});
    })
    .post(async (req, res) => {
        const { name, address, phone } = req.body;
        const posting = await service.post(name, address, phone);
        if(isEmpty(posting)) return res.status(400).json({error: "이미 해당 맛집 정보가 존재합니다."});
        return res.status(201).json(posting);
    })

router.route('/:name')
    .get(async (req,res) => {
        const { name } = req.params;
        const one = await service.getOneByName(name);
        if(isEmpty(one)) return res.status(404).json({error: "해당 맛집 정보가 존재하지 않습니다."});
        return res.status(200).json(one);
    })
    .patch(async (req,res) => {
        const {name} = req.params;
        const {address, phone} = req.body;
        const patching = await service.patchOneByName(name,address,phone);
        if(!patching) return res.status(404).json({error: "해당 맛집 정보가 존재하지 않습니다."})
        return res.status(200).json(patching); 
    })
    .delete(async (req,res) => {
        const {name} =req.params;
        const remove = await service.deleteOneByName(name);
        if(!remove) return res.status(404).json({error: "해당 맛집 정보가 존재하지 않습니다."})
        return res.status(200).json(remove);
    })


export default router