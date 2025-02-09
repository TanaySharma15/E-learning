import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

function EditLecture() {
  const params = useParams();
  const courseId = params.courseId;
  return (
    <div>
      <div className="flex items-center justify-between mt-12 mb-5">
        <div className="flex items-center gap-4">
          <Link to={`/admin/course/${courseId}/lecture`}>
            <Button size="icon" variant="outline" className="rounded-full">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Update Your Lectures</h1>
        </div>
      </div>
      <LectureTab />
    </div>
  );
}

export default EditLecture;
