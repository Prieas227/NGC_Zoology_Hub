import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { questions, subjects, chapters } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { ALL_SUBJECTS } from "@/data/zoologyData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subjectId = (searchParams.get("subject") || "AEZ").toUpperCase();

  try {
    const subList = await db.select().from(subjects).where(eq(subjects.id, subjectId));
    const currentSubject = subList[0] || ALL_SUBJECTS.find((s) => s.id === subjectId) || ALL_SUBJECTS[0];

    // Fetch questions for this subject
    const allQ = await db
      .select({
        id: questions.id,
        q: questions.q,
        answer: questions.answer,
        hot: questions.hot,
        division: questions.division,
        years: questions.years,
        marks: questions.marks,
        chapterTitle: chapters.title,
        chapterEmoji: chapters.emoji,
      })
      .from(questions)
      .leftJoin(chapters, eq(questions.chapterId, chapters.id))
      .where(eq(questions.subjectId, subjectId));

    // Shuffle and pick
    const shuffle = <T>(array: T[]): T[] => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    const kaPool = allQ.filter((q) => q.division === "ka");
    const khaPool = allQ.filter((q) => q.division === "kha");
    const gaPool = allQ.filter((q) => q.division === "ga");

    // Prefer hot questions
    const selectQuestions = (pool: typeof allQ, count: number) => {
      const hot = shuffle(pool.filter((q) => q.hot));
      const regular = shuffle(pool.filter((q) => !q.hot));
      const combined = [...hot, ...regular];
      return combined.slice(0, Math.min(count, combined.length));
    };

    const partA = selectQuestions(kaPool, 12); // 12 questions, answer 10
    const partB = selectQuestions(khaPool, 8); // 8 questions, answer 5
    const partC = selectQuestions(gaPool, 8); // 8 questions, answer 5

    return NextResponse.json({
      subject: currentSubject,
      examMeta: {
        title: "জাতীয় বিশ্ববিদ্যালয় · অনার্স ৪র্থ বর্ষ চূড়ান্ত পরীক্ষা সাজেশন মডেল টেস্ট",
        session: "সেশন: ২০২১-২২ · পরীক্ষা: ২০২৫",
        institution: "নোয়াখালী সরকারি কলেজ, নোয়াখালী",
        department: "প্রাণিবিদ্যা বিভাগ",
        subjectName: currentSubject.name,
        subjectBn: currentSubject.bn,
        subjectCode: currentSubject.code,
        fullMarks: 80,
        duration: "৪ ঘণ্টা",
      },
      partA: {
        label: "ক-বিভাগ (অতিসংক্ষিপ্ত প্রশ্ন)",
        instruction: "যেকোনো ১০টি প্রশ্নের উত্তর দাও:",
        marksDistribution: "১০ × ১ = ১০",
        questions: partA,
      },
      partB: {
        label: "খ-বিভাগ (সংক্ষিপ্ত প্রশ্ন)",
        instruction: "যেকোনো ৫টি প্রশ্নের উত্তর দাও:",
        marksDistribution: "৫ × ৪ = ২০",
        questions: partB,
      },
      partC: {
        label: "গ-বিভাগ (রচনামূলক প্রশ্ন)",
        instruction: "যেকোনো ৫টি প্রশ্নের উত্তর দাও:",
        marksDistribution: "৫ × ১০ = ৫০",
        questions: partC,
      },
    });
  } catch (error) {
    console.error("Error generating model test:", error);
    return NextResponse.json({ error: "Failed to generate test" }, { status: 500 });
  }
}
