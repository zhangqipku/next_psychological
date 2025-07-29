// 20个测试问题
const testQuestions = [
    { question: "在社交场合中，你通常", options: ["主动与陌生人交谈", "等别人先和自己打招呼", "尽量避开人群"] },
    { question: "面对困难时，你更倾向于", options: ["立即寻找解决方案", "寻求他人帮助", "花时间独自思考"] },
    { question: "你更喜欢哪种工作方式", options: ["团队协作", "独立完成", "两者结合"] },
    { question: "在空闲时间，你通常", options: ["安排活动与人相处", "随机决定做什么", "享受独处时光"] },
    { question: "做决定时，你更依赖", options: ["事实与数据", "直觉与感受", "他人建议"] },
    { question: "你更擅长", options: ["规划未来", "把握当下", "反思过去"] },
    { question: "面对压力时，你通常", options: ["保持理性分析", "感到情绪波动", "寻求支持"] },
    { question: "你更喜欢哪种学习方式", options: ["听讲座/演讲", "小组讨论", "独自阅读"] },
    { question: "在团队中，你通常是", options: ["领导者", "协调者", "执行者"] },
    { question: "你更倾向于", options: ["说出真实想法", "考虑他人感受", "保持沉默"] },
    { question: "处理问题时，你注重", options: ["效率与结果", "过程与方法", "人际关系影响"] },
    { question: "你更容易注意到", options: ["细节和具体事实", "整体和可能性", "他人的情绪变化"] },
    { question: "当计划有变时，你通常", options: ["感到不适", "灵活调整", "感到兴奋"] },
    { question: "你更重视", options: ["目标达成", "人际关系和谐", "个人成长"] },
    { question: "当需要完成重要任务时，你", options: ["提前计划并执行", "最后期限前完成", "根据心情决定"] },
    { question: "你通常如何描述自己的思考方式", options: ["逻辑性强", "富有创意", "感性思维"] },
    { question: "在人群中，你更倾向于", options: ["表达观点", "倾听他人", "观察环境"] },
    { question: "当别人不同意你的观点时，你通常", options: ["坚持己见", "寻求共识", "改变自己立场"] },
    { question: "你更容易受什么影响", options: ["客观事实", "主观感受", "社会价值观"] },
    { question: "回顾过去，你通常", options: ["思考如何改进", "感恩已获得的", "幻想不同结果"] }
];

// 测试结果数据
const resultData = [
    {
        title: "分析型人格",
        minScore: 45,
        description: "你具有强大的分析能力和逻辑思维。善于通过理性思考解决问题，重视事实和数据的准确性。在专业领域中能提出深刻见解，善于发现复杂事物背后的规律。决策时更依赖客观证据而非主观感受。",
        advice: "建议：尝试将你的分析能力与他人情商的优势结合。适当关注情感表达和人际关系维度，会让你的决策更加全面。"
    },
    {
        title: "社交型人格",
        minScore: 35,
        description: "你善于建立人际关系，具有良好的沟通能力和同理心。能够敏锐感知他人情绪，并自然而然地调整自己的表达方式。在团队中常常扮演粘合剂角色，能够有效促进团队协作。喜欢通过互动获取能量。",
        advice: "建议：注意平衡社交能量与个人空间。在发展人际关系的同时，也要培养独立完成任务的能力，保留一些自我反思的时间。"
    },
    {
        title: "创造型人格",
        minScore: 25,
        description: "你富有想象力和创新精神，思维活跃不受常规束缚。善于看到多种可能性，并能从独特角度解决问题。对新事物保持开放态度，喜欢探索不同领域的知识。思维方式倾向于整体和联系而非细节。",
        advice: "建议：在发挥创意优势的同时，培养项目的执行落地能力。尝试为创意设定具体目标和期限，将灵感转化为实际成果。"
    },
    {
        title: "稳健型人格",
        minScore: 0,
        description: "你情绪稳定且值得信赖，为人处事踏实可靠。注重工作生活的平衡，能够在压力下保持冷静。做事遵循既定程序但又不失灵活性。善于包容不同观点，能成为团队中的稳定力量。",
        advice: "建议：在保持稳定性的同时，可以尝试适当突破舒适区。偶尔尝试新的处理方式，可能带来意想不到的成长机会。"
    }
];

