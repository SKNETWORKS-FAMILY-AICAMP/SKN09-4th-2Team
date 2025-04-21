from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import boto3
import os
from botocore.exceptions import ClientError

# Create your views here.
def index(request):
    return render(request, "app/index.html")

@csrf_exempt
def chat_api(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_message = data.get("message", "")
        country = data.get("country", "")
        
        response = call_sagemaker_endpoint(user_message, country)
        return JsonResponse({
            'status': 'success',
            'response': response   
        })
    return JsonResponse({"error": "Invalid request method."}, status=400)

def call_sagemaker_endpoint(user_message, country):
    # Initialize the SageMaker runtime client
    sagemaker_runtime = boto3.client('sagemaker-runtime', region_name='ap-northeast-2')

    # Define the endpoint name
    endpoint_name = os.environ.get("SAGEMAKER_ENDPOINT_NAME")

    # Prepare the payload
    payload = {
        "user_message": user_message,
        "country": country
    }

    try:
        # Call the SageMaker endpoint
        response = sagemaker_runtime.invoke_endpoint(
            EndpointName=endpoint_name,
            ContentType='application/json',
            Body=json.dumps(payload)
        )

        # Read the response
        result = json.loads(response['Body'].read().decode())
        return result

    except ClientError as e:
        return {"error": str(e)}
    
def getRecommendQuestion(request):
    # Get the user message and country from the request
    country = request.GET.get("country")
    RecommendQuestion = {
        "베트남": [
            "베트남에서 꼭 먹어봐야 할 대표 음식은 뭐가 있나요?",
            "하노이와 호치민 중 어디가 여행하기 좋을까요?",
            "베트남 여행 시 소매치기나 바가지 주의할 점이 있나요?"
        ],
        "홍콩": [
            "홍콩 공항에서 시내까지 가는 가장 편한 교통수단은 뭔가요?",
            "홍콩에서 야경 명소로는 어디가 유명하죠?",
            "홍콩의 대중교통은 어떻게 이용하면 되나요?"
        ],
        "일본": [
            "일본에서 교통패스는 어떤 걸 사야 효율적인가요?",
            "일본 온천 이용 시 주의할 점이 있나요?",
            "일본 편의점에서 꼭 사야 할 인기 간식은 뭔가요?"
        ],
        "미국": [
            "미국에서 팁은 언제, 얼마나 줘야 하나요?",
            "미국 여행 시 유심, eSIM, 로밍 중 어떤 게 좋나요?",
            "미국 입국심사에서 주의할 점이 있나요?"
        ],
        "중국": [
            "중국에서 구글, 유튜브는 사용할 수 있나요?",
            "중국에서 번역 앱이나 VPN이 필요한가요?",
            "중국 위챗페이나 알리페이를 외국인도 쓸 수 있나요?"
        ],
        "인도네시아": [
            "발리 여행 시 주의할 문화나 복장 예절이 있나요?",
            "인도네시아에서 현지 교통수단은 어떻게 이용하나요?",
            "인도네시아에서 환전은 어디서 하는 게 안전한가요?"
        ],
        "말레이시아": [
            "말레이시아에서 꼭 가봐야 할 관광지는 어디인가요?",
            "말레이시아의 날씨는 어떤 편이고 우기에 주의해야 하나요?",
            "현지 음식 중에 외국인이 먹기 어려운 음식이 있을까요?"
        ],
        "필리핀": [
            "필리핀에서 인기 있는 섬 여행지는 어디인가요?",
            "필리핀 여행 시 치안은 안전한 편인가요?",
            "현지에서 영어로 의사소통이 잘 되나요?"
        ],
        "싱가포르": [
            "싱가포르에서 음식물 반입이나 껌 소지가 금지되어 있다는데 사실인가요?",
            "머라이언 파크 외에 숨겨진 명소가 있을까요?",
            "싱가포르의 대중교통은 어떻게 이용하면 되나요?"
        ],
        "대만": [
            "대만 야시장에서 꼭 먹어야 할 음식은 뭔가요?",
            "대만에서는 신용카드보다 현금 사용이 더 많은가요?",
            "대만 여행 시 주의할 문화 차이나 에티켓은 무엇인가요?"
        ]
    }
    return JsonResponse({
        "status": "success",
        "recommend_questions": RecommendQuestion.get(country, ["여행지 추천해주세요", "맛집 추천해주세요", "해외여행 주의사항 알려주세요."])
    })