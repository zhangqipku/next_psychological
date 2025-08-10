document.addEventListener('DOMContentLoaded', function() {
    // 屏幕元素
    const introScreen = document.getElementById('intro-screen');
    const testScreen = document.getElementById('test-screen');
    const resultScreen = document.getElementById('result-screen');
    
    // 按钮元素
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    
    // 测试相关元素
    const questionText = document.getElementById('question-text');
    const optionBtns = document.querySelectorAll('.option-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.getElementById('progress-text');
    
    // 结果相关元素
    const resultText = document.getElementById('result-text');
    const resultDetails = document.getElementById('result-details');
    
    // 测试数据
    const questions = [
        "1. 在社交场合中，我通常感到自在和舒适",
        "2. 我经常沉浸在自己的想象和思考中",
        "3. 我倾向于相信他人是诚实和善意的",
        "4. 我做事有条理，喜欢提前计划",
        "5. 压力大的时候我容易感到焦虑",
        "6. 我喜欢尝试新鲜和刺激的活动",
        "7. 我常常考虑他人的感受和需要",
        "8. 我有时会拖延该做的事情",
        "9. 我通常保持积极乐观的态度",
        "10. 我对艺术和美的体验有强烈的感受",
        "11. 我更愿意独自度过闲暇时间",
        "12. 我很容易信任别人",
        "13. 我善于坚持完成自己开始的事情",
        "14. 我经常感到紧张或不安",
        "15. 我喜欢冒险和尝试新事物",
        "16. 我乐于帮助他人解决问题",
        "17. 我有时会冲动行事",
        "18. 我通常能看到事情好的一面",
        "19. 我对哲学和抽象概念感兴趣",
        "20. 在人群中我常常感到精力充沛"
    ];
    
    // 测试结果描述
    const traitDescriptions = {
        extraversion: {
            low: "你性格内向，更喜欢独处或小团体互动。你在安静的环境中更能发挥创造力。",
            medium: "你在社交和独处之间保持平衡。既能享受社交活动，也需要独处时间恢复精力。",
            high: "你性格外向，从社交互动中获得能量。你喜欢成为关注的焦点，善于与人交往。"
        },
        openness: {
            low: "你更倾向于实际和传统。你喜欢明确的规则和已知的事物，对抽象概念不太感兴趣。",
            medium: "你在传统和创新之间保持平衡。你对新体验持开放态度，但也重视熟悉的事物。",
            high: "你富有想象力和创造力。你对新思想和体验非常开放，喜欢探索抽象概念。"
        },
        agreeableness: {
            low: "你更关注自己的需求，有时会怀疑他人的动机。你在竞争中表现出色，但可能缺乏同情心。",
            medium: "你通常友善和合作，但也会为自己考虑。你在关心他人和自我需求之间保持平衡。",
            high: "你非常关心他人，富有同情心。你倾向于信任他人，乐于助人，有时甚至牺牲自己。"
        },
        conscientiousness: {
            low: "你更随性和灵活。你可能缺乏条理，有时会拖延，但能很好地适应变化。",
            medium: "你在自律和放松之间保持平衡。你通常负责任，但也会给自己放松的空间。",
            high: "你高度自律和有组织性。你设定目标并坚持完成，注重细节和可靠性。"
        },
        neuroticism: {
            low: "你情绪稳定，能很好地应对压力。你很少感到焦虑或情绪波动。",
            medium: "你有时会感到压力或情绪波动，但通常能管理这些感受。",
            high: "你容易感到焦虑和情绪波动。你可能对压力反应强烈，需要更多时间恢复平静。"
        }
    };
    
    // 用户答案和当前问题索引
    let answers = [];
    let currentQuestion = 0;
    
    // 初始化测试
    function initTest() {
        answers = [];
        currentQuestion = 0;
        showQuestion();
        introScreen.classList.remove('active');
        testScreen.classList.add('active');
    }
    
    // 显示当前问题
    function showQuestion() {
        questionText.textContent = questions[currentQuestion];
        updateProgress();
    }
    
    // 更新进度条
    function updateProgress() {
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressBar.style.setProperty('--progress', `${progress}%`);
        progressText.textContent = `${currentQuestion + 1}/${questions.length}`;
    }
    
    // 处理答案选择
    function selectAnswer(score) {
        answers.push(score);
        
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showResult();
        }
    }
    
    // 计算测试结果
    function calculateResult() {
        // 计算五大性格特质分数
        // 注意：这是一个简化的计算方式，实际心理测试会更复杂
        const traits = {
            extraversion: (answers[0] + (5 - answers[10]) + answers[19]) / 3,
            openness: (answers[1] + answers[9] + answers[18]) / 3,
            agreeableness: (answers[2] + answers[6] + answers[11] + answers[15]) / 4,
            conscientiousness: (answers[3] + answers[12] + (5 - answers[7])) / 3,
            neuroticism: (answers[4] + answers[13]) / 2
        };
        
        return traits;
    }
    
    // 显示结果
    function showResult() {
        const traits = calculateResult();
        
        testScreen.classList.remove('active');
        resultScreen.classList.add('active');
        
        // 生成结果文本
        resultText.textContent = "基于你的回答，以下是你的性格特点分析：";
        
        // 清空并生成详细结果
        resultDetails.innerHTML = '';
        
        for (const trait in traits) {
            const value = traits[trait];
            let level;
            
            if (value < 2) level = 'low';
            else if (value < 4) level = 'medium';
            else level = 'high';
            
            const traitElement = document.createElement('div');
            traitElement.className = 'trait';
            
            const traitName = document.createElement('div');
            traitName.className = 'trait-name';
            traitName.textContent = `${getTraitName(trait)}: ${level}`;
            
            const traitBar = document.createElement('div');
            traitBar.className = 'trait-bar';
            
            const traitLevel = document.createElement('div');
            traitLevel.className = 'trait-level';
            traitLevel.style.width = `${value * 20}%`;
            
            const traitDesc = document.createElement('div');
            traitDesc.className = 'trait-desc';
            traitDesc.textContent = traitDescriptions[trait][level];
            
            traitBar.appendChild(traitLevel);
            traitElement.appendChild(traitName);
            traitElement.appendChild(traitBar);
            traitElement.appendChild(traitDesc);
            
            resultDetails.appendChild(traitElement);
        }
    }
    
    // 获取特质名称
    function getTraitName(trait) {
        const names = {
            extraversion: '外向性',
            openness: '开放性',
            agreeableness: '宜人性',
            conscientiousness: '尽责性',
            neuroticism: '情绪稳定性'
        };
        
        return names[trait] || trait;
    }
    
    // 事件监听器
    startBtn.addEventListener('click', initTest);
    restartBtn.addEventListener('click', initTest);
    
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            selectAnswer(parseInt(this.dataset.score));
        });
    });
    
    // 初始化CSS变量
    document.documentElement.style.setProperty('--progress', '5%');
});
