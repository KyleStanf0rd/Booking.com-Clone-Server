import express from "express";
import { deleteUsers, getAllUsers, getUsers, updateUsers } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

//BASIC ROUTES FOR USERS

const router = express.Router();

/*
router.get("/checkauthentication", verifyToken, (req, res, next)=>{
    res.send("hello user, you are logged in")
})

router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
    res.send("hello user, you are logged in and can delete your account")
})

router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
    res.send("hello admin, you are logged in and can delete all accounts")
})
*/

//UPDATE
router.put("/:id", verifyUser, updateUsers);

//DELETE
router.delete("/:id", verifyUser, deleteUsers);

//GET
router.get("/:id", verifyUser, getUsers);

//GET ALL
router.get("/", verifyAdmin, getAllUsers)

export default router