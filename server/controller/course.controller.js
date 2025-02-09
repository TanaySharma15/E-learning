import mongoose from "mongoose";
import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
export const createCourse = async (req, res) => {
    try {
        const { courseTitle, category } = req.body
        if (!courseTitle || !category) {
            return res.status(401).json({
                message: "Fields are missing"
            })
        }
        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id
        })
        return res.status(201).json({
            message: "Course created successfully "
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "SERVER Error"
        })
    }
}

export const getPublishedCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate({ path: "creator", select: "name photoUrl" })
        if (!courses) {
            return res.status(400).json({
                message: "Courses not found"
            })
        }
        return res.status(200).json({
            courses
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get courses"
        })
    }
}
export const getCreatorCourses = async (req, res) => {
    try {
        const userId = req.id;
        const courses = await Course.find({ creator: userId })
        if (!courses) {
            return res.status(401).json({
                courses: [],
                message: "Courses not found"
            })
        }
        return res.status(200).json(
            { courses }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Errror"
        })

    }
}

export const editCourse = async (req, res) => {
    try {
        const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
        const thumbnail = req.file
        const courseId = req.params.courseId
        let course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).json({
                message: "course not found"
            })
        }
        let courseThumbnail;
        if (thumbnail) {
            if (course.courseThumbnail) {
                const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
                await deleteMediaFromCloudinary(publicId)
            }
            courseThumbnail = await uploadMedia(thumbnail.path)
        }
        const updatedData = { courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail: courseThumbnail?.secure_url }

        course = await Course.findByIdAndUpdate(courseId, updatedData, { new: true })
        return res.status(200).json({
            course,
            message: "Course updated successfull"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error while updating course"
        })
    }

}
export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(401).json({
                message: "Course not found"
            })
        }
        return res.status(200).json({
            course
        })
    } catch (error) {
        return res.status(500).json({
            message: "Unable to get course"
        })
    }

}

export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body
        const { courseId } = req.params
        if (!lectureTitle || !courseId) {
            return res.status(400).json({
                message: "Lecture title and course ID are required",
            });
        }
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                message: "Invalid course ID",
            });
        }
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }
        const lecture = await Lecture.create({ lectureTitle })

        course.lectures.push(lecture._id)
        await course.save()

        return res.status(200).json({
            lecture,
            message: "lecture created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to create lecture"
        })
    }
}

export const getLecture = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate("lectures")



        if (!course) {
            return res.status(404).json({
                message: "lectures not found"
            })
        }
        return res.status(200).json({
            lecture: course.lectures
        })
    } catch (error) {
        return res.status(500).json({
            message: "SErver error"
        })
    }
}

export const editLecture = async (req, res) => {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body
    const courseId = req.params.courseId;
    const lectureId = req.params.lectureId

    try {

        const lecture = await Lecture.findById(lectureId)
        console.log("lecture" + lecture);


        if (!lecture) {
            return res.status(400).json({
                message: "lecture not found for updating"
            })
        }
        if (lectureTitle) lecture.lectureTitle = lectureTitle

        if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl
        console.log(lecture.videoUrl);

        if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId
        console.log(lecture.publicId);

        lecture.isPreviewFree = isPreviewFree

        await lecture.save();

        const course = await Course.findById(courseId)
        if (course && !course.lectures.includes(lecture._id)) {
            course.lectures.push(lecture._id)
            await course.save()
        };
        return res.status(200).json({
            message: "Lecture updated"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Failed to get lecture"
        })
    }
}

export const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params
        const lecture = await Lecture.findByIdAndDelete(lectureId)
        if (!lecture) {
            return res.status(400).json({
                message: "lecture not found"
            })
        }
        try {
            if (lecture.publicId) {
                await deleteVideoFromCloudinary(lecture.publicId)
            }
        } catch (error) {
            console.log("Error deleting video from cloudinary");

            console.log(error);

        }

        await Course.updateOne(
            { lectures: lectureId },
            { $pull: { lectures: lectureId } }
        )
        return res.status(200).json({
            message: "Lecture removed"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get lecture"
        })
    }
}

export const getLectureById = async (req, res) => {
    try {
        const { lectureId } = req.params
        const lecture = await Lecture.findById(lectureId)
        if (!lecture) {
            return res.status(400).json({
                message: "lecture not found"
            })
        }
        return res.status(200).json({
            lecture
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get lecture"
        })
    }
}

export const togglePublishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { publish } = req.query;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found!"
            });
        }
        course.isPublished = publish === "true";
        await course.save();

        const statusMessage = course.isPublished ? "Published" : "Unpublished";
        return res.status(200).json({
            message: `Course is ${statusMessage}`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to update status"
        })
    }
}