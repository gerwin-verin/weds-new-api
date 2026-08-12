// routes/users.js
const express = require("express");
const router = express.Router();
const db = require("../config.js");
const { Filter } = require("firebase-admin/firestore"); // Ambil kelas Filter dari subpath

const RSVP_COLLECTION = "rsvpcollection";

router.post("/insertRsvp", async (req, res) => {
  try {
    const rsvp = {
      documentId: req.body.documentId,
      name: req.body.name,
      confirmed: req.body.confirmed,
      confirmedpax: req.body.confirmedpax,
      type: req.body.type,
      wishes: req.body.wishes,
    };
    const response = db.collection(RSVP_COLLECTION).add(rsvp);
    console.log(response);
    return res
      .status(200)
      .json({ success: true, msg: "Data saved successfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error: " + err });
  }
});

router.post("/updateRsvp", async (req, res) => {
  try {
    const id = req.body.id;
    const rsvp = await db.collection(RSVP_COLLECTION).doc(id).update({
      documentId: req.body.documentId,
      name: req.body.name,
      confirmed: req.body.confirmed,
      confirmedpax: req.body.confirmedpax,
      type: req.body.type,
      wishes: req.body.wishes,
    });
    return res
      .status(200)
      .json({ success: true, msg: "Data updated successfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error: " + err });
  }
});

router.post("/deleteRsvp/:id", async (req, res) => {
  try {
    const response = await db
      .collection(RSVP_COLLECTION)
      .doc(req.params.id)
      .delete();
    return res
      .status(200)
      .json({ success: true, msg: "Data delete successfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error: " + err });
  }
});

router.get("/getListRsvp", async (req, res) => {
  try {
    const rsvp = db.collection(RSVP_COLLECTION);
    const response = await rsvp.get();
    let resArr = [];
    response.forEach((doc) => {
      resArr.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return res.status(200).json({ success: true, res: resArr });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error: " + err });
  }
});

router.get("/getRsvp/:id", async (req, res) => {
  try {
    const rsvp = db.collection(RSVP_COLLECTION).doc(req.params.id);
    const response = await rsvp.get();
    return res.status(200).json({ success: true, res: response.data() });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error: " + err });
  }
});

router.post("/test", (req, res) => {
  res.json({ msg: "Test Route Rsvp.js" });
});

module.exports = router;
