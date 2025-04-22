# [SKN09-4rd-2Team]
✅ SKN AI FAMILY CAMP 9기<br>


---
# 🔊Contents

1. [팀 소개](#%EF%B8%8Fteam-introduce)
2. [프로젝트 개요](#project-overview)
3. [기술 스택](#3-기술-스택)
4. [시스템 구성도](#4-시스템-구성도)
5. [요구사항 정의서](#5-요구사항-정의서)
6. [화면 설계서](#6-화면-설계서)
7. [WBS](#7-wbs)
8. [테스트 계획 및 결과 보고서](#8-테스트-계획-및-결과-보고서)
9. [수행결과](#9-수행결과테스트시연-페이지)
10. [한 줄 회고](#10-한-줄-회고)

---

# 🎙️Team Introduce
### 🎃팀명: 트래블 체커 🍀<br>
### 🐱팀원


| 윤 환 | 이세진 | 이재혁 | 허정윤 |
|------|------|------|------|
| [@MNYH](https://github.com/MNYH) | [@sejin](https://github.com/tpwls9494) | [@ohdyo](https://github.com/ohdyo) | [@jy](https://github.com/devunis) |
---

# 🎼Project Overview
✅ **프로젝트 기간: 2025.04.19 - 2025. 04.22**

## 1. 프로젝트 주제
#### ✈️ 여행 정보 챗봇 시스템

## 2. 프로젝트 소개
#### 프로젝트 필요성
<img src="https://github.com/user-attachments/assets/248799a3-7949-413e-ad92-6e66c1e1b778" width="400" height="300">
<img src="https://github.com/user-attachments/assets/2445c053-66dd-4b1e-97b6-1a16e05f2c15" width="400" height="300">

<br>

**출처**  
- [에어부산 화재원인은 보조배터리?…지난달에도 비슷한 사고 있어(종합)](https://www.yna.co.kr/view/AKR20250129029651003)
- [[이건왜] 비행기 내 보조배터리, 더 위험한 이유](https://www.sisajournal-e.com/news/articleView.html?idxno=409149)


#### 프로젝트 목표
- **여행 정보 제공** 
  - 여행 정보 챗봇 시스템은 사용자에게 항공 수하물 규정, 현지 문화 등 여행 관련 정보를 제공.
- **AI 기반 대화형 서비스** 
  - AI를 활용하여 자연스럽고 대화형으로 정보를 전달, 사용자가 쉽게 이해하고 활용할 수 있도록 지원.
- **사용자 맞춤형 응답** 
  - 사용자의 질문과 필요에 따라 개인화된 정보를 제공하여 여행 경험을 최적화.

=> 최종적으로 개개인이 원하는 여행 취지에 맞게 궁금한 요소를 해결해주는 **해결사 역할**을 해준다. 

<br><br>

## 3. 기술 스택
- 개발 언어:  ![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white)
- 개발 환경: ![VS Code](https://img.shields.io/badge/-VS%20Code-007ACC?logo=visualstudiocode&logoColor=white) ![Colab](https://img.shields.io/badge/-Google%20Colab-F9AB00?logo=googlecolab&logoColor=white) ![RunPod](https://img.shields.io/badge/-RunPod-5F43DC?logo=cloud&logoColor=white)
- VectorDB :  ![ChromaDB](https://img.shields.io/badge/ChromaDB-white)
- LLM : ![Gemma](https://img.shields.io/badge/-Gemma-4285F4?logo=google&logoColor=white)
- 프레임워크 : <img src='https://img.shields.io/badge/%F0%9F%A4%97%20HF_transformer%20-yellow'> ![Django](https://img.shields.io/badge/-Django-2f4f4f?logo=Django&logoColor=white) ![Flask](https://img.shields.io/badge/-Flask-a52a2a?logo=Flask&logoColor=white)
- 서버/WSGI : ![Gunicorn](https://img.shields.io/badge/-Gunicorn-fdf5e6?logo=Gunicorn&logoColor=green) ![Nginx](https://img.shields.io/badge/-Nginx-32cd32?logo=Nginx&logoColor=white)
- 모델 배포 : ![Docker](https://img.shields.io/badge/-Docker-e6e6fa?logo=Docker&logoColor=blue) ![DockerCompose](https://img.shields.io/badge/-DockerCompose-00bfff?logo=DockerCompose&logoColor=white)
- 클라우드 인프라 : ![AWSEC2](https://img.shields.io/badge/-AWSEC2-ff8c00?logo=AWSEC2&logoColor=white)
- 모델 저장소 : ![HuggingFace](https://img.shields.io/badge/-HuggingFace-fff5ee?logo=HuggingFace&logoColor=yellow)
- 협업 툴 : ![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white)

#### 베이스 모델 선정 이유
![image](https://github.com/user-attachments/assets/46ab3aa3-b0e7-4de8-8a4f-b734c86f1ccf)
<a href="https://www.aitimes.com/news/articleView.html?idxno=168730">뉴스 자료</a>
- gemma3는 뛰어난 자연어 처리 능력을 보입니다. 적은 리소스로도 높은 정확도를 제공하여, 개인 또는 소규모 팀이 활용하기에 매우 적합

<br>

## 4. 시스템 구성도
![시스템 아키텍쳐](https://github.com/user-attachments/assets/129fdc1e-fc30-40f5-beef-4a540a882218)

<br><br>

## 5. 요구사항 정의서
![4차 요구사항 명세서](https://github.com/user-attachments/assets/08405699-8b44-416f-8c4d-b5321e4ac9a4)

<br><br>

## 6. 화면 설계서
![image](https://github.com/user-attachments/assets/c9258699-a1ed-4065-b8dc-7e05202010eb)

<br><br>

## 7. WBS
![image](https://github.com/user-attachments/assets/8fe44f68-11d2-4768-b6ab-2b9ac32f051e)

<br><br>

## 8. 테스트 계획 및 결과 보고서

### 🧪 테스트 시나리오 (Test Scenario)
![테스트 시나리오](https://github.com/user-attachments/assets/9ad20d88-73b5-4842-9ca2-b593cb4e2306)

<br>

### 🧪 테스트 계획서 (Test Plan)
![테스트 계획서](https://github.com/user-attachments/assets/78ff3363-d428-4549-b11a-ae72d3c24a01)

<br>

### ✅ 테스트 결과 보고서 (Test Report)
![테스트 결과 보고서](https://github.com/user-attachments/assets/ea711646-9daf-475c-8010-b92c777e2ef8)

<br><br>

## 9. 수행결과(테스트/시연 페이지)

### 트러블 슈팅
![응답 생성 중_ 입력 비활성화](https://github.com/user-attachments/assets/a858a349-2c31-45a5-bca9-4ec555c4f15c)
- 질문 후, 답변 생성 중 다른 동작(기능버튼 및 입력 추가) 실행 시 확인.

<br>

<img width="1672" alt="테스트 페이지1" src="https://github.com/user-attachments/assets/70255079-b96f-42c1-bef2-dc9e22a5a410" />
- 국가 선택 후 다른 국가 선택했을 때, x 버튼을 누르면 기존 채팅 초기화 확인.

<br>

![image](https://github.com/user-attachments/assets/96826b4c-485f-4ffe-9697-2d7100fb2713)
- 불러오기 버튼 클릭 시, json, txt 파일 외의 파일들도 업로드 가능 확인.

<br><br>

### 시연 페이지
![테스트 페이지0](https://github.com/user-attachments/assets/6a76b0a8-ce82-4561-b55a-0eb168de072a)
<img width="1672" alt="테스트 페이지1" src="https://github.com/user-attachments/assets/42fc6180-9eda-4a5f-8444-bff025236915" />
![image](https://github.com/user-attachments/assets/de3371ec-aa11-4149-b29a-e88563d17954)
<img width="1278" alt="테스트 페이지2" src="https://github.com/user-attachments/assets/207e698a-157a-4d80-abe5-d67697d30fef" />


<br><br><br><br>


# 🎧한 줄 회고
- 윤 환  :
- 이세진 : 
- 이재혁 : 
- 허정윤 : 
