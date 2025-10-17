// پنل کاربران المپیاد دانش
export default class UserDashboard {
    constructor(userId) {
        this.userId = userId;
        this.userStats = {
            totalExams: 0,
            averageScore: 0,
            bestScore: 0,
            rank: null,
            completedCategories: []
        };
        this.examHistory = [];
    }

    // شروع آزمون جدید
    startNewExam(category, difficulty) {
        const exam = {
            examId: Date.now().toString(),
            category: category,
            difficulty: difficulty,
            startTime: new Date(),
            questions: [],
            userAnswers: [],
            score: 0,
            status: 'in-progress'
        };

        this.examHistory.push(exam);
        return exam;
    }

    // ثبت پاسخ کاربر
    submitAnswer(examId, questionId, userAnswer, timeTaken) {
        const exam = this.examHistory.find(e => e.examId === examId);
        if (exam && exam.status === 'in-progress') {
            exam.userAnswers.push({
                questionId: questionId,
                userAnswer: userAnswer,
                timeTaken: timeTaken,
                submittedAt: new Date()
            });
        }
    }

    // پایان آزمون و محاسبه نتایج
    finishExam(examId, evaluationSystem) {
        const exam = this.examHistory.find(e => e.examId === examId);
        if (exam) {
            exam.status = 'completed';
            exam.endTime = new Date();
            exam.duration = (exam.endTime - exam.startTime) / 1000; // ثانیه

            // محاسبه امتیاز
            let totalScore = 0;
            exam.userAnswers.forEach((answer, index) => {
                if (index < exam.questions.length) {
                    const question = exam.questions[index];
                    const evaluation = evaluationSystem.evaluateAnswer(
                        question, 
                        answer.userAnswer, 
                        answer.timeTaken
                    );
                    totalScore += evaluation.score;
                }
            });

            exam.score = totalScore;
            this.updateUserStats(exam);
            return exam;
        }
    }

    // بروزرسانی آمار کاربر
    updateUserStats(exam) {
        this.userStats.totalExams++;
        this.userStats.averageScore = 
            (this.userStats.averageScore * (this.userStats.totalExams - 1) + exam.score) / 
            this.userStats.totalExams;
        
        if (exam.score > this.userStats.bestScore) {
            this.userStats.bestScore = exam.score;
        }

        // اضافه کردن دسته‌بندی تکمیل شده
        if (!this.userStats.completedCategories.includes(exam.category)) {
            this.userStats.completedCategories.push(exam.category);
        }
    }

    // دریافت پیشرفت کاربر
    getUserProgress() {
        const totalCategories = 5; // علوم، ریاضی، تاریخ، ادبیات، برنامه‌نویسی
        const progress = (this.userStats.completedCategories.length / totalCategories) * 100;

        return {
            userId: this.userId,
            stats: this.userStats,
            progress: Math.round(progress),
            level: this.calculateUserLevel(),
            nextMilestone: this.getNextMilestone()
        };
    }

    // محاسبه سطح کاربر
    calculateUserLevel() {
        const totalScore = this.userStats.averageScore * this.userStats.totalExams;
        if (totalScore >= 1000) return 'حرفه‌ای';
        if (totalScore >= 500) return 'متوسط';
        if (totalScore >= 100) return 'مبتدی';
        return 'تازه‌کار';
    }

    // میلستون بعدی
    getNextMilestone() {
        const currentLevel = this.calculateUserLevel();
        const milestones = {
            'تازه‌کار': { target: 100, description: 'رسیدن به سطح مبتدی' },
            'مبتدی': { target: 500, description: 'رسیدن به سطح متوسط' },
            'متوسط': { target: 1000, description: 'رسیدن به سطح حرفه‌ای' },
            'حرفه‌ای': { target: null, description: 'شما در بالاترین سطح هستید!' }
        };

        return milestones[currentLevel];
    }

    // تاریخچه آزمون‌ها
    getExamHistory() {
        return this.examHistory
            .filter(exam => exam.status === 'completed')
            .map(exam => ({
                examId: exam.examId,
                category: exam.category,
                difficulty: exam.difficulty,
                score: exam.score,
                duration: exam.duration,
                date: exam.endTime.toLocaleDateString('fa-IR')
            }));
    }

    // دریافت توصیه‌های آموزشی
    getStudyRecommendations() {
        const recommendations = [];
        
        if (this.userStats.averageScore < 50) {
            recommendations.push('تمرین بیشتر در دسته‌بندی‌های پایه');
        }
        
        if (this.userStats.completedCategories.length < 3) {
            recommendations.push('کسب تجربه در دسته‌بندی‌های مختلف');
        }

        const weakCategories = this.findWeakCategories();
        if (weakCategories.length > 0) {
            recommendations.push(`نیاز به تمرین در: ${weakCategories.join('، ')}`);
        }

        return recommendations;
    }

    // پیدا کردن دسته‌بندی‌های ضعیف
    findWeakCategories() {
        // اینجا می‌تواند منطق پیچیده‌تری برای آنالیز عملکرد کاربر باشد
        return ['ریاضی', 'تاریخ']; // نمونه
    }
}
