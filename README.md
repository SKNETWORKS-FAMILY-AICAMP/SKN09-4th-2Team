# [SKN09-3rd-2Team]
✅ SKN AI FAMILY CAMP 9기<br>


---
# 🔊Contents

1. [팀 소개](#%EF%B8%8Fteam-introduce)
2. [프로젝트 개요](#project-overview)
3. [기술 스택 & 사용한 모델 (임베딩 모델, LLM)](#3-기술-스택--사용한-모델-임베딩-모델-llm)
4. [시스템 아키텍처](#4-시스템-아키텍처)
5. [WBS](#5-wbs)
6. [요구사항 명세서](#6-요구사항-명세서)
7. [수집한 데이터 및 전처리 요약](#7-수집한-데이터-및-전처리-요약)
8. [DB 연동 구현 코드 (링크만)](#8-db-연동-구현-코드-링크만)
9. [테스트 계획 및 결과 보고서](#9-테스트-계획-및-결과-보고서)
10. [진행 과정 중 프로그램 개선 노력](#10-진행-과정-중-프로그램-개선-노력)
11. [수행결과(테스트/시연 페이지)](#11-수행결과테스트시연-페이지)
12. [한 줄 회고](#한-줄-회고)


---

# 🎙️Team Introduce
### 🎃팀명: 트래블 체커 🍀<br>
### 🐱팀원


| 윤 환 | 이세진 | 이재혁 | 허정윤 |
|------|------|------|------|
| [@MNYH](https://github.com/MNYH) | [@sejin](https://github.com/tpwls9494) | [@ohdyo](https://github.com/ohdyo) | [@jy](https://github.com/devunis) |
---

# 🎼Project Overview
✅ **프로젝트 기간: 2025.03.28 - 2025. 03.31**

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

## 3. 기술 스택 & 사용한 모델 (임베딩 모델, LLM)
### 🧰 기술 스택 및 사용한 모델

- 개발 언어:  ![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white)
- 개발 환경: ![VS Code](https://img.shields.io/badge/-VS%20Code-007ACC?logo=visualstudiocode&logoColor=white) ![Colab](https://img.shields.io/badge/-Google%20Colab-F9AB00?logo=googlecolab&logoColor=white) ![RunPod](https://img.shields.io/badge/-RunPod-5F43DC?logo=cloud&logoColor=white)
- VectorDB :  ![ChromaDB](https://img.shields.io/badge/ChromaDB-white)
- LLM : ![Gemma](https://img.shields.io/badge/-Gemma-4285F4?logo=google&logoColor=white)
- 프레임워크 : <img src='https://img.shields.io/badge/%F0%9F%A4%97%20HF_transformer%20-yellow'> ![Gradio](https://img.shields.io/badge/Gradio-orange)
- 협업 툴 : ![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white)

#### 베이스 모델 선정 이유
![image](https://github.com/user-attachments/assets/46ab3aa3-b0e7-4de8-8a4f-b734c86f1ccf)
<a href="https://www.aitimes.com/news/articleView.html?idxno=168730">뉴스 자료</a>
- gemma3는 뛰어난 자연어 처리 능력을 보입니다. 적은 리소스로도 높은 정확도를 제공하여, 개인 또는 소규모 팀이 활용하기에 매우 적합



<br>

## 4. 시스템 아키텍처
<img width="1109" alt="스크린샷 2025-03-31 오전 2 17 05" src="https://github.com/user-attachments/assets/f18584ec-0c51-40ec-aa80-6e29a4d1749f" />

<br><br>

## 5. 요구사항 명세서
![image](https://github.com/user-attachments/assets/d8fb7f42-51d5-4942-8d54-0e758e803219)

<br><br>

## 6. 화면 설계서
![image](https://github.com/user-attachments/assets/c9258699-a1ed-4065-b8dc-7e05202010eb)

<br><br>

## 7. WBS
<img width="1082" alt="스크린샷 2025-03-31 오전 2 57 11" src="https://github.com/user-attachments/assets/3742c840-9aa1-486d-97ba-94bc30388af8" />

<br><br>

## 8. 테스트 계획 및 결과 보고서

### 🧪 테스트 계획서 (Test Plan)



### ✅ 테스트 결과 보고서 (Test Report)



<br><br>

## 9. 수행결과(테스트/시연 페이지)



<br><br><br><br>


# 🎧한 줄 회고
- 윤 환  :
- 이세진 : 
- 이재혁 : 
- 허정윤 : 
