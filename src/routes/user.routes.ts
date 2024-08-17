import { Router } from 'express';
import { addFavoriteApartmentHandler, deleteFavoriteApartmentHandler, deleteUserByIdHandler, getAllUsersHandler, getFavoriteApartmentsHandler, getUserByIdHandler, loginUserHandler, registerUserHandler, updateUserByIdHandler } from '../controller/user.controller';
import { isLoggedIn, isRequestingUserOrAdmin } from '../middleware/auth';
import { ROLES } from '../middleware/userRoles';
import { verifyRole } from '../middleware/verifyRoles';

const router = Router();

const apiURL = '/api/users';

router.post(`${ apiURL }/login`, loginUserHandler);
router.post(`${ apiURL }/register`, registerUserHandler);

router.route(`${ apiURL }/user`)
    .get(
        isLoggedIn,
        isRequestingUserOrAdmin,
        getUserByIdHandler
    )
    .put(
        isLoggedIn,
        isRequestingUserOrAdmin,
        updateUserByIdHandler
    )
    .delete(
        isLoggedIn,
        verifyRole(ROLES.ADMIN),
        deleteUserByIdHandler
    )
router.route(`${ apiURL }/`).get(
    isLoggedIn,
    verifyRole(ROLES.ADMIN),
    getAllUsersHandler
)

router.route(`${ apiURL }/user/favorites`)
    .get(
        isLoggedIn,
        getFavoriteApartmentsHandler
    )
    .post(
        isLoggedIn,
        isRequestingUserOrAdmin,
        addFavoriteApartmentHandler
    )
    .delete(
        isLoggedIn,
        isRequestingUserOrAdmin,
        deleteFavoriteApartmentHandler
)

export default router;

