import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AddCourse() {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, error, isLoading, isSuccess }] =
    useCreateCourseMutation();

  const navigate = useNavigate();
  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created");
      navigate("/admin/course");
    }
  }, [isSuccess, error]);

  const getSelectedCategory = (value) => {
    setCategory(value);
  };
  return (
    <div className="flex-1 mx-10 mt-24">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add course, add some basic course details for your new course
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="mt-4 flex flex-col gap-2">
          <label htmlFor="input" className=" font-semibold">
            Title
          </label>
          <Input
            type="text"
            name="courseTitle"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
          />
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="select" className="font-semibold mb-2">
            Category
          </label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Courses</SelectLabel>
                <SelectItem value="NextJS">NextJS</SelectItem>
                <SelectItem value="Mongodb">Mongodb</SelectItem>
                <SelectItem value="HTML">HTML</SelectItem>
                <SelectItem value="React">React</SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="Vue">Vue</SelectItem>
                <SelectItem value="Full Stack">Full Stack</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4 flex gap-4">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
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
      </div>
    </div>
  );
}

export default AddCourse;
