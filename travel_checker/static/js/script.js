// 전역 변수
let selectedCountry = "";
let chatHistory = [];

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
  // 입력창에서 엔터키 처리
  document.getElementById('questionInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addQuestion();
    }
  });

  // 파일 입력 처리
  document.getElementById('fileInput').addEventListener('change', handleFileUpload);

  // 채팅 영역 초기화
  chatArea.innerHTML = '';
});
// ----------------------------- 2025_04_21(월)       Testing..     -----------------------------

let selectedCountryName = "";

function selectCountry(button, newCountryName) {
    const hasChat = chatArea.querySelector(".question") || chatArea.querySelector(".answer");       // 채팅이 있는지 확인

    // 🚩 selectedCountryName이 비어있고 채팅이 있으면 강제로 초기값 설정
    if (!selectedCountryName && hasChat) {
        selectedCountryName = document.getElementById("selectedCountry").textContent;   // 화면에 표시된 국가명을 강제로 selectedCountryName에 저장
    }

    // 기존 국가와 다른 나라를 선택했고, 채팅이 존재하면
    if (selectedCountryName && selectedCountryName !== newCountryName && hasChat) {
        showExportModalForCountrySwitch(button, newCountryName);                        // 모달을 띄워서 내보낼지 여부 확인
    } else {
        applyNewCountry(button, newCountryName);                                        // 처음 선택이거나 채팅 없으면 그냥 국가 변경
        refreshChat();
    }

    showInputSection();
}

function applyNewCountry(button, countryName) {
    // 국가명 갱신
    document.getElementById("selectedCountry").textContent = countryName;

    // 버튼 스타일
    document.querySelectorAll(".country-button").forEach(btn => btn.classList.remove("active"));
    console.log(button)
    button.classList.add("active");

    // 선택된 국가 저장
    selectedCountryName = countryName;
    chatArea.innerHTML = "";
    insertWelcomeMessage(selectedCountryName)
    getRecommendQuestions();
}

// ----------------------------- 2025_04_21(월)       Testing..     -----------------------------

function insertSuggested() {
    document.getElementById('questionInput').value = event.target.textContent;
    addQuestion();
}

document.getElementById('questionInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addQuestion();
});

// 사이드바 토글
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarContent = document.getElementById('sidebarContent');
  const mainContent = document.getElementById('mainContent');
  
  if (sidebar.classList.contains('w-64')) {
    sidebar.classList.remove('w-64');
    sidebar.classList.add('w-24');
    sidebarContent.classList.add('collapsed');
    mainContent.classList.add('ml-0');
    // sidebar.classList.remove('bg-[#343949]');
  } else {
    sidebar.classList.remove('w-24');
    sidebar.classList.add('w-64');
    sidebarContent.classList.remove('collapsed');
    mainContent.classList.remove('ml-0');
    // sidebar.classList.add('bg-[#343949]');
  }
}
// 채팅에 질문 추가
async function addQuestion() {
    document.getElementById('welcomeMessage')?.remove();
  const questionInput = document.getElementById('questionInput');
  const question = questionInput.value.trim();
  
  // 빈 질문이면 무시
  if (!question) return;
  
  // 국가가 선택되지 않았으면 알림
  if (!selectedCountryName) {
    alert('먼저 국가를 선택해주세요.');
    return;
  }
  
  // 채팅 영역에 질문 추가
  const chatArea = document.getElementById('chatArea');
  chatArea.innerHTML += `
    <div class="question text-right m-5">
      <div class="inline-block bg-gray-200 rounded p-2 max-w-[80%]">
        ${question}
      </div>
    </div>
  `;
  
  // 입력창 비우기
  questionInput.value = '';
  
  // 스크롤 맨 아래로
  chatArea.scrollTop = chatArea.scrollHeight;
  
  // 로딩 표시 추가
  chatArea.innerHTML += `
    <div id="loading" class="answer text-left m-5">
      <div class="inline-block bg-gray-300 rounded p-2 max-w-[80%]">
        <span class="loading loading-dots">응답 중</span>
      </div>
    </div>
  `;
  questionInput.disabled = true    
  
  // 챗봇 API 호출
  try {
    const response = await fetch('/api/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: JSON.stringify({
        message: question,
        country: selectedCountry
      })
    });
    
    const data = await response.json();
    
    // 로딩 제거
    document.getElementById('loading').remove();
    
    if (data.status === 'success') {
      // 채팅 영역에 응답 추가
      chatArea.innerHTML += `
        <div class="answer text-left m-5">
          <div class="inline-block bg-gray-300 rounded p-2 max-w-[80%]">
            ${data.response.answer.split("###")[0]}
          </div>
        </div>
      `;
      
      questionInput.disabled = false    
      // 대화 기록 저장
      chatHistory.push({
        role: 'user',
        content: question
      });
      
      chatHistory.push({
        role: 'assistant',
        content: data.response
      });
    } else {
      // 오류 메시지 표시
      chatArea.innerHTML += `
        <div class="answer text-left m-5">
          <div class="inline-block bg-red-200 rounded p-2 max-w-[80%]">
            오류가 발생했습니다: ${data.message}
          </div>
        </div>
      `;
    }
  } catch (error) {
    questionInput.disabled = false   
    // 로딩 제거
    document.getElementById('loading').remove();
    
    // 오류 메시지 표시
    chatArea.innerHTML += `
      <div class="answer text-left m-5">
        <div class="inline-block bg-red-200 rounded p-2 max-w-[80%]">
          서버 연결에 실패했습니다. 나중에 다시 시도해주세요.
        </div>
      </div>
    `;
  }
  
  // 스크롤 맨 아래로
  chatArea.scrollTop = chatArea.scrollHeight;
}

