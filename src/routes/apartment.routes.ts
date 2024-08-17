import { Router } from 'express';
import { addApartmentHandler, getApartmentsHandler, updateApartmentHandler, deleteApartmentHandler, getApartmentsInDistance } from '../controller/apartment.controller';
import { isLoggedIn, isRequestedByUserOrAdmin } from '../middleware/auth';

const router = Router();
router.use(isLoggedIn);

router.route('/api/apartments/')
    .get(getApartmentsHandler)
    .post(isLoggedIn, addApartmentHandler)
    .put(isLoggedIn, isRequestedByUserOrAdmin, updateApartmentHandler)
    .delete(isLoggedIn, isRequestedByUserOrAdmin, deleteApartmentHandler);

router.route('/api/apartments/distance')
    .get(isLoggedIn, getApartmentsInDistance)

export default router;