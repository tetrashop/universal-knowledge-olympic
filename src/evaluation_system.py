// سیستم ارزیابی و نمره‌دهی خودکار
class EvaluationSystem {
    constructor() {
        this.scores = new Map();
        this.leaderboard = [];
    }

    evaluateAnswer(question, userAnswer, timeTaken) {
        const isCorrect = userAnswer === question.correctAnswer;
        let score = 0;
        
        if (isCorrect) {
            // محاسبه امتیاز بر اساس سختی و زمان
            const baseScores = { "آسان": 10, "متوسط": 20, "سخت": 30 };
            score = baseScores[question.difficulty];
            
            // کاهش امتیاز بر اساس زمان
            if (timeTaken > 30) {
                score = Math.max(5, score - 5);
            }
        }

        return {
            isCorrect: isCorrect,
            score: score,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
            timeTaken: timeTaken
        };
    }

    updateLeaderboard(userId, score) {
        const existingUser = this.leaderboard.find(entry => entry.userId === userId);
        
        if (existingUser) {
            existingUser.score += score;
        } else {
            this.leaderboard.push({
                userId: userId,
                username: `کاربر_${userId}`,
                score: score,
                lastActive: new Date().toLocaleDateString('fa-IR')
            });
        }

        // مرتب‌سازی بر اساس امتیاز
        this.leaderboard.sort((a, b) => b.score - a.score);
        
        return this.leaderboard.slice(0, 10); // ۱۰ نفر برتر
    }

    calculateRank(userId) {
        const userIndex = this.leaderboard.findIndex(entry => entry.userId === userId);
        return userIndex !== -1 ? userIndex + 1 : null;
    }

    getStatistics() {
        return {
            totalUsers: this.leaderboard.length,
            topScore: this.leaderboard[0]?.score || 0,
            averageScore: this.leaderboard.reduce((sum, user) => sum + user.score, 0) / this.leaderboard.length || 0,
            activeToday: this.leaderboard.filter(user => 
                user.lastActive === new Date().toLocaleDateString('fa-IR')
            ).length
        };
    }
}

module.exports = EvaluationSystem;
