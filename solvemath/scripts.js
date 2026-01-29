// 페이지네이션을 위한 변수들
let currentOffset = 0;
const limit = 10;
let currentRoomId = null;
let hasMoreMessages = true;

// API 기본 URL (필요에 따라 변경)
const API_BASE_URL = 'https://solve-math-o5he3cqntq-du.a.run.app';

// 페이지 로드 시 실행되는 코드
document.addEventListener('DOMContentLoaded', function() {
  // lottie-web을 이용하여 typing.json 애니메이션 로드
  
  // URL에서 쿼리 파라미터 확인
  const urlParams = new URLSearchParams(window.location.search);
  const roomIdParam = urlParams.get('roomId');
  const pageParam = urlParams.get('page');
  
  // URL에 roomId 파라미터가 있으면 자동으로 해당 방 불러오기
  if (roomIdParam) {
    document.getElementById('room-id').value = roomIdParam;
    
    // 페이지 정보가 있으면 해당 페이지로 이동
    if (pageParam) {
      const page = parseInt(pageParam);
      if (!isNaN(page) && page > 0) {
        currentOffset = (page - 1) * limit;
        document.getElementById('current-page').textContent = page;
      }
    }
    
    // 방 데이터 로드
    currentRoomId = roomIdParam;
    loadMessages(currentRoomId, currentOffset, limit);
  }
  
  // 방 폼 제출 이벤트를 쿼리 파라미터로 변경
  document.getElementById('room-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const roomId = document.getElementById('room-id').value.trim();
    
    if (roomId) {
      // URL 쿼리 파라미터 업데이트
      const url = new URL(window.location.href);
      url.searchParams.set('roomId', roomId);
      url.searchParams.delete('page'); // 새 방을 불러올 때는 페이지 정보 초기화
      window.history.pushState({}, '', url);
      
      // 대화 불러오기
      loadRoomData(roomId);
    }
  });
  
  // 이전 페이지 버튼 클릭 핸들러
  document.getElementById('prev-page').addEventListener('click', function() {
    if (currentOffset >= limit && currentRoomId) {
      currentOffset -= limit;
      const pageNumber = Math.floor(currentOffset / limit) + 1;
      document.getElementById('current-page').textContent = pageNumber;
      
      // URL 쿼리 파라미터 업데이트 (페이지 정보 포함)
      const url = new URL(window.location.href);
      url.searchParams.set('roomId', currentRoomId);
      url.searchParams.set('page', pageNumber);
      window.history.pushState({}, '', url);
      
      clearMessages();
      loadMessages(currentRoomId, currentOffset, limit);
    }
  });
  
  // 다음 페이지 버튼 클릭 핸들러
  document.getElementById('next-page').addEventListener('click', function() {
    if (hasMoreMessages && currentRoomId) {
      currentOffset += limit;
      const pageNumber = Math.floor(currentOffset / limit) + 1;
      document.getElementById('current-page').textContent = pageNumber;
      
      // URL 쿼리 파라미터 업데이트 (페이지 정보 포함)
      const url = new URL(window.location.href);
      url.searchParams.set('roomId', currentRoomId);
      url.searchParams.set('page', pageNumber);
      window.history.pushState({}, '', url);
      
      clearMessages();
      loadMessages(currentRoomId, currentOffset, limit);
    }
  });
  
  document.getElementById('image-button').addEventListener('click', function() {
    document.getElementById('image-input').click();
  });
  
  // 파일 선택 시 이미지 처리
  document.getElementById('image-input').addEventListener('change', function(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      // 이미지 파일인지 확인
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 선택해주세요.');
        return;
      }
      
      // 파일 크기 제한 (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('10MB 이하의 이미지만 전송할 수 있습니다.');
        return;
      }
      
      // FileReader를 사용하여 이미지를 Base64로 변환
      const reader = new FileReader();
      reader.onload = function(e) {
        const base64Image = e.target.result;
        currentRoomId = document.getElementById('room-id').value.trim();
        sendImageMessage(base64Image);
      };
      reader.readAsDataURL(file);
    }
  });

  // "보내기" 버튼 클릭 시 동작
  document.getElementById('send-button').addEventListener('click', function() {
    sendMessage();
  });
  
  // 엔터키 입력 시 "보내기" 버튼과 동일하게 작동
  document.getElementById('message-input').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
});

// 방 데이터 로드 함수
function loadRoomData(roomId) {
  // 대화 목록 초기화
  clearMessages();
  // 방 ID 저장
  currentRoomId = roomId;
  // 페이지네이션 초기화
  currentOffset = 0;
  document.getElementById('current-page').textContent = '1';
  // 대화 목록 불러오기
  loadMessages(roomId, currentOffset, limit);
}

