const express = require('express');

const {validation,ctrlWrapper,auth,upload} =require("../../middlewares");
const {users:ctrl}=require("../../controllers");
const {joiUserSchema, joiSubscriptionSchema} = require("../../models/user")

const router = express.Router()

router.post('/signup',validation(joiUserSchema), ctrlWrapper(ctrl.signup))
router.post('/login',validation(joiUserSchema),ctrlWrapper(ctrl.login))
router.get('/current',auth,ctrlWrapper(ctrl.getCurrent))
router.get('/logout',auth,ctrlWrapper(ctrl.logout))
router.patch('/:id/subscription',auth,validation(joiSubscriptionSchema),ctrlWrapper(ctrl.patchSubscription))
router.patch('/avatars',auth,upload.single('avatar'),ctrlWrapper(ctrl.updateAvatar))
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/verify", ctrlWrapper(ctrl.reVerifyEmail));
module.exports=router