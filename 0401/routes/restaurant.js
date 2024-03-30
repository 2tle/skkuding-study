import {Router} from "express";
import service from "../services/restaurant.js"
import wrapper from "../utils/services.js"

const router = Router();

router.route('/')
    .get(wrapper(service.getAll))
    .post(wrapper(service.post))

router.route('/:name')
    .get(wrapper(service.getOneByName))
    .patch(wrapper(service.patchOneByName))
    .delete(wrapper(service.deleteOneByName))


export default router