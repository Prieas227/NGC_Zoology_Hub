import { db, pool } from "./index";
import { subjects, chapters, questions, studyNotes } from "./schema";
import { ALL_SUBJECTS } from "../data/zoologyData";

async function seed() {
  console.log("🌱 Starting Zoology Hub database seeding...");

  try {
    // Clear existing data cleanly in reverse order of foreign keys
    await db.delete(questions);
    await db.delete(chapters);
    await db.delete(studyNotes);
    await db.delete(subjects);

    console.log("✓ Cleared old tables");

    // Insert Subjects
    for (let i = 0; i < ALL_SUBJECTS.length; i++) {
      const s = ALL_SUBJECTS[i];
      await db.insert(subjects).values({
        id: s.id,
        code: s.code,
        name: s.name,
        bn: s.bn,
        emoji: s.emoji,
        grad: s.grad,
        accent: s.accent,
        mid: s.mid,
        bg: s.bg,
        orderIndex: i,
      });

      // Insert Chapters for this subject
      for (let cIdx = 0; cIdx < s.chapters.length; cIdx++) {
        const ch = s.chapters[cIdx];
        await db.insert(chapters).values({
          id: ch.id,
          subjectId: s.id,
          chapterNo: ch.chapterNo,
          title: ch.title,
          titleEn: ch.titleEn || "",
          emoji: ch.emoji || "📖",
          orderIndex: cIdx,
        });

        // Insert Questions: ka (Part A)
        for (let qIdx = 0; qIdx < ch.ka.length; qIdx++) {
          const item = ch.ka[qIdx];
          await db.insert(questions).values({
            subjectId: s.id,
            chapterId: ch.id,
            division: "ka",
            q: item.q,
            answer: item.answer || "",
            hot: item.hot || false,
            years: item.years || "",
            marks: item.marks || 1,
            orderIndex: qIdx,
          });
        }

        // Insert Questions: kha (Part B)
        for (let qIdx = 0; qIdx < ch.kha.length; qIdx++) {
          const item = ch.kha[qIdx];
          await db.insert(questions).values({
            subjectId: s.id,
            chapterId: ch.id,
            division: "kha",
            q: item.q,
            answer: item.answer || "",
            hot: item.hot || false,
            years: item.years || "",
            marks: item.marks || 4,
            orderIndex: qIdx,
          });
        }

        // Insert Questions: ga (Part C)
        for (let qIdx = 0; qIdx < ch.ga.length; qIdx++) {
          const item = ch.ga[qIdx];
          await db.insert(questions).values({
            subjectId: s.id,
            chapterId: ch.id,
            division: "ga",
            q: item.q,
            answer: item.answer || "",
            hot: item.hot || false,
            years: item.years || "",
            marks: item.marks || 10,
            orderIndex: qIdx,
          });
        }
      }
    }

    // Insert sample college notes and memorization mnemonics
    await db.insert(studyNotes).values([
      {
        subjectId: "AEZ",
        chapterId: "AEZ-CH1",
        title: "এপিকালচার রিভিশন মেমোটেকনিক",
        content: "মৌমাছির নাচের কৌশল মনে রাখার সহজ সূত্র: ১০০ মিটারের কম হলে রাউন্ড নাচ (Round Dance), আর ১০০ মিটারের বেশি হলে ওয়াগেল বা দোলন নাচ (Waggle Dance)। রয়েল জেলি হাইপোফ্যারিঞ্জিয়াল গ্রন্থি থেকে নিঃসরিত হয়।",
        author: "প্রাণিবিদ্যা বিভাগ, নোয়াখালী সরকারি কলেজ",
      },
      {
        subjectId: "GEB",
        chapterId: "GEB-CH1",
        title: "মলিকুলার সিজার EcoRI ট্রিক",
        content: "EcoRI কাটে GAATTC তে। মনে রাখুন: 'G' দিয়ে শুরু এবং কাটে G ও A এর ঠিক মাঝে (G | A A T T C)। বিপরীত সূত্রেও একই (C T T A A | G)। ফলে ৪ বেসের স্টিকি অ্যান্ড তৈরি হয়।",
        author: "প্রাণিবিদ্যা বিভাগ, নোয়াখালী সরকারি কলেজ",
      },
      {
        subjectId: "BSR",
        chapterId: "BSR-CH4",
        title: "কাই-বর্গ ও টি-টেস্ট পরীক্ষার সিদ্ধান্ত গ্রহণ কৌশল",
        content: "গণনাকৃত মান (Calculated value) যদি টেবিল মানের (Table value) চেয়ে বেশি হয়, তবে নাল হাইপোথিসিস (H0) বাতিল বা রিজেক্ট হবে এবং পার্থক্যটি পরিসংখ্যানিকভাবে তাৎপর্যপূর্ণ (Significant)।",
        author: "প্রাণিবিদ্যা বিভাগ, নোয়াখালী সরকারি কলেজ",
      },
      {
        subjectId: "FSB",
        chapterId: "FSB-CH2",
        title: "কার্প প্রণোদিত প্রজনন পিজি ডোজ গাইড",
        content: "স্ত্রী কার্পের ২য় ডোজের ৬ ঘণ্টা পর স্পনিং শুরু হয়। পুরুষ মাছকে কেবল স্ত্রী মাছের ২য় ডোজের সময় একটি ডোজ দিতে হবে। তাপমাত্রা ২৭-৩১° সে. এবং পর্যাপ্ত অক্সিজেন ঝরনা জরুরি।",
        author: "প্রাণিবিদ্যা বিভাগ, নোয়াখালী সরকারি কলেজ",
      },
    ]);

    console.log("✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