// API에서 대화 목록 불러오기
function loadMessages(roomId, offset, limit) {
  // 로딩 인디케이터 표시
  document.getElementById('loading-indicator').style.display = 'block';
  
  // API 호출
  fetch(`${API_BASE_URL}/quests/room/${roomId}?offset=${offset}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    mode: 'cors' // CORS 활성화
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('API 응답 오류: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      // 로딩 인디케이터 숨김
      document.getElementById('loading-indicator').style.display = 'none';
      
      // 데이터가 배열인지 확인
      if (Array.isArray(data)) {
        // 날짜 기준 오름차순 정렬 (오래된 메시지가 위에 표시)
        data.sort((a, b) => {
            // createdAt 필드로 정렬 (필드명이 정확한지 확인 필요)
            const dateA = new Date(a.createdAt || a.created_at || 0);
            const dateB = new Date(b.createdAt || b.created_at || 0);
            return dateA - dateB;
            
            // ID로 정렬하려면 아래 코드 사용
            // return (a.id || 0) - (b.id || 0);
        });

        // 이전 페이지 버튼 활성화/비활성화
        document.getElementById('prev-page').disabled = offset === 0;
        
        // 다음 페이지 버튼 활성화/비활성화 (가져온 항목 수가 limit보다 적으면 더 이상 데이터가 없음)
        hasMoreMessages = data.length === limit;
        document.getElementById('next-page').disabled = !hasMoreMessages;
        
        // 각 메시지를 UI에 추가
        data.forEach(quest => {
          // quest.type에 따라 sent/received 결정 (question은 sent, answer는 received로 가정)
          const messageType = quest.type === 'answer' ? 'received' : 'sent';
          
          // 이미지 URL이 있는 경우 이미지 메시지 추가
          if (quest.imageUrl) {
            addImageMessage(quest.imageUrl, messageType, quest.createdAt);
          }
          
          // 텍스트 내용이 있는 경우 텍스트 메시지 추가
          if (quest.content) {
            addMessage(quest.content, messageType, quest.createdAt);
          }
        });
      } else {
        console.error('API 응답이 배열이 아님:', data);
        alert('대화 내용을 불러오는데 실패했습니다.');
      }
    })
    .catch(error => {
      console.error('API 호출 오류:', error);
      document.getElementById('loading-indicator').style.display = 'none';
      alert('대화 내용을 불러오는데 실패했습니다: ' + error.message);
    });
}

// 메시지 전송 함수
function sendMessage() {
    var input = document.getElementById('message-input');
    var text = input.value.trim();
    if (text !== "") {
      // URL 형식과 이미지 확장자 (.png, .jpg, .jpeg, .gif 등)를 확인
      var imageUrlPattern = /^(http[s]?:\/\/.*\.(?:png|jpg|jpeg|gif))(?:\?.*)?$/i;
      var imageUrl = null;
      
      if (imageUrlPattern.test(text)) {
        // 이미지 URL이면 addImageMessage() 호출하여 메시지에 이미지를 표시
        imageUrl = text;
        addImageMessage(imageUrl, "sent");
      } else {
        // 그 외의 경우는 기존 addMessage()로 텍스트 메시지를 처리
        addMessage(text, "sent");
      }
      input.value = "";
      
      // 현재 방 ID가 있는 경우에만 메시지 전송
      const currentRoomId = document.getElementById('room-id').value.trim();      
      console.log(`[debug] currentRoomId = ${currentRoomId}`);
      if (currentRoomId) {
        // 타이핑 애니메이션 표시 (실제 API 응답 대기 중)
        showTypingIndicatorInMessage();
        
        // 요청 데이터 준비
        const requestData = {
          roomId: currentRoomId,
          userId: "kakao-3929485964",  // 또는 실제 사용자 ID를 사용
          text_question: imageUrl ? "" : text,  // 이미지 URL인 경우 텍스트 질문은 비움
          model: "gpt-4o-mini"
        };
        
        // 이미지 URL이 있는 경우 추가
        if (imageUrl) {
          requestData.image_url = imageUrl;
        }
        
        // /ask API로 요청 보내기
        fetch(`${API_BASE_URL}/ask`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`API 응답 오류: ${response.status}`);
          }
          
          // 스트리밍 응답 처리를 위한 Reader 생성
          const reader = response.body.getReader();
          const decoder = new TextDecoder("utf-8");
          let accumulatedResponse = "";
          
          // 응답 추가 (최초)
          addMessage("", "received");
          
          // 스트리밍 응답 처리 함수
          function processStream() {
            return reader.read().then(({ done, value }) => {
              if (done) {
                console.log("스트리밍 응답 완료");
                hideTypingIndicatorInMessage();
                return;
              }
              
              // 데이터 디코드
              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split('\n');
              
              // 각 라인 처리
              lines.forEach(line => {
                if (line.trim() === "" || line.includes("[DONE]")) {
                  return;
                }
                
                try {
                  const data = JSON.parse(line);
                  
                  if (data.message) {
                    // 메시지 누적
                    accumulatedResponse += data.message;
                    // 누적된
                    // 메시지로 UI 업데이트
                    updateLastMessage(accumulatedResponse);
                  } else if (data.error) {
                    console.error(`API 오류: ${data.error}`);
                    updateLastMessage(`오류: ${data.error}`);
                    hideTypingIndicatorInMessage();
                  }
                } catch (e) {
                  console.error(`JSON 파싱 오류: ${e.message}, 라인: ${line}`);
                }
              });
              
              // 다음 청크 처리
              return processStream();
            });
          }
          
          // 스트리밍 처리 시작
          return processStream();
        })
        .catch(error => {
          console.error('메시지 전송 오류:', error);
          hideTypingIndicatorInMessage();
          addMessage(`요청 처리 중 오류가 발생했습니다: ${error.message}`, "received");
        });
      }
    }
}


// 이미지 메시지 전송 함수
function sendImageMessage(base64Image) {
    // UI에 이미지 추가
    addImageMessage(base64Image, "sent");
    
    // 현재 방 ID가 있는 경우에만 서버로 전송
    if (currentRoomId) {
      console.log(`[debug] 이미지 전송 - 방 ID: ${currentRoomId}`);
      
      // 타이핑 애니메이션 표시
      showTypingIndicatorInMessage();
      
      // 요청 데이터 준비
      const requestData = {
        roomId: currentRoomId,
        userId: "kakao-3929485964",  // 또는 실제 사용자 ID
        text_question: "",  // 텍스트 질문은 비움
        model: "gpt-4o-mini",
        image_base64: base64Image.split(',')[1]  // 'data:image/jpeg;base64,' 부분 제거
      };
      
      // /ask API로 요청 보내기
      fetch(`${API_BASE_URL.replace('/quests', '')}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`API 응답 오류: ${response.status}`);
        }
        
        // 스트리밍 응답 처리를 위한 Reader 생성
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let accumulatedResponse = "";
        
        // 응답 추가 (최초)
        addMessage("", "received");
        
        // 스트리밍 응답 처리 함수
        function processStream() {
          return reader.read().then(({ done, value }) => {
            if (done) {
              console.log("스트리밍 응답 완료");
              hideTypingIndicatorInMessage();
              return;
            }
            
            // 데이터 디코드
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');
            
            // 각 라인 처리
            lines.forEach(line => {
              if (line.trim() === "" || line.includes("[DONE]")) {
                return;
              }
              
              try {
                const data = JSON.parse(line);
                
                if (data.message) {
                  // 메시지 누적
                  accumulatedResponse += data.message;
                  // 누적된 메시지로 UI 업데이트
                  updateLastMessage(accumulatedResponse);
                } else if (data.error) {
                  console.error(`API 오류: ${data.error}`);
                  updateLastMessage(`오류: ${data.error}`);
                  hideTypingIndicatorInMessage();
                }
              } catch (e) {
                console.error(`JSON 파싱 오류: ${e.message}, 라인: ${line}`);
              }
            });
            
            // 다음 청크 처리
            return processStream();
          });
        }
        
        // 스트리밍 처리 시작
        return processStream();
      })
      .catch(error => {
        console.error('이미지 전송 오류:', error);
        hideTypingIndicatorInMessage();
        addMessage(`이미지 처리 중 오류가 발생했습니다: ${error.message}`, "received");
      });
    }
}

