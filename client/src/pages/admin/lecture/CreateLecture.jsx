import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

function CreateLecture() {
  const [lectureTitle, setLectureTitle] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    createLecture({ lectureTitle, courseId });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Lecture created successfully");
      refetch();
    }
    if (error) {
      toast.error(error.data.message || "Error occured");
    }
  }, [isSuccess, error]);
  return (
    <div className="flex-1 mx-10 mt-24">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add lecture, add some basic lecture details for your new lecture
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="mt-4 flex flex-col gap-2">
          <label htmlFor="input" className=" font-semibold">
            Title
          </label>
          <Input
            type="text"
            name="lectureTitle"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Title Name"
          />
        </div>
        <div className="mt-4 flex gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 animate-spin h-4 w-4">
                  Please wait
                </Loader2>
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
        {console.log(lectureData)}
        <div className="mt-10">
          {lectureLoading ? (
            <p>Loading...</p>
          ) : lectureError ? (
            <p>Failed to load lecture</p>
          ) : lectureData.lectures?.length === 0 ? (
            <p>No lecture available</p>
          ) : (
            lectureData.lecture.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                index={index}
                courseId={courseId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateLecture;
