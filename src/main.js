import QuestionEngine from './question_engine.js';
import EvaluationSystem from './evaluation_system.js';
import AdminPanel from './admin_panel.js';
import UserDashboard from './user_dashboard.js';

console.log("🏆 Universal Knowledge Olympic System");
console.log("🚀 Activated Successfully");
console.log("📧 By: ramin.edjlal1359@gmail.com");
console.log("🌟 InshaAllah - Ready for GitHub");
console.log("========================================");

// تست سیستم کامل
const questionEngine = new QuestionEngine();
const evaluationSystem = new EvaluationSystem();
const adminPanel = new AdminPanel();
const userDashboard = new UserDashboard("user123");

console.log("\n🧪 تست موتور سوال‌سازی:");
const sampleQuestion = questionEngine.generateQuestion("علوم", "متوسط");
console.log("سوال نمونه:", sampleQuestion.question);
console.log("گزینه‌ها:", sampleQuestion.options.join("، "));

console.log("\n📊 تست سیستم ارزیابی:");
const evaluation = evaluationSystem.evaluateAnswer(sampleQuestion, 0, 25);
console.log("ارزیابی:", evaluation.isCorrect ? "✅ صحیح" : "❌ غلط");
console.log("امتیاز:", evaluation.score);

console.log("\n👨‍💼 تست پنل مدیریت:");
// اضافه کردن کاربر نمونه
const newUser = adminPanel.addUser({
    username: "علی رضایی",
    email: "ali@example.com",
    role: "student"
});
console.log("کاربر اضافه شد:", newUser.username);

// اضافه کردن سوال نمونه
const newQuestion = adminPanel.addQuestion({
    question: "پایتخت ایران کدام است؟",
    options: ["تهران", "مشهد", "اصفهان", "شیراز"],
    correctAnswer: 0,
    category: "جغرافیا",
    difficulty: "آسان",
    createdBy: "admin"
});
console.log("سوال اضافه شد:", newQuestion.question);

// دریافت آمار
const stats = adminPanel.getStatistics();
console.log("آمار سیستم:");
console.log("- کاربران:", stats.totalUsers);
console.log("- سوالات:", stats.totalQuestions);
console.log("- دسته‌بندی‌ها:", stats.questionsByCategory);

console.log("\n👤 تست پنل کاربران:");
const userProgress = userDashboard.getUserProgress();
console.log("پیشرفت کاربر:", userProgress.progress + "%");
console.log("سطح:", userProgress.level);
console.log("میانگین امتیاز:", userProgress.stats.averageScore);

console.log("\n📈 تست گزارش‌گیری:");
const userReport = adminPanel.generateReport('users');
console.log("گزارش کاربران:");
console.log("- کل کاربران:", userReport.total);
console.log("- فعال:", userReport.active);

console.log("\n🎯 تست توصیه‌های آموزشی:");
const recommendations = userDashboard.getStudyRecommendations();
console.log("توصیه‌ها:");
recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. ${rec}`);
});

console.log("\n========================================");
console.log("🎉 سیستم المپیاد دانش کامل شد!");
console.log("✅ موتور سوال‌سازی");
console.log("✅ سیستم ارزیابی"); 
console.log("✅ پنل مدیریت");
console.log("✅ پنل کاربران");
console.log("✅ گزارش‌گیری پیشرفته");
console.log("========================================");