// 메시지 추가 후 스크롤을 가장 아래로 이동시키는 함수
function scrollToBottom() {
  var messagesDiv = document.getElementById("messages");
  if (messagesDiv) {
    messagesDiv.scrollTop = messagesDiv.scrollHeight - messagesDiv.clientHeight;
  }
}

/**
 * 타이핑 애니메이션 메시지 추가 함수 (header와 타임스탬프 없이 오직 애니메이션만 표시)
 */
// 타이핑 애니메이션 메시지 추가 함수 수정
function showTypingIndicatorInMessage() {
    var messagesContainer = document.getElementById("messages");
    var typingMessage = document.createElement("div");
    typingMessage.classList.add("message", "received");
    
    // 채팅 버블 내에 SVG 이미지 포함
    var bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    bubble.style.backgroundColor = "transparent"; // 배경을 투명으로 설정
  
    // 이미지 복제
    var typingAnimationContainer = document.getElementById("typing-animation");
    var typingAnimationClone = typingAnimationContainer.cloneNode(true);
    typingAnimationClone.style.display = "block";
    bubble.appendChild(typingAnimationClone);
    
    typingMessage.appendChild(bubble);
    messagesContainer.appendChild(typingMessage);
    scrollToBottom();
}

/**
 * 타이핑 애니메이션 메시지를 제거하는 함수
 * 애니메이션이 표시된 마지막 메시지를 찾아 제거합니다.
 */