// 추천 질문 삽입
function insertSuggested() {
  if (questionInput.disabled) {
    return; // 입력이 비활성화된 경우 함수 종료
  }
  const suggestedText = event.target.textContent;
  questionInput.value = suggestedText;
  questionInput.focus();
  addQuestion();
}

// 내보내기 모달 표시
function showExportModal() {
  document.getElementById('overlay').classList.remove('hidden');
  document.getElementById('exportModal').classList.remove('hidden');
}

function cleanupAndSwitch(type) {
    exportChat(type);                                               // 내보내기 실행
    hideExportModal();  
  }

// 내보내기 모달 숨기기
function hideExportModal() {
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('exportModal').classList.add('hidden');
  insertWelcomeMessage(selectedCountryName)
}

// 채팅 내보내기
// ----------------------------- 2025_04_21(월)       Testing..     -----------------------------

// ✅ 나라를 바꿀 때 채팅이 있을 경우 모달창을 띄워 사용자 선택을 받는 함수
function showExportModalForCountrySwitch(button, newCountry) {
    const modal = document.getElementById("exportModal");
    const overlay = document.getElementById("overlay");

    // 모달과 오버레이 표시
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");

    // 버튼 요소 가져오기
    const jsonBtn = modal.querySelector("button.export-json");
    const textBtn = modal.querySelector("button.export-text");
    const skipBtn = modal.querySelector(".export-skip");                // ✅ 추가

    // 공통 처리 함수: 내보내기 후 국가 변경
    function cleanupAndSwitch (type) {
        exportChat(type);                                               // 내보내기 실행
        hideExportModal();                                              // 모달 닫기
        setTimeout(() => {
            applyNewCountry(button, newCountry); 
            refreshChat();
        }, 50);      // 새로운 국가로 변경
    };

    // 각 버튼 클릭 시 동작 지정
    jsonBtn.onclick = () => cleanupAndSwitch("json");
    textBtn.onclick = () => cleanupAndSwitch("txt");

    // Skip 클릭 시: 저장 없이 바로 국가 변경
    skipBtn.onclick = () => {
        hideExportModal();
        setTimeout(() => { 
            applyNewCountry(button, newCountry); 
            refreshChat();
        }, 50);
    };

    // 오버레이 클릭 시 모달 닫기
    overlay.onclick = () => {
        hideExportModal();
    };
    
}

function hideExportModal() {
    document.getElementById('overlay').classList.add('hidden');
    document.getElementById('exportModal').classList.add('hidden');

    
    // 오버레이 클릭 이벤트 제거 (중복 방지)
    document.getElementById('overlay').onclick = null;
}

// ----------------------------- 2025_04_21(월)       Testing..     -----------------------------


