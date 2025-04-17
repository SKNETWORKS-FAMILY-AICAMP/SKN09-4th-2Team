let isSidebarCollapsed = false;

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarContent = document.getElementById('sidebarContent');

    isSidebarCollapsed = !isSidebarCollapsed;

    if (isSidebarCollapsed) {
        sidebar.classList.replace('w-64', 'w-16');
        sidebarContent.style.display = 'none';
        event.target.classList.remove('mx-3')
    } else {
        sidebar.classList.replace('w-16', 'w-64');
        sidebarContent.style.display = 'block';
        event.target.classList.add('mx-3')
    }
}

function selectCountry(button, countryName) {
    document.querySelectorAll('.country-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    document.getElementById('selectedCountry').textContent = countryName;
}

function addQuestion() {
    const input = document.getElementById('questionInput');
    const text = input.value.trim();
    if (text) {
        // 질문 표시
        const questionWrapper = document.createElement('div');
        questionWrapper.className = 'text-right my-5';

        const questionBox = document.createElement('div');
        questionBox.className = 'inline-block bg-gray-200 rounded p-2 max-w-[80%]';
        questionBox.textContent = text;

        questionWrapper.appendChild(questionBox);
        chatArea.appendChild(questionWrapper);
        chatArea.scrollTop = chatArea.scrollHeight;

        input.value = '';

        // 답변 로딩 애니메이션 표시
        const answerWrapper = document.createElement('div');
        answerWrapper.className = 'text-left my-5';

        const answerBox = document.createElement('div');
        answerBox.className = 'inline-block bg-gray-300 rounded p-2 max-w-[80%] min-w-[5%] loading-dots';
        answerBox.textContent = ''; // 애니메이션은 ::after로

        answerWrapper.appendChild(answerBox);
        chatArea.appendChild(answerWrapper);
        chatArea.scrollTop = chatArea.scrollHeight;

        // 실제 답변으로 대체
        setTimeout(() => {
            answerBox.classList.remove('loading-dots');
            answerBox.textContent = generateAnswer(text);
            chatArea.scrollTop = chatArea.scrollHeight;
        }, 2000);
    }
}

function generateAnswer(userText) {
    // 실제 API 응답이나 간단한 조건 분기 가능
    if (userText.includes('대만')) {
        return '대만의 명소로는 타이베이 101, 지우펀, 단수이 등이 있어요!';
    }
    return '좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.좋은 질문이에요! 관련 정보를 찾아볼게요.';
}


function insertSuggested() {
    document.getElementById('questionInput').value = event.target.textContent;
    addQuestion();
}

document.getElementById('questionInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addQuestion();
});

function showExportModal() {
    document.getElementById('overlay').classList.remove('hidden');
    document.getElementById('exportModal').classList.remove('hidden');
}

function hideExportModal() {
    document.getElementById('overlay').classList.add('hidden');
    document.getElementById('exportModal').classList.add('hidden');
}

function exportChat(type) {
    const chatItems = document.querySelectorAll('#chatArea .question, #chatArea .answer');
    let text = '';
    chatItems.forEach(el => {
        text += el.classList.contains('question') ? 'Q: ' : 'A: ';
        text += el.textContent + '\n';
    });
    const blob = new Blob([text], { type: type === 'json' ? 'application/json' : 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `chat.${type}`;
    link.click();
    hideExportModal();
}

// 불러오기 기능
document.getElementById('fileInput').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
        const lines = event.target.result.split('\n');
        const chatArea = document.getElementById('chatArea');
        lines.forEach(line => {
            if (!line.trim()) return;
            const div = document.createElement('div');
            if (line.startsWith('Q:')) {
                div.className = 'question text-right bg-gray-200 rounded p-2 my-1';
                div.textContent = line.replace('Q: ', '');
            } else if (line.startsWith('A:')) {
                div.className = 'answer text-left bg-gray-300 rounded p-2 my-1';
                div.textContent = line.replace('A: ', '');
            }
            chatArea.appendChild(div);
        });
    };
    reader.readAsText(file);
});