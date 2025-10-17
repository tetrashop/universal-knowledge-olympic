// سیستم ارزیابی و نمره‌دهی خودکار
export default class EvaluationSystem {
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