function exportChat(type) {
    const chatItems = document.querySelectorAll('#chatArea .question, #chatArea .answer');
    if (type === 'json') {
        const data = {
            "country": selectedCountryName,
            "messages": []
        }
        const messages = [];
        chatItems.forEach(el => {
            messages.push({
                role: el.classList.contains('question') ? 'user' : 'assistant',
                message: el.textContent.trim()
            });
        });
        data.messages = messages;
        const json = JSON.stringify(data, null, 2); // 보기 좋은 들여쓰기
        const blob = new Blob([json], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'chat.json';
        link.click();
    } else {
        let text = `Country: ${selectedCountryName}\n`;
        chatItems.forEach(el => {
            text += el.classList.contains('question') ? 'Q: ' : 'A: ';
            text += el.textContent.trim() + '\n';
        });
        const blob = new Blob([text], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'chat.txt';
        link.click();
    }

    hideExportModal();
}

// 파일 업로드 처리
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
      try {
        // 파일 내용 파싱
        let content = e.target.result;
        
        // JSON 파일인 경우
        if (file.name.endsWith('.json')) {
          const data = JSON.parse(content);
          
          if (data.country && data.messages) {
            // 국가 설정
            selectedCountry = data.country;
            applyNewCountry(document.querySelector(`button[data-country=${selectedCountry}]`), selectedCountry);  // ✅ 추가: 파일 업로드 후 국가 자동 선택
            document.getElementById('selectedCountry').textContent = `선택된 국가: ${data.country}`;
            
            // 채팅 영역 비우기
            const chatArea = document.getElementById('chatArea');
            chatArea.innerHTML = '';
            
            // 대화 내용 복원
            chatHistory = data.messages;
            console.log(chatHistory);
            
            // 대화 표시
            data.messages.forEach(msg => {
              if (msg.role === 'user') {
                chatArea.innerHTML += `
                  <div class="question text-right m-5">
                    <div class="inline-block bg-gray-200 rounded p-2 max-w-[80%]">
                      ${msg.message}
                    </div>
                  </div>
                `;
              } else {
                chatArea.innerHTML += `
                  <div class="answer text-left m-5">
                    <div class="inline-block bg-gray-300 rounded p-2 max-w-[80%]">
                      ${msg.message}
                    </div>
                  </div>
                `;
              }
            });
            refreshChat(data)
            alert('대화가 성공적으로 불러와졌습니다.');
          } else {
            alert('유효하지 않은 대화 파일입니다.');
          }
        }
        // 텍스트 파일인 경우 - 단순 표시
        else if (file.name.endsWith('.txt')) {
            const lines = content.split('\n').map(line => line.trim());
            let messages = [];
            let selectedCountry = '';
          
            lines.forEach(line => {
              if (line.startsWith('Country:')) {
                selectedCountry = line.replace('Country:', '').trim();
              } else if (line.startsWith('Q:')) {
                messages.push({ role: 'user', message: line.replace('Q:', '').trim() });
              } else if (line.startsWith('A:')) {
                messages.push({ role: 'assistant', message: line.replace('A:', '').trim() });
              }
            });
          
            // 국가 설정
            applyNewCountry(document.querySelector(`button[data-country="${selectedCountry}"]`), selectedCountry);
            document.getElementById('selectedCountry').textContent = `선택된 국가: ${selectedCountry}`;
          
            // 채팅 영역 초기화
            const chatArea = document.getElementById('chatArea');
            chatArea.innerHTML = '';
          
            // 대화 복원
            chatHistory = messages;
            messages.forEach(msg => {
              if (msg.role === 'user') {
                chatArea.innerHTML += `
                  <div class="question text-right m-5">
                    <div class="inline-block bg-gray-200 rounded p-2 max-w-[80%]">
                      ${msg.message}
                    </div>
                  </div>`;
              } else {
                chatArea.innerHTML += `
                  <div class="answer text-left m-5">
                    <div class="inline-block bg-gray-300 rounded p-2 max-w-[80%]">
                      ${msg.message}
                    </div>
                  </div>`;
              }
            });
            alert('대화가 성공적으로 불러와졌습니다.');
        }
      } catch (error) {
        alert('파일을 처리하는 중 오류가 발생했습니다: ' + error.message);
      }
    };
    
    reader.readAsText(file);
    // 파일 입력 초기화
    event.target.value = '';
  }
  
  // CSRF 토큰 가져오기 (Django 보안)
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

// 추천 질문 가져오기
function getRecommendQuestions(){
    fetch(`api/question/recommend?country=${selectedCountryName}`, headers = {
        'Content-Type': 'application/json',
      })
      .then(response => response.json())
      .then(data => {
        const questionInput = document.getElementById('recommendQuestion');
        questionInput.innerHTML = ''; // 기존 버튼 제거
        data.recommend_questions.forEach(question => {
          const button = document.createElement('button');
          button.innerText = question;
          button.className = 'bg-gray-300 px-3 py-1 mb-2 ml-2 rounded';
          button.onclick = () => insertSuggested(question);
          questionInput.appendChild(button);
        });
      })
      .catch(error => console.error('Error:', error));
}
// -----------------------------   2025/04/21 (월)   -----------------------------
window.onload = () => {
  insertWelcomeMessage("여행 및 나라");          // ✅ 추가: 로딩 시 안내 메시지
  
};

function insertWelcomeMessage(countryName) {  // ✅ 추가
  const welcomeDiv = document.createElement("div");
  welcomeDiv.className = "mx-auto my-10 text-center text-2xl text-gray-500 font-semibold select-none";
  welcomeDiv.textContent = `${countryName}에 관해서 물어보세요!`;
  welcomeDiv.style.lineHeight = "20rem";  // ✅ 글 위로 올림
  welcomeDiv.id = "welcomeMessage";  // ✅ ID 추가
  chatArea.appendChild(welcomeDiv);
}

function startNewChat() {  // ✅ 추가
  chatArea.innerHTML = "";  // 채팅 영역 초기화
  selectedCountryName = "";
  document.getElementById("selectedCountry").textContent = "국가를 선택해주세요";
  document.querySelectorAll(".country-button").forEach(btn => btn.classList.remove("active"));
  insertWelcomeMessage("여행 및 나라");
  showInputSection();  // ✅ 이 줄 추가
}

function showInputSection() {  // ✅ 추가
  document.getElementById("inputWrapper").style.display = "block";
}