function hideTypingIndicatorInMessage() {
    var messagesContainer = document.getElementById("messages");
    var messages = messagesContainer.getElementsByClassName("message");
    
    // 마지막 메시지를 확인
    var lastMessage = messages[messages.length - 1];
    
    // 마지막 메시지가 typing-animation을 포함하고 있는지 확인
    if (lastMessage && lastMessage.querySelector("#typing-animation")) {
        // 타이핑 애니메이션이 포함된 메시지 제거
        messagesContainer.removeChild(lastMessage);
    }
    
    // typing-animation 요소를 원래 상태로 되돌리기
    var typingAnimation = document.getElementById("typing-animation");
    if (typingAnimation) {
        typingAnimation.style.display = "none";
        
        // 만약 애니메이션이 다른 부모 요소 아래에 있었다면 원래 위치로 복원
        if (typingAnimation.parentElement !== document.getElementById("chat-container")) {
            document.getElementById("chat-container").appendChild(typingAnimation);
        }
    }
}

// 공통: received 메시지용 상단 헤더 생성 함수
function createHeader() {
  var headerDiv = document.createElement("div");
  headerDiv.className = "chat-header";
  
  var aiIcon = document.createElement("img");
  aiIcon.src = "ai_icon_24.svg"; // 실제 경로로 변경
  aiIcon.alt = "AI Icon";
  aiIcon.className = "ai-icon";
  
  var systemName = document.createElement("span");
  systemName.className = "system-name";
  systemName.textContent = "다풀어";
  
  headerDiv.appendChild(aiIcon);
  headerDiv.appendChild(systemName);
  return headerDiv;
}

// 공통: 타임스탬프 생성 함수 ("YYYY-MM-DD HH:MM" 형식)
function createTimestamp() {
  var timestampDiv = document.createElement("div");
  timestampDiv.className = "chat-timestamp";
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  if (month < 10) { month = "0" + month; }
  var day = now.getDate();
  if (day < 10) { day = "0" + day; }
  var hours = now.getHours();
  if (hours < 10) { hours = "0" + hours; }
  var minutes = now.getMinutes();
  if (minutes < 10) { minutes = "0" + minutes; }
  timestampDiv.textContent = year + "-" + month + "-" + day + " " + hours + ":" + minutes;
  return timestampDiv;
}

/**
 * addMessage(text, type)
 * - text: 메시지 내용 (Markdown 및 LaTeX 포함 가능)
 * - type: "sent" 또는 "received"
 *
 * received 메시지 상단에는 아이콘과 시스템명을, 모든 메시지 하단에는 날짜와 시간을 표시합니다.
 * Mathpix Markdown-it(window.render)가 존재하면 렌더링합니다.
 * 헤더와 타임스탬프는 채팅 버블과 분리되어 배경이 투명하게 처리됩니다.
 */
function addMessage(text, type, timestamp) {
  console.log(`[debug] addMessage.timestamp ${timestamp} `)
  var messagesContainer = document.getElementById("messages");
  var messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.classList.add(type);  // "sent" 또는 "received"
  
  // received 메시지인 경우 상단에 헤더(아이콘 + 시스템명) 추가
  if (type === "received") {
    hideTypingIndicatorInMessage();
    messageDiv.appendChild(createHeader());
  }
  
  // 실제 메시지 내용을 담는 버블 추가
  var bubble = document.createElement("div");
  bubble.className = "chat-bubble";
  messageDiv.appendChild(bubble);
  
  // 타임스탬프 추가 (제공된 경우 사용, 아니면 현재 시간)
  messageDiv.appendChild(timestamp ? formatTimestamp(timestamp) : createTimestamp());
  messagesContainer.appendChild(messageDiv);  
  scrollToBottom();
  
  // 메시지 내용 렌더링 (Markdown / LaTeX 처리)
  if (window.render && typeof window.render === 'function') {
    var options = { htmlTags: true };
    const trimText = text.replace(/(\\\[)([\s\S]*?)(\\\])/g, function(match, open, content, close) {
      return open + content.replace(/<br>/g, " ") + close;
    });
    
    if (typeof window.loadMathJax === "function") {
      console.log("Loading MathJax...");
      try {
        window.loadMathJax();
        setTimeout(function() {
          console.log("MathJax Loaded. Rendering...");
          bubble.innerHTML = window.render(trimText, options);
          scrollToBottom();
        }, 10);
      } catch (e) {
        console.log("Error load MathJax => " + e);
        bubble.innerHTML = trimText;
        scrollToBottom();
      }
    } else {
      console.log("MathJax Not Found. Rendering Directly...");
      bubble.innerHTML = window.render(trimText, options);
      scrollToBottom();
    }
  } else {
    bubble.innerText = text;
    scrollToBottom();
  }
}

