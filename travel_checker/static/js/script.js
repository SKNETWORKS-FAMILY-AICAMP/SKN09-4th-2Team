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
  document.getElementById('chatArea').innerHTML = '';
});

// 사이드바 토글
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarContent = document.getElementById('sidebarContent');
  const mainContent = document.getElementById('mainContent');
  
  if (sidebar.classList.contains('w-64')) {
    sidebar.classList.remove('w-64');
    sidebar.classList.add('w-16');
    sidebarContent.classList.add('hidden');
    mainContent.classList.add('ml-0');
  } else {
    sidebar.classList.remove('w-16');
    sidebar.classList.add('w-64');
    sidebarContent.classList.remove('hidden');
    mainContent.classList.remove('ml-0');
  }
}

// 국가 선택
function selectCountry(button, country) {
  // 모든 버튼에서 선택 상태 제거
  document.querySelectorAll('.country-button').forEach(btn => {
    btn.classList.remove('bg-blue-500');
    btn.classList.add('bg-[#0A0C19]');
  });
  
  // 선택된 버튼 스타일 변경
  button.classList.remove('bg-[#0A0C19]');
  button.classList.add('bg-blue-500');
  
  // 선택된 국가 저장 및 표시
  selectedCountry = country;
  document.getElementById('selectedCountry').textContent = `선택된 국가: ${country}`;
}

// 채팅에 질문 추가
async function addQuestion() {
  const questionInput = document.getElementById('questionInput');
  const question = questionInput.value.trim();
  
  // 빈 질문이면 무시
  if (!question) return;
  
  // 국가가 선택되지 않았으면 알림
  if (!selectedCountry) {
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
        <span class="loading">응답 중...</span>
      </div>
    </div>
  `;
  
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
            ${data.response}
          </div>
        </div>
      `;
      
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
  const questionInput = document.getElementById('questionInput');
  const suggestedText = event.target.textContent;
  questionInput.value = suggestedText;
  questionInput.focus();
}

// 내보내기 모달 표시
function showExportModal() {
  document.getElementById('overlay').classList.remove('hidden');
  document.getElementById('exportModal').classList.remove('hidden');
}

// 내보내기 모달 숨기기
function hideExportModal() {
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('exportModal').classList.add('hidden');
}

// 채팅 내보내기
function exportChat(format) {
  if (chatHistory.length === 0) {
    alert('내보낼 대화 내용이 없습니다.');
    hideExportModal();
    return;
  }
  
  let content = '';
  let filename = `travel_checker_chat_${new Date().toISOString().slice(0,10)}`;
  
  if (format === 'json') {
    content = JSON.stringify({
      country: selectedCountry,
      timestamp: new Date().toISOString(),
      messages: chatHistory
    }, null, 2);
    filename += '.json';
  } else {
    content = `국가: ${selectedCountry}\n날짜: ${new Date().toLocaleString()}\n\n`;
    
    chatHistory.forEach(msg => {
      content += `${msg.role === 'user' ? '사용자' : '어시스턴트'}: ${msg.content}\n\n`;
    });
    
    filename += '.txt';
  }
  
  // 파일 다운로드
  const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
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
          document.getElementById('selectedCountry').textContent = `선택된 국가: ${data.country}`;
          
          // 채팅 영역 비우기
          const chatArea = document.getElementById('chatArea');
          chatArea.innerHTML = '';
          
          // 대화 내용 복원
          chatHistory = data.messages;
          
          // 대화 표시
          data.messages.forEach(msg => {
            if (msg.role === 'user') {
              chatArea.innerHTML += `
                <div class="question text-right m-5">
                  <div class="inline-block bg-gray-200 rounded p-2 max-w-[80%]">
                    ${msg.content}
                  </div>
                </div>
              `;
            } else {
              chatArea.innerHTML += `
                <div class="answer text-left m-5">
                  <div class="inline-block bg-gray-300 rounded p-2 max-w-[80%]">
                    ${msg.content}
                  </div>
                </div>
              `;
            }
          });
          
          alert('대화가 성공적으로 불러와졌습니다.');
        } else {
          alert('유효하지 않은 대화 파일입니다.');
        }
      }
      // 텍스트 파일인 경우 - 단순 표시
      else if (file.name.endsWith('.txt')) {
        alert('텍스트 파일은 현재 지원되지 않습니다. JSON 파일을 사용해주세요.');
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