cat > src/main.js << 'EOF'
const QuestionEngine = require('./question_engine');
const EvaluationSystem = require('./evaluation_system');

console.log("🏆 Universal Knowledge Olympic System");
console.log("🚀 Activated Successfully"); 
console.log("📧 By: ramin.edjlal1359@gmail.com");
console.log("🌟 InshaAllah - Ready for GitHub");
console.log("----------------------------------------");

// تست سیستم
const questionEngine = new QuestionEngine();
const evaluationSystem = new EvaluationSystem();

// تولید سوال نمونه
const sampleQuestion = questionEngine.generateQuestion("علوم", "متوسط");
console.log("🧪 سوال نمونه:", sampleQuestion.question);

// ارزیابی نمونه  
const evaluation = evaluationSystem.evaluateAnswer(sampleQuestion, 0, 25);
console.log("📊 ارزیابی:", evaluation.isCorrect ? "✅ صحیح" : "❌ غلط");

// آپدیت لیست برترین‌ها
evaluationSystem.updateLeaderboard("user123", evaluation.score);
const leaderboard = evaluationSystem.updateLeaderboard("user456", 15);

console.log("🏅 ۵ نفر برتر:");
leaderboard.slice(0, 5).forEach((user, index) => {
    console.log(`${index + 1}. ${user.username} - ${user.score} امتیاز`);
});

console.log("----------------------------------------");
console.log("🎯 سیستم المپیاد دانش آماده استفاده است!");
EOF
