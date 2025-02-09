import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const COURSE_API = "http://localhost:3000/api/v1/course"



export const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ['Refetch_Creator_Course', 'Refetch_Lecture'],
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ({ courseTitle, category }) => ({
                url: "/",
                method: "POST",
                body: { courseTitle, category }
            }),
            invalidatesTags: ['Refetch_Creator_Course']
        }),
        getPublishedCourse: builder.query({
            query: () => ({
                url: "/published-courses",
                method: "GET"
            })
        }),
        getCreatorCourse: builder.query({
            query: () => ({
                url: "/",
                method: "GET"
            }),
            providesTags: ['Refetch_Creator_Course']
        }),
        editCourse: builder.mutation({
            query: ({ formData, courseId }) => ({  //ek se zyada hota hai to {} me daal dete hai
                url: `/${courseId}`,
                method: "PUT",
                body: formData
            }),
            providesTags: ['Refetch_Creator_Course']
        }),
        getCourseById: builder.query({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: "GET"
            })
        }),
        createLecture: builder.mutation({
            query: ({ lectureTitle, courseId }) => ({
                url: `/${courseId}/lecture`,
                method: "POST",
                body: { lectureTitle }
            }),
        }),
        getCourseLecture: builder.query({
            query: (courseId) => ({
                url: `/${courseId}/lecture`,
                method: "GET"
            }),
            providesTags: ['Refetch_Lecture']

        }),
        editLecture: builder.mutation({
            query: ({ lectureTitle, videoInfo, isPreviewFree, courseId, lectureId }) => ({
                url: `/${courseId}/lecture/${lectureId}`,
                method: "POST",
                body: { lectureTitle, videoInfo, isPreviewFree }
            })
        }),
        removeLecture: builder.mutation({
            query: ({ lectureId }) => ({
                url: `/lecture/${lectureId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Refetch_Lecture']
        }),
        getLectureById: builder.query({
            query: (lectureId) => ({
                url: `/lecture/${lectureId}`,
                method: "GET"
            })
        }),
        publishCourse: builder.mutation({
            query: (courseId, query) => ({
                url: `/${courseId}?publish=${query}`,
                method: "POST"
            })
        })

    })
})
export const { useCreateCourseMutation, useGetPublishedCourseQuery, useGetCreatorCourseQuery, useEditCourseMutation, useGetCourseByIdQuery, useCreateLectureMutation, useGetCourseLectureQuery, useEditLectureMutation, useRemoveLectureMutation, useGetLectureByIdQuery, usePublishCourseMutation } = courseApi