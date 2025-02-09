import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

function Course({ course }) {
  return (
    <Link to={`course-detail/${course._id}`}>
      <Card className="overflow-hidden dark:bg-gray-800 rounded-lg bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
        <div className="relative">
          <img
            className="rounded-t-lg w-full object-cover h-36"
            src={course.courseThumbnail}
            alt=""
          />
        </div>
        <CardContent>
          <h1 className="font-bold text-xl truncate mt-2">
            {course.courseTitle}
          </h1>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <Avatar className="cursor-pointer size-8 mt-2">
                <AvatarImage
                  src={
                    course.creator?.photoUrl || "https://github.com/shadcn.png"
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h3 className="text-md text-center">{course.creator?.name}</h3>
            </div>
            <div>
              <Badge>{course.courseLevel}</Badge>
            </div>
          </div>
          <h1 className="font-bold text-lg mt-2">₹{course.coursePrice}</h1>
        </CardContent>
      </Card>
    </Link>
  );
}

export default Course;
