// 定义对话数据
const conversationData = [
    {
        type: 'client',
        speaker: 'M代表',
        time: '10:25:00',
        content: '感谢贵公司长期以来的支持。今天主要想讨论一下我们未来的合作方向。'
    },
    {
        type: 'self',
        speaker: '我',
        time: '10:25:25',
        content: '非常感谢。我们注意到贵公司近期有一些新的业务发展，很期待能够深入了解具体需求。'
    },
    {
        type: 'client',
        speaker: 'M代表',
        time: '10:25:30',
        content: '是的，我们今年在亚太区的业务增长很快，特别是云服务方面。'
    },
    {
        type: 'self',
        speaker: '我',
        time: '10:25:40',
        content: '确实，从数据上看，智能云业务已占到贵公司总收入的39%，是增长最快的板块。'
    },
    {
        type: 'client',
        speaker: 'M代表',
        time: '10:25:45',
        content: '基于这个增长趋势，我们正在全球范围内扩建研发中心。目前面临三个主要资金需求：一是各地研发中心建设资金，二是跨境技术采购支付，三是全球研发人员薪资发放。我们需要一个灵活高效的资金调配方案。',
        highlight: true,
        showAnalysis: true
    }, 
    {
        type: 'copilot',
        suggestions: [
            '可提供全球资金池服务，支持多币种实时调配',
            '针对研发中心建设，提供100亿美元专项授信额度',
            '跨境支付可提供7x24小时实时结算服务',
            '可定制全球薪资统一发放解决方案'
        ]
    },
    {
        type: 'self',
        speaker: '我',
        time: '10:26:10',
        content: '我们可以提供一个整合的解决方案：首先是全球资金池服务，支持多币种实时调配。针对研发中心建设，我们可以提供100亿美元的专项授信额度。同时，我们的跨境支付系统支持7x24小时实时结算，可以完美对接您的技术采购需求。另外，我们还可以为贵公司定制全球薪资统一发放方案。'
    },
    {
        type: 'client',
        speaker: 'M代表',
        time: '10:26:35',
        content: '这个方案听起来很完整，特别是资金池和跨境支付部分。能否详细说明一下具体的操作流程？'
    }
];

// 创建消息元素
function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.type} hidden`;
    if (message.highlight) {
        messageDiv.classList.add('highlight');
    }

    if (message.type === 'copilot') {
        messageDiv.className = 'copilot-suggestion hidden';
        messageDiv.innerHTML = `
            <div class="suggestion-header">
                <span class="ai-icon">🤖</span>
                <span class="suggestion-title">Copilot 建议</span>
            </div>
            <div class="suggestion-content">
                <p>可以从以下几个方面回应：</p>
                <ul>
                    ${message.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                </ul>
            </div>
        `;
    } else {
        let analysisButton = '';
        if (message.showAnalysis) {
            analysisButton = '<button class="analysis-btn">分析</button>';
        }
        
        messageDiv.innerHTML = `
            <div class="message-header">
                <span class="speaker">${message.speaker}</span>
                <span class="time">${message.time}</span>
                ${analysisButton}
            </div>
            <p>${message.content}</p>
        `;

        // 为分析按钮添加点击事件
        const btn = messageDiv.querySelector('.analysis-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                // TODO: 实现分析功能
                alert('正在分析客户需求...');
            });
        }
    }

    return messageDiv;
}

// 显示消息的函数
function showMessage(messageElement, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            messageElement.classList.remove('hidden');
            messageElement.classList.add('fade-in');
            
            // 获取消息文本元素
            const textElement = messageElement.querySelector('p');
            if (textElement) {
                const text = textElement.textContent;
                textElement.textContent = '';
                
                // 根据文本长度动态计算打字速度
                const baseDelay = 80; // 基础打字延迟
                const adjustedDelay = Math.max(60, baseDelay - (text.length / 2));
                
                const typewriter = new Typewriter(textElement, {
                    delay: adjustedDelay, // 调整打字速度
                    cursor: '',
                    deleteSpeed: adjustedDelay
                });
                
                typewriter
                    .typeString(text)
                    .callFunction(() => {
                        // 添加额外延迟，模拟说话停顿
                        setTimeout(resolve, 300);
                    })
                    .start();
            } else if (messageElement.classList.contains('copilot-suggestion')) {
                const listItems = messageElement.querySelectorAll('li');
                let completedItems = 0;
                
                listItems.forEach((item, index) => {
                    const text = item.textContent;
                    item.textContent = '';
                    
                    setTimeout(() => {
                        const typewriter = new Typewriter(item, {
                            delay: 60, // Copilot建议使用稍快的速度
                            cursor: ''
                        });
                        
                        typewriter
                            .typeString(text)
                            .callFunction(() => {
                                completedItems++;
                                if (completedItems === listItems.length) {
                                    setTimeout(resolve, 300);
                                }
                            })
                            .start();
                    }, index * 1500); // 增加每个建议项之间的间隔
                });
            } else {
                resolve();
            }
        }, delay);
    });
}

// 初始化对话
async function initializeConversation() {
    const conversationFlow = document.querySelector('.conversation-flow');
    conversationFlow.innerHTML = ''; // 清空现有内容
    
    for (const message of conversationData) {
        const messageElement = createMessageElement(message);
        conversationFlow.appendChild(messageElement);
        await showMessage(messageElement, 1200); // 增加消息之间的间隔
    }
}
 