echo '// سیستم ارزیابی و نمره‌دهی خودکار
class EvaluationSystem {
    constructor() {
        this.leaderboard = [];
    }

    evaluateAnswer(question, userAnswer, timeTaken) {
        const isCorrect = userAnswer === question.correctAnswer;
        let score = isCorrect ? 20 : 0;
        
        return {
            isCorrect: isCorrect,
            score: score,
            correctAnswer: question.correctAnswer,
            timeTaken: timeTaken
        };
    }

    updateLeaderboard(userId, score) {
        this.leaderboard.push({
            userId: userId,
            username: `کاربر_${userId}`,
            score: score
        });

        this.leaderboard.sort((a, b) => b.score - a.score);
        return this.leaderboard.slice(0, 5);
    }
}

module.exports = EvaluationSystem;' > src/evaluation_system.js
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
