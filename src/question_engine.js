// موتور تولید سوالات هوشمند
class QuestionEngine {
    constructor() {
        this.categories = ["علوم", "ریاضی", "تاریخ", "ادبیات", "برنامه‌نویسی"];
        this.difficulties = ["آسان", "متوسط", "سخت"];
    }

    generateQuestion(category, difficulty) {
        const templates = {
            علوم: {
                آسان: "عنصر اصلی هوا چیست؟",
                متوسط: "فرآیند فتوسنتز چگونه انجام می‌شود؟",
                سخت: "نظریه نسبیت عام اینشتین چه می‌گوید؟"
            },
            ریاضی: {
                آسان: "حاصل ۲ + ۲ چیست؟",
                متوسط: "مشتق x² چیست؟",
                سخت: "انتگرال ∫sin(x)dx را حل کنید."
            }
        };

        return {
            question: templates[category][difficulty],
            options: this.generateOptions(category, difficulty),
            correctAnswer: 0,
            explanation: "توضیح پاسخ صحیح",
            category: category,
            difficulty: difficulty
        };
    }

    generateOptions(category, difficulty) {
        // تولید گزینه‌های تصادفی
        return ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"];
    }
}

module.exports = QuestionEngine;
