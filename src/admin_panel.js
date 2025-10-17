// پنل مدیریت المپیاد دانش
export default class AdminPanel {
    constructor() {
        this.users = [];
        this.questions = [];
        this.exams = [];
    }

    // مدیریت کاربران
    addUser(userData) {
        const user = {
            id: Date.now().toString(),
            username: userData.username,
            email: userData.email,
            role: userData.role || 'student',
            joinDate: new Date().toLocaleDateString('fa-IR'),
            status: 'active'
        };
        
        this.users.push(user);
        return user;
    }

    // مدیریت سوالات
    addQuestion(questionData) {
        const question = {
            id: Date.now().toString(),
            question: questionData.question,
            options: questionData.options,
            correctAnswer: questionData.correctAnswer,
            category: questionData.category,
            difficulty: questionData.difficulty,
            createdBy: questionData.createdBy,
            createdAt: new Date().toLocaleDateString('fa-IR')
        };
        
        this.questions.push(question);
        return question;
    }

    // آمار سیستم
    getStatistics() {
        return {
            totalUsers: this.users.length,
            totalQuestions: this.questions.length,
            totalExams: this.exams.length,
            activeUsers: this.users.filter(user => user.status === 'active').length,
            questionsByCategory: this.getQuestionsByCategory(),
            usersByRole: this.getUsersByRole()
        };
    }

    getQuestionsByCategory() {
        const categories = {};
        this.questions.forEach(question => {
            categories[question.category] = (categories[question.category] || 0) + 1;
        });
        return categories;
    }

    getUsersByRole() {
        const roles = {};
        this.users.forEach(user => {
            roles[user.role] = (roles[user.role] || 0) + 1;
        });
        return roles;
    }

    // جستجو و فیلتر
    searchUsers(query) {
        return this.users.filter(user => 
            user.username.includes(query) || 
            user.email.includes(query)
        );
    }

    searchQuestions(query) {
        return this.questions.filter(question => 
            question.question.includes(query) ||
            question.category.includes(query)
        );
    }

    // گزارش‌گیری
    generateReport(type) {
        switch(type) {
            case 'users':
                return this.generateUserReport();
            case 'questions':
                return this.generateQuestionReport();
            case 'system':
                return this.generateSystemReport();
            default:
                return { error: 'نوع گزارش نامعتبر است' };
        }
    }

    generateUserReport() {
        return {
            reportType: 'کاربران',
            total: this.users.length,
            active: this.users.filter(u => u.status === 'active').length,
            inactive: this.users.filter(u => u.status === 'inactive').length,
            byRole: this.getUsersByRole()
        };
    }

    generateQuestionReport() {
        return {
            reportType: 'سوالات',
            total: this.questions.length,
            byCategory: this.getQuestionsByCategory(),
            byDifficulty: this.getQuestionsByDifficulty()
        };
    }

    getQuestionsByDifficulty() {
        const difficulties = {};
        this.questions.forEach(question => {
            difficulties[question.difficulty] = (difficulties[question.difficulty] || 0) + 1;
        });
        return difficulties;
    }

    generateSystemReport() {
        return {
            reportType: 'سیستم',
            statistics: this.getStatistics(),
            timestamp: new Date().toLocaleString('fa-IR')
        };
    }
    }
