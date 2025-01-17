// 运势计算核心逻辑
function calculateFortune(name, birthday) {
    // 基于生日计算生肖和星座
    const zodiacSigns = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
    const constellations = [
        "摩羯座", "水瓶座", "双鱼座", "白羊座", "金牛座", "双子座",
        "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座"
    ];

    const birthDate = new Date(birthday);
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();

    // 计算生肖
    const zodiac = zodiacSigns[(year - 4) % 12];

    // 计算星座
    const constellationDates = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22];
    const constellationIndex = month - (day < constellationDates[month - 1] ? 1 : 0);
    const constellation = constellations[(constellationIndex + 12) % 12];

    // 生成运势评级（S/A/B/C/D）
    const ratings = ["S", "A", "B", "C", "D"];
    const rating = ratings[Math.floor(Math.random() * 3)]; // 偏向较好的评级

    // 生成运势分数（0-100）
    const score = Math.floor(Math.random() * 21) + 80; // 80-100之间

    // 生成宜忌事项
    const goodThings = [
        "谈生意", "投资理财", "签约合同", "开展新项目",
        "社交活动", "运动健身", "学习进修", "旅行出行"
    ];
    const badThings = [
        "轻率决策", "高风险投资", "争执冲突", "重大改变",
        "过度消费", "熬夜加班", "独断专行", "铤而走险"
    ];

    // 随机选择2-3个宜做的事
    const goods = shuffleArray(goodThings).slice(0, Math.floor(Math.random() * 2) + 2);
    // 随机选择2-3个忌做的事
    const bads = shuffleArray(badThings).slice(0, Math.floor(Math.random() * 2) + 2);

    // 生成运势说明
    const reasons = [
        `根据${zodiac}年生肖与${constellation}星座的相位关系，`,
        "结合紫微斗数五行生克，",
        "参考易经卦象显示，",
        "通过八字排盘分析，"
    ];

    const effects = [
        "今日运势整体向上，能量场活跃。",
        "各项事业有望取得突破性进展。",
        "贵人运旺盛，适合把握机遇。",
        "个人魅力提升，人际关系和谐。"
    ];

    const reason = reasons[Math.floor(Math.random() * reasons.length)] +
                   effects[Math.floor(Math.random() * effects.length)];

    return {
        rating,
        score,
        goods,
        bads,
        reason,
        zodiac,
        constellation
    };
}

// 数组随机排序函数
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 显示运势结果
function showFortuneResult(result) {
    const fortuneResult = document.getElementById('fortuneResult');
    const fortuneContent = document.getElementById('fortuneContent');
    
    fortuneContent.innerHTML = `
        <div class="text-center mb-6">
            <div class="text-6xl font-bold text-primary-600 mb-2">${result.rating}</div>
            <div class="text-xl text-gray-600">综合评级</div>
        </div>
        <div class="text-center mb-6">
            <div class="text-4xl font-bold text-gray-800 mb-2">${result.score}</div>
            <div class="text-xl text-gray-600">运势指数</div>
        </div>
        <div class="space-y-4">
            <div>
                <div class="font-semibold mb-2">生肖星座：</div>
                <p class="text-gray-600">${result.zodiac}年 · ${result.constellation}</p>
            </div>
            <div>
                <div class="font-semibold mb-2">运势说明：</div>
                <p class="text-gray-600">${result.reason}</p>
            </div>
            <div>
                <div class="font-semibold mb-2">宜：</div>
                <p class="text-gray-600">${result.goods.join('、')}</p>
            </div>
            <div>
                <div class="font-semibold mb-2">忌：</div>
                <p class="text-gray-600">${result.bads.join('、')}</p>
            </div>
        </div>
    `;
    
    fortuneResult.style.display = 'flex';
}

// 关闭运势结果弹窗
function closeFortuneResult() {
    document.getElementById('fortuneResult').style.display = 'none';
}

// 表单提交处理
document.getElementById('fortuneForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const birthday = document.getElementById('userBirthday').value;
    
    const result = calculateFortune(name, birthday);
    showFortuneResult(result);
});
