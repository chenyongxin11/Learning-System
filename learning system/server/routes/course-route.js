const router = require("express").Router();
const courseValidation = require("../validation").courseValidation;
const Course = require("../models").courseModel;

router.use((req, res, next) => {
  console.log("A require is coming in to course-route.js");
  next();
});

router.get("/", (req, res) => {
  Course.find({})
    .populate("teacher", ["username", "email"])
    .then((course) => {
      res.send(course);
    })
    .catch((e) => {
      res.status(500).send("Error with find all course");
    });
});

router.post("/", async (req, res) => {
  const { error } = courseValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  if (req.user.idStudent()) {
    return res.status(400).send("only teacher can post a course");
  }
  let newCourse = new Course({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    teacher: req.user._id,
  });
  try {
    await newCourse.save();
    return res.status(200).send("course has been saved");
  } catch (e) {
    res.status(400).send("course saved failed");
  }
});

router.get("/teacher/:_teacher_id", (req, res) => {
  let { _teacher_id } = req.params;
  Course.find({ teacher: _teacher_id })
    .populate("teacher", ["username", "email"])
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send("Cannot get course data.");
    });
});

router.get("/student/:_student_id", (req, res) => {
  let { _student_id } = req.params;
  Course.find({ student: _student_id })
    .populate("teacher", ["username", "email"])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(500).send("Cannot get course data.");
    });
});

router.get("/find/:name", (req, res) => {
  let { name } = req.params;
  Course.find({ title: name })
    .populate("teacher", ["email", "username"])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.post("/enroll/:_id", async (req, res) => {
  let { _id } = req.params;
  let { user_id } = req.body;
  try {
    let course = await Course.findOne({ _id });
    course.student.push(user_id);
    await course.save();
    res.send("Enrollment succeed");
  } catch (e) {
    req.send(e);
  }
});

router.get("/:_id", (req, res) => {
  let { _id } = req.params;
  Course.findById({ _id })
    .populate("teacher", ["email"])
    .then((course) => {
      res.status(200).send(course);
    })
    .catch((e) => {
      res.status(500).send("Error with find course");
    });
});

router.patch("/:_id", async (req, res) => {
  let { error } = courseValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let { _id } = req.params;
  let course = Course.findById({ _id });
  if (!course) {
    res.status(404);
    return res.json({
      seccess: false,
      message: "Course not found.",
    });
  }

  if ((course.teacher = req.user._id || req.user.isAdmin())) {
    Course.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then(() => {
        res.send("Course uppdated");
      })
      .catch((e) => {
        return res.json({
          seccess: false,
          message: e,
        });
      });
  } else {
    res.status(403);
    return res.json({
      seccess: false,
      message: e,
    });
  }
});

router.delete("/:_id", (req, res) => {
  let { _id } = req.params;
  let course = Course.findById({ _id });
  if (!course) {
    res.status(404);
    return res.json({
      seccess: false,
      message: "Course not found.",
    });
  }
  if ((course.teacher = req.user._id || req.user.isAdmin())) {
    Course.findOneAndDelete({ _id })
      .then(() => {
        res.send("Course deleted");
      })
      .catch((e) => {
        return res.json({
          seccess: false,
          message: e,
        });
      });
  } else {
    res.status(403);
    return res.json({
      seccess: false,
      message: e,
    });
  }
});

module.exports = router;
