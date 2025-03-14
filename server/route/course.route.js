import express, { Router } from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCreatorCourses, getLecture, getLectureById, getPublishedCourses, removeLecture, togglePublishCourse } from "../controller/course.controller.js"
import upload from "../utils/multer.js"
const router = Router()

router.route("/").post(isAuthenticated, createCourse)
router.route("/published-courses").get(isAuthenticated, getPublishedCourses)
router.route("/").get(isAuthenticated, getCreatorCourses)
router.route("/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), editCourse)
router.route("/:courseId").get(isAuthenticated, getCourseById)
router.route("/:courseId/lecture").post(isAuthenticated, createLecture)
router.route("/:courseId/lecture").get(isAuthenticated, getLecture)
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated, editLecture)
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture)
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById)
router.route("/:courseId").post(isAuthenticated, togglePublishCourse)
export default router