// DOM元素引用
const elements = {
    intro: document.querySelector('.intro-container'),
    testForm: document.getElementById('psychTest'),
    submitBtn: document.getElementById('submit-btn'),
    resultContainer: document.getElementById('result-container'),
    progressBar: document.getElementById('progress-bar'),
    progressText: document.getElementById('progress-text'),
    startBtn: document.getElementById('start-btn'),
    shareSection: document.getElementById('share-section'),
    toast: document.getElementById('toast')
};

// 显示提示消息
function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add('show');
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

// 生成测试问题
function generateQuestions() {
    testQuestions.forEach((q, index) => {
        const container = document.createElement('div');
        container.className = 'question-container';
        
        const header = document.createElement('div');
        header.className = 'question-header';
        
        const number = document.createElement('div');
        number.className = 'question-number';
        number.textContent = index + 1;
        
        const text = document.createElement('div');
        text.className = 'question-text';
        text.textContent = q.question;
        
        header.appendChild(number);
        header.appendChild(text);
        
        const options = document.createElement('div');
        options.className = 'options';
        
        q.options.forEach((option, i) => {
            const optionId = `q${index+1}opt${i+1}`;
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question-${index+1}`;
            input.value = i + 1;
            input.id = optionId;
            input.required = true;
            
            const label = document.createElement('label');
            label.htmlFor = optionId;
            label.textContent = option;
            
            options.appendChild(input);
            options.appendChild(label);
        });
        
        container.appendChild(header);
        container.appendChild(options);
        
        elements.testForm.appendChild(container);
    });
}

// 更新进度条
function updateProgress() {
    const answered = document.querySelectorAll('input[type="radio"]:checked').length;
    const percent = Math.round((answered / testQuestions.length) * 100);
    elements.progressBar.style.width = `${percent}%`;
    elements.progressText.textContent = `${percent}%`;
}

// 提交测试
function submitTest() {
    let allAnswered = true;
    let totalScore = 0;
    
    testQuestions.forEach((_, index) => {
        const selected = document.querySelector(`input[name="question-${index+1}"]:checked`);
        if (!selected) {
            allAnswered = false;
            return;
        }
        totalScore += parseInt(selected.value);
    });
    
    if (!allAnswered) {
        showToast('请完成所有题目后再提交');
        return;
    }
    
    displayResults(totalScore);
}

// 显示测试结果
function displayResults(totalScore) {
    const result = resultData.find(r => totalScore >= r.minScore);
    
    elements.resultContainer.innerHTML = `
        <div class="result-header">
            <h2 class="result-title">${result.title}</h2>
            <div class="result-score">总得分: ${totalScore}</div>
        </div>
        
        <div class="result-description">
            <p>${result.description}</p >
        </div>
        
        <div class="result-advice">
            ${result.advice}
        </div>
        
        <p class="note">测试结果基于心理学模型评估，可作为自我认知参考</p >
    `;
    
    elements.resultContainer.classList.remove('hidden');
    elements.shareSection.classList.remove('hidden');
    elements.resultContainer.scrollIntoView({ behavior: 'smooth' });
}

// 设置分享功能
function setupShareButtons() {
    document.getElementById('wechat-share').addEventListener('click', () => {
        showToast('截屏分享给微信好友');
    });
    
    document.getElementById('weibo-share').addEventListener('click', () => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent("我的性格测试结果: " + document.querySelector('.result-title').textContent);
        window.open(`https://service.weibo.com/share/share.php?url=${url}&title=${title}`, '_blank');
    });
    
    document.getElementById('copy-link').addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => showToast('链接已复制到剪贴板'))
            .catch(err => showToast('复制失败，请手动复制网址'));
    });
}

// 初始化应用
function initApp() {
    generateQuestions();
    setupShareButtons();
    
    elements.startBtn.addEventListener('click', () => {
        elements.intro.classList.add('hidden');
        elements.testForm.classList.remove('hidden');
        elements.submitBtn.classList.remove('hidden');
        updateProgress();
    });
    
    elements.submitBtn.addEventListener('click', submitTest);
    
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', updateProgress);
    });
}

// 启动应用
document.addEventListener('DOMContentLoaded', initApp);
