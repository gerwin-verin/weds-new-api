// routes/users.js
const express = require("express");
const router = express.Router();
const db = require("./config.js");
const { Filter } = require("firebase-admin/firestore"); // Ambil kelas Filter dari subpath

const GUEST_COLLECTION = "guestcollection";
const website = "https://gerwin-verin.github.io/weds/";

router.post("/insertGuest", async (req, res) => {
  try {
    const guest = {
      name: req.body.name,
      address: req.body.address,
      nohp: req.body.nohp,
      pax: req.body.pax,
      type: req.body.type,
      link: website + "?to=" + req.body.name.replace(/\s+/g, ''),
    };
    console.log("Guest : " + guest);
    const response = db.collection(GUEST_COLLECTION).add(guest);
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

router.post("/updateGuest", async (req, res) => {
  try {
    const id = req.body.id;
    const guest = await db
      .collection(GUEST_COLLECTION)
      .doc(id)
      .update({
        name: req.body.name,
        address: req.body.address,
        nohp: req.body.nohp,
        pax: req.body.pax,
        type: req.body.type,
        link: website + "?to=" + req.body.name.replace(/\s+/g, ''),
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

router.post("/deleteGuest/:id", async (req, res) => {
  try {
    const response = await db
      .collection(GUEST_COLLECTION)
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

router.get("/getListGuest", async (req, res) => {
  try {
    const response = await db.collection(GUEST_COLLECTION).get();
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

router.post("/getGuest/:id", async (req, res) => {
  try {
    const guest = db.collection(GUEST_COLLECTION).doc(req.params.id);
    const response = await guest.get();
    return res.status(200).json({ success: true, res: response.data() });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error: " + err });
  }
});

router.post("/getGuestByName/:name", async (req, res) => {
  try {
    const guest = db.collection(GUEST_COLLECTION).where("name", "==", req.params.name);
    const response = await guest.get();
    return res.status(200).json({ success: true, res: response.docs[0].data() });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error: " + err });
  }
});

router.get("/getGuest/", async (req, res) => {
  try {
    const nameFilter = req.body.namefilter;
    const limitPage = req.body.limit;
    var pageStart = req.body.pageStart;

    if (pageStart = 1) {
      pageStart = 0;
    } else {
      pageStart = pageStart * limitPage;
    }

    const query = db.collection(GUEST_COLLECTION);
    const snapshot = await query
      .where(
        Filter.or(
          Filter.and(
            Filter.where("name", ">", nameFilter),
            Filter.where("name", "<=", nameFilter + "\uf8ff")
          )
        )
      )
      .orderBy("name")
      .startAt(pageStart)
      .limit(limitPage)
      .get();

    const guests = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.status(200).json({ success: true, res: guests });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error: " + err });
  }
});

router.post("/test", (req, res) => {
  res.json({ msg: "Test Route Users.js" });
});

module.exports = router;
