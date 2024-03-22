"use server"

import db from "@/db/drizzle";
import { getCoursesById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import { error } from "console";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsetUserProgress = async (courseId: number) => {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) {
        throw new Error("Unauthorized");
    };
    const course = await getCoursesById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    //TODO: enable once units and lessons are added
    // if(!course.units.length || !course.units[0].lessons.length){
    //     throw new Error("Course is empty");
    // }

    const existingUserProgress = await getUserProgress();

    if (existingUserProgress) {
        await db.update(userProgress)
            .set({
                activeCourseId: courseId,
                userName: user.firstName || "User",
                userImageSrc: user.imageUrl || "/mascot.svg",
            })
            .where(eq(userProgress.userId, userId));

        revalidatePath("/learn");
        revalidatePath("/courses");
        redirect("/learn");
    }

    await db.insert(userProgress)
        .values({
            userId,
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/mascot.svg",
        });


    revalidatePath("/learn");
    revalidatePath("/courses");
    redirect("/learn");

}