/**
 * 이미지 메시지 추가 함수
 * @param {string} imageData - 이미지의 URL 또는 Data URL
 * @param {string} type - "sent" 또는 "received"
 */
function addImageMessage(imageData, type, timestamp) {
    console.log(`[debug] addImageMessage.timestamp ${timestamp} `)    
  var messagesContainer = document.getElementById("messages");
  var messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.classList.add(type);
  
  // received 메시지의 경우 헤더 추가
  if (type === "received") {
    hideTypingIndicatorInMessage();
    messageDiv.appendChild(createHeader());
  }
  
  // 이미지 메시지 내용을 담는 버블
  var bubble = document.createElement("div");
  bubble.className = "chat-bubble";
  var img = document.createElement("img");
  img.src = imageData;
  img.style.maxWidth = "90%";
  img.style.borderRadius = "10px";
  bubble.appendChild(img);
  messageDiv.appendChild(bubble);
  
  // 타임스탬프 추가 (제공된 경우 사용, 아니면 현재 시간)
  messageDiv.appendChild(timestamp ? formatTimestamp(timestamp) : createTimestamp());
  
  messagesContainer.appendChild(messageDiv);
  scrollToBottom();
}

// UTC 형식의 타임스탬프를 포맷팅하는 함수
function formatTimestamp(utcTimestamp) {
    var timestampDiv = document.createElement("div");
    timestampDiv.className = "chat-timestamp";
    
    // UTC 문자열을 Date 객체로 변환
    var date = new Date(utcTimestamp);
    
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) { month = "0" + month; }
    var day = date.getDate();
    if (day < 10) { day = "0" + day; }
    var hours = date.getHours();
    if (hours < 10) { hours = "0" + hours; }
    var minutes = date.getMinutes();
    if (minutes < 10) { minutes = "0" + minutes; }
    
    timestampDiv.textContent = year + "-" + month + "-" + day + " " + hours + ":" + minutes;
    return timestampDiv;
}

// 메시지 초기화 함수
function clearMessages() {
  const messagesContainer = document.getElementById("messages");
  if (messagesContainer) {
    messagesContainer.innerHTML = "";
  }
}

/**
 * 스트리밍 응답 업데이트용 함수 (렌더링 포함)
 */
function updateLastMessage(newText) {
    var messagesContainer = document.getElementById("messages");
    var lastMessage = messagesContainer.lastElementChild;
    if (lastMessage && lastMessage.classList.contains("received")) {
      var bubble = lastMessage.querySelector(".chat-bubble");
      if (bubble) {
        // 메시지 내용 렌더링 (Markdown / LaTeX 처리)
        if (window.render && typeof window.render === 'function') {
          var options = { htmlTags: true };
          // addMessage()와 유사하게 텍스트를 전처리 (예시)
          const trimText = newText.replace(/(\\\[)([\s\S]*?)(\\\])/g, function(match, open, content, close) {
            return open + content.replace(/<br>/g, " ") + close;
          });
          
          if (typeof window.loadMathJax === "function") {
            console.log("Loading MathJax for updateLastMessage...");
            try {
              window.loadMathJax();
              setTimeout(function() {
                console.log("MathJax Loaded for updateLastMessage. Rendering...");
                bubble.innerHTML = window.render(trimText, options);
                scrollToBottom();
              }, 10);
            } catch (e) {
              console.log("Error loading MathJax in updateLastMessage: " + e);
              bubble.innerHTML = trimText;
              scrollToBottom();
            }
          } else {
            console.log("MathJax Not Found in updateLastMessage. Rendering Directly...");
            bubble.innerHTML = window.render(trimText, options);
            scrollToBottom();
          }
        } else {
          // 렌더러가 없는 경우 일반 텍스트로 설정
          bubble.innerHTML = newText;
          scrollToBottom();
        }
      }
    }
  }